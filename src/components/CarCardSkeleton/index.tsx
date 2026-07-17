import { Card, CardContent, Skeleton } from "@mui/material";

const CarCardSkeleton = () => (
    <Card className="w-[calc(25%-12px)] mb-5">
        <CardContent>
            <div className="flex flex-col gap-4">
                <Skeleton variant="rounded" className="w-full h-[160px] rounded-xl" />
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <Skeleton variant="rounded" className="h-6 w-3/4 rounded-lg" />
                        <Skeleton variant="rounded" className="h-4 w-1/2 rounded-lg" />
                        <Skeleton variant="rounded" className="h-4 w-2/5 rounded-lg" />
                        <Skeleton variant="rounded" className="h-6 w-1/3 rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-2 mt-1">
                        <Skeleton variant="rounded" className="h-11 w-full rounded-xl" />
                        <Skeleton variant="rounded" className="h-10 w-full rounded-xl" />
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default CarCardSkeleton;
