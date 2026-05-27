import React, { useState } from 'react';
import { Message } from './useChatSocket';
import { Card, CardBody, Snippet, Button } from '@nextui-org/react';
// import Image removed

interface ChatMessageProps {
    message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isUser = message.role === 'user';
    const [isLoadingPayment, setIsLoadingPayment] = useState(false);

    const handlePayment = async (token: string) => {
        setIsLoadingPayment(true);
        if (typeof window === 'undefined') return;

        if (!window.snap) {
            await new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
                // Note: requires NEXT_PUBLIC_MIDTRANS_CLIENT_KEY in frontend env
                script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '');
                script.onload = resolve;
                document.body.appendChild(script);
            });
        }
        
        setIsLoadingPayment(false);

        if (window.snap) {
            window.snap.pay(token, {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSuccess: (result: any) => console.log('Payment success', result),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onPending: (result: any) => console.log('Payment pending', result),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onError: (result: any) => console.error('Payment error', result),
                onClose: () => console.log('Payment popup closed')
            });
        }
    };

    const renderToolResult = () => {
        if (!message.toolResult) return null;
        
        const { type, data } = message.toolResult;
        
        if (type === 'booking_form') {
            return (
                <Card className="mt-2 bg-slate-800 text-white w-full">
                    <CardBody className="gap-2">
                        <p className="font-bold text-orange-400">Booking Form Required</p>
                        <p className="text-sm">Please fill out the passenger details to proceed with booking: <b>{data.details}</b></p>
                        <p className="text-sm">Total Price: Rp {data.price?.toLocaleString('id-ID')}</p>
                        
                        <div className="bg-slate-900 p-2 rounded text-xs font-mono whitespace-pre-wrap">
{`Booking Request:
Service: ${data.serviceType}
Name: [Your Full Name]
DOB: [YYYY-MM-DD]
Passport/ID: [Number]
Nationality: [Country]
Phone: [Phone Number]`}
                        </div>
                        <Snippet symbol="" size="sm" color="default" className="mt-1 w-fit self-end">Copy Template</Snippet>
                    </CardBody>
                </Card>
            );
        }
        
        if (type === 'qris_payment') {
            return (
                <Card className="mt-2 bg-white text-black w-full">
                    <CardBody className="flex flex-col items-center gap-3">
                        <p className="font-bold text-blue-600">Complete Payment</p>
                        <p className="text-sm text-center">Please complete your payment of <b>Rp {data.amount?.toLocaleString('id-ID')}</b> for booking <b>{data.bookingCode}</b></p>
                        
                        <Button 
                            color="primary" 
                            className="w-full font-bold shadow-md h-12"
                            isLoading={isLoadingPayment}
                            onClick={() => handlePayment(data.token)}
                        >
                            Pay via Midtrans
                        </Button>
                    </CardBody>
                </Card>
            );
        }
        
        if (type === 'booking_summary') {
            if (data.error) {
                return (
                    <Card className="mt-2 bg-red-900/50 text-white w-full">
                        <CardBody>
                            <p className="font-bold text-red-400">Error</p>
                            <p className="text-sm">{data.error}</p>
                        </CardBody>
                    </Card>
                );
            }

            return (
                <Card className="mt-2 bg-slate-800 text-white w-full border border-slate-700">
                    <CardBody className="gap-2">
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-primary">Booking Info</p>
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded font-bold">
                                {data.status || 'UNKNOWN'}
                            </span>
                        </div>
                        <p className="text-lg font-bold">{data.bookingCode}</p>
                        
                        {data.flightdetail && data.flightdetail[0] && (
                            <div className="flex flex-col gap-1 mt-2 text-sm bg-slate-900/50 p-2 rounded">
                                <p><b>Route:</b> {data.flightdetail[0].origin} ➔ {data.flightdetail[0].destination}</p>
                                <p><b>Time:</b> {data.flightdetail[0].depart} ➔ {data.flightdetail[0].arrival}</p>
                            </div>
                        )}
                    </CardBody>
                </Card>
            );
        }

        return null;
    };

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-[85%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                {message.content && (
                    <div 
                        className={`px-4 py-3 rounded-2xl whitespace-pre-wrap text-sm shadow-md
                            ${isUser 
                                ? 'bg-gradient-to-br from-primary to-orange-500 text-white rounded-tr-sm' 
                                : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-sm'
                            }
                        `}
                    >
                        {message.content}
                    </div>
                )}
                {renderToolResult()}
            </div>
        </div>
    );
};

export default ChatMessage;
