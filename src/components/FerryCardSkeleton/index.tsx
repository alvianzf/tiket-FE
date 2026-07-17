import { Card, CardContent, Skeleton } from "@mui/material";

const FerryCardSkeleton = () => (
    <Card className="w-full shadow-xl rounded-[32px]">
        <CardContent className="p-8" sx={{ "&:last-child": { pb: 4 } }}>
            <div className="flex flex-col md:flex-row items-center gap-10">
                <Skeleton variant="rounded" className="w-20 h-20 rounded-3xl flex-shrink-0" />
                <div className="flex-grow flex flex-col gap-4 w-full">
                    <Skeleton variant="rounded" className="h-4 w-24 rounded-lg" />
                    <Skeleton variant="rounded" className="h-7 w-48 rounded-lg" />
                    <div className="flex flex-row items-center gap-8 w-full">
                        <Skeleton variant="rounded" className="h-8 w-16 rounded-lg" />
                        <div className="flex-grow">
                            <Skeleton variant="rounded" className="h-2 w-full rounded-full" />
                        </div>
                        <Skeleton variant="rounded" className="h-8 w-16 rounded-lg" />
                    </div>
                    <Skeleton variant="rounded" className="h-8 w-32 rounded-full" />
                </div>
                <div className="flex-shrink-0 flex flex-col items-end gap-4">
                    <Skeleton variant="rounded" className="h-10 w-36 rounded-lg" />
                    <Skeleton variant="rounded" className="h-14 w-36 rounded-2xl" />
                </div>
            </div>
        </CardContent>
    </Card>
);

export default FerryCardSkeleton;
