const FerryCardSkeleton = () => (
    <div className="surface-card w-full overflow-hidden animate-pulse">
        <div className="flex flex-col md:flex-row">
            <div className="flex-1 flex flex-col gap-5 p-5 md:p-7">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 shrink-0" />
                    <div className="flex flex-col gap-1.5">
                        <div className="h-3 w-20 rounded-lg bg-slate-100" />
                        <div className="h-5 w-40 rounded-lg bg-slate-100" />
                    </div>
                </div>
                <div className="flex items-center gap-3 md:gap-6 w-full">
                    <div className="h-8 w-16 rounded-lg bg-slate-100 shrink-0" />
                    <div className="flex-1 h-1 rounded-full bg-slate-100" />
                    <div className="h-8 w-16 rounded-lg bg-slate-100 shrink-0" />
                </div>
                <div className="h-6 w-40 rounded-full bg-slate-100" />
            </div>
            <div className="flex flex-row md:flex-col items-center justify-between md:items-end gap-4 p-5 md:p-7 md:w-[220px] bg-slate-50/60 md:bg-transparent">
                <div className="h-10 w-36 rounded-lg bg-slate-100" />
                <div className="h-12 w-28 md:w-full rounded-xl bg-slate-100" />
            </div>
        </div>
    </div>
);

export default FerryCardSkeleton;
