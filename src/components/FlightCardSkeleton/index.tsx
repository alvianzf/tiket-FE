import { Card, Skeleton } from "@mui/material";

const FlightCardSkeleton = () => {

    return (
        <Card className="w-full">
            <Skeleton variant="rounded" className="rounded-lg h-32 w-full" height={128} />
        </Card>
    )
}

export default FlightCardSkeleton