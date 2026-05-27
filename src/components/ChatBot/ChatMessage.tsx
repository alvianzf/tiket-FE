import React, { useState } from 'react';
import { Message } from './useChatSocket';
import { Card, CardBody, Snippet, Button } from '@nextui-org/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
    message: Message;
    sendMessage?: (text: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InteractiveResultCard = ({ item, type, label, sendMessage }: any) => {
    const [expanded, setExpanded] = useState(false);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);

    const isFlight = type === 'flight_results';

    const handleConfirm = () => {
        if (sendMessage) {
            sendMessage(`I want to book the ${label} ${isFlight ? 'flight' : 'ferry'} (${item.airline || item.ferryName}) departing at ${item.departTime} for ${adults} Adult(s), ${children} Child(ren), and ${infants} Infant(s).`);
        }
    };

    return (
        <Card className="mt-2 bg-slate-800 text-white w-full border border-slate-700 overflow-visible transition-all">
            <CardBody className="p-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
                <div className="flex justify-between items-start mb-2">
                    <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-[10px] uppercase font-bold rounded tracking-wider">
                        ★ {label}
                    </span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                        Rp {item.price?.toLocaleString('id-ID')}
                    </span>
                </div>
                
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-bold text-slate-100 text-sm">{item.airline || item.ferryName}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-mono text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded">{item.departTime}</span>
                            <span className="text-slate-500 text-[10px]">➔</span>
                            <span className="text-xs font-mono text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded">{item.arriveTime}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.duration}</p>
                        {item.isTransit && <p className="text-[9px] text-orange-400 mt-0.5">TRANSIT</p>}
                    </div>
                </div>

                {expanded && (
                    <div className="mt-4 pt-3 border-t border-slate-700/50" onClick={e => e.stopPropagation()}>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Select Passengers</p>
                        
                        <div className="flex flex-col gap-2 mb-4">
                            <div className="flex justify-between items-center bg-slate-900/50 px-3 py-2 rounded-lg">
                                <span className="text-xs text-slate-300 font-medium">Adult</span>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-6 h-6 rounded-md bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center text-sm font-bold transition-colors">-</button>
                                    <span className="text-sm font-mono w-3 text-center">{adults}</span>
                                    <button onClick={() => setAdults(adults + 1)} className="w-6 h-6 rounded-md bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center text-sm font-bold transition-colors">+</button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center bg-slate-900/50 px-3 py-2 rounded-lg">
                                <span className="text-xs text-slate-300 font-medium">Child</span>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-6 h-6 rounded-md bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center text-sm font-bold transition-colors">-</button>
                                    <span className="text-sm font-mono w-3 text-center">{children}</span>
                                    <button onClick={() => setChildren(children + 1)} className="w-6 h-6 rounded-md bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center text-sm font-bold transition-colors">+</button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center bg-slate-900/50 px-3 py-2 rounded-lg">
                                <span className="text-xs text-slate-300 font-medium">Infant</span>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setInfants(Math.max(0, infants - 1))} className="w-6 h-6 rounded-md bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center text-sm font-bold transition-colors">-</button>
                                    <span className="text-sm font-mono w-3 text-center">{infants}</span>
                                    <button onClick={() => setInfants(infants + 1)} className="w-6 h-6 rounded-md bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center text-sm font-bold transition-colors">+</button>
                                </div>
                            </div>
                        </div>

                        <Button 
                            size="md" 
                            className="w-full bg-gradient-to-r from-primary to-orange-500 text-white font-bold shadow-lg shadow-orange-500/20"
                            onClick={handleConfirm}
                        >
                            Select & Continue
                        </Button>
                    </div>
                )}
            </CardBody>
        </Card>
    );
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sendMessage }) => {
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

        if (type === 'flight_results' || type === 'ferry_results') {
            if (data.message) {
                return (
                    <Card className="mt-2 bg-slate-800 text-slate-300 w-full border border-slate-700">
                        <CardBody>
                            <p className="text-sm">{data.message}</p>
                        </CardBody>
                    </Card>
                );
            }
            return (
                <div className="flex flex-col gap-2 mt-2 w-full">
                    {data.cheapest && (
                        <InteractiveResultCard item={data.cheapest} type={type} label="Cheapest" sendMessage={sendMessage} />
                    )}
                    {data.earliest && data.earliest.searchId !== data.cheapest?.searchId && (
                        <InteractiveResultCard item={data.earliest} type={type} label="Earliest" sendMessage={sendMessage} />
                    )}
                    {data.latest && data.latest.searchId !== data.cheapest?.searchId && data.latest.searchId !== data.earliest?.searchId && (
                        <InteractiveResultCard item={data.latest} type={type} label="Latest" sendMessage={sendMessage} />
                    )}
                </div>
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
                        <div className="markdown-body">
                            <ReactMarkdown 
                                remarkPlugins={[remarkGfm]}
                                components={{
                                table: ({...props}) => <table className="min-w-full text-sm divide-y divide-slate-700 mt-2 mb-2" {...props} />,
                                thead: ({...props}) => <thead className="bg-slate-900/50" {...props} />,
                                th: ({...props}) => <th className="px-3 py-2 font-bold text-left text-orange-400 uppercase tracking-wider border-b border-slate-700" {...props} />,
                                td: ({...props}) => <td className="px-3 py-2 whitespace-nowrap border-b border-slate-700/50" {...props} />,
                                p: ({...props}) => <p className="mb-2 last:mb-0" {...props} />,
                                strong: ({...props}) => <strong className="font-bold text-orange-300" {...props} />
                            }}
                        >
                            {message.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}
                {renderToolResult()}
            </div>
        </div>
    );
};

export default ChatMessage;
