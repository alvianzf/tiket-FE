import { Ship, User, CreditCard } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
    activeStep: 1 | 2 | 3;
}

// Shared 3-step progress indicator for the ferry booking flow
// (select -> passenger details -> payment). Previously copy-pasted as a raw
// SVG-circle + <hr> row in each of FerryPassenger/FerryPayment/
// FerryFailed/FerrySuccess containers — consolidated here.
const FerryStepper = ({ activeStep }: Props) => {
    const { t } = useTranslation();

    const steps = [
        { id: 1, label: t('tickets.select_schedule'), icon: Ship },
        { id: 2, label: t('tickets.ordering_details'), icon: User },
        { id: 3, label: t('tickets.payment'), icon: CreditCard },
    ];

    return (
        <div className="surface-card w-full p-8">
            <div className="flex justify-between items-center relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0 hidden md:block"></div>
                {steps.map((step) => {
                    const done = step.id <= activeStep;
                    return (
                        <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${
                                done ? "bg-[#ff5a00] text-white shadow-orange-500/30" : "bg-slate-100 text-slate-400"
                            }`}>
                                <step.icon size={22} strokeWidth={2.5} />
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-wide text-center max-w-[100px] ${
                                done ? "text-slate-800" : "text-slate-400"
                            }`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FerryStepper;
