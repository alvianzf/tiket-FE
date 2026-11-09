import { ReactNode } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

// Replaces MUI Dialog — Radix handles focus trap/a11y, Tailwind + framer-motion
// handle the look and the enter/exit animation. Solid white panel, no blur.
const Dialog = ({ open, onClose, title, children }: Props) => {
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
                                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                                transition={{ duration: 0.18 }}
                                className="fixed z-[1201] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] max-w-sm max-h-[85vh] overflow-y-auto bg-white rounded-2xl border border-slate-100 shadow-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <RadixDialog.Title className={title ? "text-lg font-bold text-slate-800" : "sr-only"}>
                                        {title || "Dialog"}
                                    </RadixDialog.Title>
                                    <RadixDialog.Close asChild>
                                        <button aria-label="Close" className="ml-auto text-slate-400 hover:text-slate-700 transition-colors">
                                            <X size={20} />
                                        </button>
                                    </RadixDialog.Close>
                                </div>
                                {children}
                            </motion.div>
                        </RadixDialog.Content>
                    </RadixDialog.Portal>
                )}
            </AnimatePresence>
        </RadixDialog.Root>
    );
};

export default Dialog;
