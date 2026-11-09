import { InputHTMLAttributes, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    startIcon?: React.ReactNode;
}

// Replaces MUI TextField for simple single-line inputs. Plain Tailwind,
// no MUI dependency.
const TextField = forwardRef<HTMLInputElement, Props>(
    ({ label, error, fullWidth, startIcon, className = "", ...rest }, ref) => {
        return (
            <label className={`flex flex-col gap-1.5 ${fullWidth ? "w-full" : ""}`}>
                {label && <span className="text-sm font-semibold text-slate-600">{label}</span>}
                <div className="relative flex items-center">
                    {startIcon && <span className="absolute left-3 text-slate-400">{startIcon}</span>}
                    <input
                        ref={ref}
                        className={`w-full h-11 rounded-xl border bg-white px-4 ${startIcon ? "pl-10" : ""} text-slate-800 outline-none transition-colors ${
                            error ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-primary"
                        } ${className}`}
                        {...rest}
                    />
                </div>
                {error && <span className="text-xs text-red-500">{error}</span>}
            </label>
        );
    },
);

TextField.displayName = "TextField";

export default TextField;
