import React, { useState } from 'react';
import { Message } from './useChatSocket';
import { Card, CardBody, Button } from '@nextui-org/react';
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
            sendMessage(`I want to book the ${label} ${isFlight ? 'flight' : 'ferry'} (${item.airline || item.ferryName}) departing at ${item.departTime}${isFlight && item.departDate ? ` on ${item.departDate}` : ''} for ${adults} Adult(s), ${children} Child(ren), and ${infants} Infant(s).`);
        }
    };

    return (
        <Card className="mt-2 bg-slate-800 text-white w-full border border-slate-700 overflow-visible transition-all">
            <CardBody className="p-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
                <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-2">
                        <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-[10px] uppercase font-bold rounded tracking-wider">
                            ★ {label}
                        </span>
                        {isFlight && item.departDate && (
                            <span className="px-2 py-0.5 bg-slate-900 text-slate-300 text-[10px] font-bold rounded tracking-wider">
                                {item.departDate}
                            </span>
                        )}
                    </div>
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
                const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '';
                const isProduction = clientKey && !clientKey.startsWith('SB-');
                const scriptSrc = isProduction 
                    ? 'https://app.midtrans.com/snap/snap.js'
                    : 'https://app.sandbox.midtrans.com/snap/snap.js';

                const script = document.createElement('script');
                script.src = scriptSrc;
                // Note: requires NEXT_PUBLIC_MIDTRANS_CLIENT_KEY in frontend env
                script.setAttribute('data-client-key', clientKey);
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

        const toolResult = message.toolResult;

        if (toolResult.type === 'qris_payment') {
            const { data } = toolResult;
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
        
        if (toolResult.type === 'booking_summary') {
            const { data } = toolResult;
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

        if (toolResult.type === 'customer_service_card') {
            return (
                <Card className="mt-2 bg-slate-800 text-white w-full border border-green-500/30">
                    <CardBody className="flex flex-col items-center gap-3 py-4">
                        <div className="bg-green-500/20 p-3 rounded-full">
                            <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-slate-100">Customer Service</p>
                            <p className="text-sm text-slate-400 mt-1">For complaints or assistance, please reach out to us on WhatsApp.</p>
                        </div>
                        <Button 
                            as="a"
                            href="https://wa.me/6282382709777"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-[#25D366] text-white font-bold mt-2"
                            startContent={
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                            }
                        >
                            Chat on WhatsApp
                        </Button>
                    </CardBody>
                </Card>
            );
        }

        if (toolResult.type === 'flight_results' || toolResult.type === 'ferry_results') {
            const { data, type } = toolResult;
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
                    {data.options && data.options.map((item, i) => (
                        <InteractiveResultCard key={i} item={item} type={type} label={`Option ${i+1}`} sendMessage={sendMessage} />
                    ))}
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
