import { Card, Skeleton  } from "@nextui-org/react";

const FlightCardSkeleton = () => {

    return (
        <Card className="w-full">
            <Skeleton className="rounded-lg">
                <div className="h-32 rounded-lg bg-secondary"></div>
            </Skeleton>
        </Card>
    )
}

export default FlightCardSkeleton