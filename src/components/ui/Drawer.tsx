import { ReactNode } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

// Right-anchored slide-in panel — replaces MUI Drawer. Built on the same
// Radix Dialog primitive as ui/Dialog (focus trap + a11y) but slides in
// from the edge instead of appearing centered.
const Drawer = ({ open, onClose, children }: Props) => {
    return (
        <RadixDialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
            <AnimatePresence>
                {open && (
                    <RadixDialog.Portal forceMount>
                        <RadixDialog.Overlay asChild forceMount>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-slate-900/50 z-[1200]"
                            />
                        </RadixDialog.Overlay>
                        <RadixDialog.Content asChild forceMount>
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "tween", duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                                className="fixed z-[1201] top-0 right-0 h-full w-[min(360px,100vw)] bg-white shadow-2xl"
                            >
                                <RadixDialog.Title className="sr-only">Menu</RadixDialog.Title>
                                {children}
                            </motion.div>
                        </RadixDialog.Content>
                    </RadixDialog.Portal>
                )}
            </AnimatePresence>
        </RadixDialog.Root>
    );
};

export default Drawer;
