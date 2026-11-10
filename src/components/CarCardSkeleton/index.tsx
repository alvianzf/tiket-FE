const CarCardSkeleton = () => (
    <div className="surface-card w-full p-4 flex flex-col gap-4 animate-pulse">
        <div className="w-full h-[160px] rounded-xl bg-slate-100" />
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                <div className="h-5 w-3/4 rounded-lg bg-slate-100" />
                <div className="h-3 w-1/2 rounded-lg bg-slate-100" />
                <div className="h-5 w-1/3 rounded-lg bg-slate-100 mt-1" />
            </div>
            <div className="flex flex-col gap-2 mt-1">
                <div className="h-11 w-full rounded-xl bg-slate-100" />
                <div className="h-10 w-full rounded-xl bg-slate-100" />
            </div>
        </div>
    </div>
);

export default CarCardSkeleton;
