import { Card, CardBody, Skeleton } from "@nextui-org/react";

const CarCardSkeleton = () => (
    <Card className="w-[calc(25%-12px)] mb-5 glass-card border border-white/20 bg-white/30 backdrop-blur-xl shadow-xl">
        <CardBody>
            <div className="flex flex-col gap-4">
                <Skeleton className="w-full h-[160px] rounded-xl" />
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-6 w-3/4 rounded-lg" />
                        <Skeleton className="h-4 w-1/2 rounded-lg" />
                        <Skeleton className="h-4 w-2/5 rounded-lg" />
                        <Skeleton className="h-6 w-1/3 rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-2 mt-1">
                        <Skeleton className="h-11 w-full rounded-xl" />
                        <Skeleton className="h-10 w-full rounded-xl" />
                    </div>
                </div>
            </div>
        </CardBody>
    </Card>
);

export default CarCardSkeleton;
