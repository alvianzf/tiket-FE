import { Button } from "@nextui-org/react";

interface Props {
    error: Error;
    resetErrorBoundary: () => void;
}

const ContainerError = ({ error, resetErrorBoundary }: Props) => (
    <div className="flex flex-col items-center justify-center py-24 px-4 gap-6 text-center">
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
        </div>
        <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-slate-800">Something went wrong</h3>
            <p className="text-slate-500 text-sm max-w-sm">{error.message || "An unexpected error occurred. Please try again."}</p>
        </div>
        <Button
            className="button-orange px-8 h-12 font-bold rounded-xl shadow-lg shadow-orange-500/30"
            onPress={resetErrorBoundary}
        >
            Try Again
        </Button>
    </div>
);

export default ContainerError;
