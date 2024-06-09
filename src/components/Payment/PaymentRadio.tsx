import { RadioProps, useRadio, cn, VisuallyHidden } from "@nextui-org/react"

const PaymentRadio = (props: RadioProps) => {
    const {
        Component,
        children,
        getBaseProps,
        getWrapperProps,
        getInputProps,
        getLabelProps,
        getLabelWrapperProps,
        getControlProps,
      } = useRadio(props);

    return (
        <Component
            {...getBaseProps()}
            className={cn(
                "group inline-flex items-center hover:opacity-70 active:opacity-50 flex-row tap-highlight-transparent",
                "cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
                "data-[selected=true]:border-[#ff5a00] group-data-[selected=true]:border-[#ff5a00]",
            )}
        >
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <span {...getWrapperProps()} className={cn(
                "relative inline-flex items-center justify-center flex-shrink-0",
                "overflow-hidden border-solid border-medium box-border border-default",
                "rounded-full group-data-[hover-unselected=true]:bg-default-100 outline-none",
                "group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2",
                "group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2", 
                "group-data-[focus-visible=true]:ring-offset-background group-data-[selected=true]:border-[#ff5a00]",
                "w-5 h-5 group-data-[pressed=true]:scale-95 transition-transform-colors motion-reduce:transition-none"
            )}>
                <span {...getControlProps()} className={cn(
                    "z-10 opacity-0 scale-0 origin-center rounded-full group-data-[selected=true]:opacity-100",
                    "group-data-[selected=true]:scale-100 bg-[#ff5a00] text-primary-foreground w-2 h-2",
                    "transition-transform-opacity motion-reduce:transition-none"
                )} />
            </span>
            <div {...getLabelWrapperProps()}>
                {children && <span {...getLabelProps()}>{children}</span>}
            </div>
        </Component>
    )
}

export default PaymentRadio