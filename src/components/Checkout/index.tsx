import { Button as BaseButton, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs } from "@mui/material"
import { useTranslation } from "react-i18next"
import CheckoutOrder from "./CheckoutOrder";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import CheckoutOrderReview from "./CheckoutOrderReview";
import { FormProvider } from "react-hook-form";
import useForm, { DEFAULT_VALUES, FormProps, Passenger } from "./forms/useForm";
import Button from "@components/Button";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { bookFlight } from "@api/bookFlight";
import buildRequest from "./forms/buildRequest";
import { Flight } from "@api/searchFlights/types";
import { motion, AnimatePresence } from "framer-motion";
import { Info, CreditCard, ShieldCheck } from "lucide-react";

export type Key = string | number;

interface Props {
    flightData?: Flight;
    isLoading: boolean;
}

const Checkout = ({ flightData, isLoading }: Props) => {

    const { t } = useTranslation();

    const { query, push } = useRouter();

    const from = query?.from as unknown as string;
    const to = query?.to as unknown as string;
    const date = query?.date as unknown as string;
    const adult = query?.adult as unknown as string;
    const child = query?.child as unknown as string;
    const infant = query?.infant as unknown as string;

    const [selected, setSelected] = useState<Key>("order");
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    const methods = useForm();
    const { handleSubmit } = methods;

    const handleSelectTab = async (key: Key) => {
        const isValid = await methods.trigger();
        if(isValid) {
            setSelected(key);
            return
        }
    };

    const generatePassengers = (total: number, withLapInfant = false): Passenger[] => {
        return Array(total).fill(null).map(() => ({
            firstname: '',
            lastname: '',
            call: '',
            date_of_birth: '',
            cabinClass: 'economy',
            ...(withLapInfant ? { isLapInfant: false } : {})
        }));
    };

    useEffect(
        () => {
            if(flightData) {
                methods.reset({
                    ...DEFAULT_VALUES,
                    searchId: flightData.searchId,
                    from,
                    to,
                    date,
                    adult: parseInt(adult),
                    child: parseInt(child),
                    infant: parseInt(infant),
                    adultPassengers: generatePassengers(parseInt(adult)),
                    childPassengers: generatePassengers(parseInt(child)),
                    infantPassengers: generatePassengers(parseInt(infant), true)
                })
            }
        },
        [flightData, methods, from, to, date, adult, child, infant]
    );

    // A searchId is single-use at the provider: a second book on the same
    // searchId returns rc 44 "Booking Gagal". Guard against any double submit
    // (rapid clicks, re-renders) firing mutate() before isMutating flips.
    const isBookingRef = useRef(false);

    const { mutate, isLoading: isMutating } = useMutation(bookFlight, {
        onSuccess: (data) => {
            if(data.rc === "00") {
                // Keep the guard closed — we navigate away; the searchId is spent.
                push({
                    pathname: '/checkout/payment',
                    query: {
                        bookingno: data.data.bookingCode
                    }
                })
                return;
            }
            isBookingRef.current = false;
            toast.error(data.msg || "Failed to create flight booking. Please try again.");
        },
        onError: (err: unknown) => {
            isBookingRef.current = false;
            const error = err as { message?: string };
            toast.error(error?.message || "Failed to create flight booking. Please try again.");
        }
    })

    const onSubmit = (data: FormProps) => {
        if (isBookingRef.current) return;
        isBookingRef.current = true;
        const request = buildRequest(data);
        mutate(request)
    }

    return (
        <div className="flex flex-col gap-10 w-full">
            <FormProvider {...methods}>
                <div className="w-full">
                    <div className="flex flex-col w-full gap-6">
                        <Tabs
                            aria-label="Checkout Steps"
                            value={selected}
                            onChange={(_, key: Key) => handleSelectTab(key)}
                            slotProps={{ indicator: { sx: { bgcolor: "warning.main", height: 4, borderRadius: 9999 } } }}
                            sx={{
                                width: "100%",
                                borderBottom: "1px solid rgba(66,103,178,0.1)",
                                minHeight: 56,
                                "& .MuiTabs-flexContainer": { gap: 6, flexWrap: "wrap" },
                                "& .MuiTab-root": {
                                    minWidth: "fit-content",
                                    px: 0,
                                    minHeight: 56,
                                    height: 56,
                                    fontWeight: 900,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.2em",
                                    fontSize: 12,
                                    color: "#94a3b8",
                                    "&.Mui-selected": { color: "warning.main" },
                                },
                            }}
                        >
                            <Tab
                                value="order"
                                label={
                                    <div className="flex items-center gap-2">
                                        <Info size={14} className="mb-0.5" />
                                        <span>{t('checkout.order')}</span>
                                    </div>
                                }
                            />
                            <Tab
                                value="review"
                                label={
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={14} className="mb-0.5" />
                                        <span>{t('checkout.review')}</span>
                                    </div>
                                }
                            />
                        </Tabs>
                        <div className="w-full pt-4">
                            {selected === 'order' && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="pt-8"
                                >
                                    <CheckoutOrder />
                                </motion.div>
                            )}
                            {selected === 'review' && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="pt-8"
                                >
                                    <CheckoutOrderReview  />
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </FormProvider>

            <AnimatePresence mode="wait">
                {selected === 'order' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex justify-center mt-4"
                    >
                        <Button
                            dsVariant="cta"
                            className="h-14 px-16 text-lg font-bold shadow-md rounded-ds-sm min-w-64"
                            onClick={() => handleSelectTab('review')}
                            disabled={isLoading}
                            isLoading={isLoading}
                        >
                            {t('checkout.continue')}
                        </Button>
                    </motion.div>
                )}
                {selected === 'review' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col items-center gap-4 mt-4"
                    >
                        <Button
                            dsVariant="cta"
                            className="h-14 px-16 text-lg font-bold shadow-md rounded-ds-sm min-w-64"
                            disabled={isMutating}
                            isLoading={isMutating}
                            onClick={onOpen}
                        >
                            <CreditCard className="mr-2" size={20} />
                            {t('checkout.continue_payment')}
                        </Button>
                        <BaseButton
                            variant="text"
                            disabled={isMutating}
                            startIcon={isMutating ? <CircularProgress size={16} color="inherit" /> : undefined}
                            onClick={() => setSelected('order')}
                            sx={{
                                fontWeight: 700,
                                color: "#94a3b8",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                fontSize: 12,
                                transition: "color .2s ease",
                                "&:hover": { color: "#475569", bgcolor: "transparent" },
                            }}
                        >
                            {t('checkout.back')}
                        </BaseButton>
                    </motion.div>
                )}
            </AnimatePresence>

            <Dialog
                open={isOpen}
                onClose={onClose}
                fullWidth
                maxWidth="xs"
                sx={{ zIndex: 9999 }}
                slotProps={{
                    backdrop: { sx: { backgroundColor: "rgba(0,0,0,0.3)", backdropFilter: "blur(12px)" } },
                    paper: {
                        sx: {
                            background: "rgba(255,255,255,0.95)",
                            backdropFilter: "blur(64px)",
                            border: "none",
                            borderRadius: "24px",
                            overflow: "hidden",
                            p: 2,
                            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                        },
                    },
                }}
            >
                <DialogTitle component="div" sx={{ display: "flex", flexDirection: "column", gap: 1, pt: 4 }}>
                    <div className="bg-primary/10 w-16 h-16 rounded-ds-md flex items-center justify-center mb-2">
                        <ShieldCheck size={32} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-black text-dark tracking-tight">{t('checkout.confirm_order')}</h2>
                </DialogTitle>
                <DialogContent sx={{ pb: 4 }}>
                    <p className="text-slate-500 font-medium leading-relaxed">
                        {t('checkout.confirm_order_desc')}
                    </p>
                </DialogContent>
                <DialogActions
                    disableSpacing
                    sx={{ flexDirection: { xs: "column", md: "row" }, gap: 1.5, pt: 0, pb: 4, px: 3 }}
                >
                    <BaseButton
                        variant="text"
                        disabled={isMutating}
                        startIcon={isMutating ? <CircularProgress size={16} color="inherit" /> : undefined}
                        onClick={onClose}
                        className="flex-1"
                        sx={{
                            fontWeight: 700,
                            borderRadius: "8px",
                            height: 48,
                            bgcolor: "#f1f5f9",
                            color: "#64748b",
                            "&:hover": { bgcolor: "#e2e8f0" },
                        }}
                    >
                        {t('checkout.cancel')}
                    </BaseButton>
                    <Button
                        dsVariant="cta"
                        className="h-12 px-8 font-bold shadow-md rounded-ds-sm flex-1"
                        disabled={isMutating}
                        isLoading={isMutating}
                        onClick={handleSubmit(onSubmit)}
                    >
                        {t('checkout.continue_payment')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Checkout