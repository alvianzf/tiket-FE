import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "cta" | "outline" | "ghost";

type NativeButtonProps = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
>;

interface Props extends NativeButtonProps {
    children: ReactNode;
    variant?: Variant;
    isLoading?: boolean;
    fullWidth?: boolean;
    href?: string;
    target?: string;
    rel?: string;
    className?: string;
}

const VARIANT_CLASSES: Record<Variant, string> = {
    primary: "bg-primary text-white shadow-[0_4px_14px_rgba(66,103,178,0.35)] hover:shadow-[0_6px_20px_rgba(66,103,178,0.45)]",
    cta: "bg-orange-500 text-white shadow-[0_4px_14px_rgba(255,90,0,0.35)] hover:shadow-[0_6px_20px_rgba(255,90,0,0.45)]",
    outline: "bg-transparent text-primary border-2 border-primary hover:bg-primary/5",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
};

// Design-system Button — no MUI. Bold, rounded, framer-motion press/hover
// micro-interaction. Renders as a Next.js <Link> when `href` is given, so it
// stays link-based navigation (see specs/03-DESIGN-SYSTEM-AND-UI.md §6).
const Button = forwardRef<HTMLButtonElement, Props>(
    ({ children, variant = "cta", isLoading, fullWidth, href, target, rel, className = "", disabled, ...rest }, ref) => {
        const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-bold px-6 h-11 transition-all active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none ${VARIANT_CLASSES[variant]} ${fullWidth ? "w-full" : ""} ${className}`;

        const content = (
            <>
                {isLoading && <Loader2 size={18} className="animate-spin" />}
                {children}
            </>
        );

        if (href) {
            return (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className={fullWidth ? "w-full" : "inline-block"}>
                    <Link href={href} target={target} rel={rel} className={classes}>
                        {content}
                    </Link>
                </motion.div>
            );
        }

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
                whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
                className={classes}
                disabled={disabled || isLoading}
                {...rest}
            >
                {content}
            </motion.button>
        );
    },
);

Button.displayName = "Button";

export default Button;
