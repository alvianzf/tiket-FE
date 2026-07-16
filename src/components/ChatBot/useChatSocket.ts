import { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { getApiUrl } from '@api/baseApi';

export type FlightOption = {
    searchId: string;
    airline: string;
    departTime: string;
    arriveTime: string;
    departDate?: string;
    duration: string;
    price: number;
    isTransit?: boolean;
};

export type FerryOption = {
    tripId: string;
    searchId?: string;
    ferryName: string;
    departTime: string;
    arriveTime: string;
    duration?: string;
    price: number;
    availableSeats?: number;
};

export type FlightDetail = {
    origin: string;
    destination: string;
    depart: string;
    arrival: string;
};

export type ToolResultData =
    | { type: 'flight_results'; data: { options?: FlightOption[]; cheapest?: FlightOption; earliest?: FlightOption; latest?: FlightOption; message?: string } }
    | { type: 'ferry_results'; data: { options?: FerryOption[]; cheapest?: FerryOption; earliest?: FerryOption; latest?: FerryOption; message?: string } }
    | { type: 'booking_summary'; data: { bookingCode?: string; status?: string; error?: string; flightdetail?: FlightDetail[] } }
    | { type: 'dana_payment'; data: { bookingCode: string; kind: 'QRIS' | 'VA'; vaNumber: string | null; qrContent: string | null; expiryTime: string | null } }
    | { type: 'customer_service_card'; data: Record<string, never> };

export type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    toolResult?: ToolResultData;
};

export const useChatSocket = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'initial',
            role: 'assistant',
            content: "Hi! / Halo! 👋\n\nType your travel query and I'll help you search and book.\nKetik pencarian tiket Anda dan saya akan membantu.\n\n*(e.g. \"Flight from Jakarta to Bali tomorrow\" / \"Kapal Batam ke Singapura besok\")*\n\nFor help or complaints, type **'Customer Service'** / Ketik **'Customer Service'** untuk bantuan."
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const socketRef = useRef<Socket | null>(null);
    const sessionIdRef = useRef<string>(`session-${Math.random().toString(36).substring(2, 9)}`);

    useEffect(() => {
        const apiUrl = getApiUrl();
        let socketUrl = 'http://localhost:3001';
        try {
            const urlObj = new URL(apiUrl);
            socketUrl = urlObj.origin;
        } catch (e) {
            socketUrl = apiUrl;
        }

        const socket = io(socketUrl);
        socketRef.current = socket;

        socket.on('chat:typing', () => {
            setIsTyping(true);
        });

        socket.on('chat:response_done', (data: { content: string }) => {
            setIsTyping(false);
            if (data.content) {
                setMessages((prev) => [
                    ...prev,
                    { id: Date.now().toString(), role: 'assistant', content: data.content }
                ]);
            }
        });

        socket.on('chat:tool_result', (result: ToolResultData) => {
            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                { 
                    id: Date.now().toString(), 
                    role: 'assistant', 
                    content: '',
                    toolResult: result 
                }
            ]);
        });

        socket.on('chat:error', (error) => {
            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                { id: Date.now().toString(), role: 'assistant', content: `Error: ${error.message}` }
            ]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = (text: string) => {
        if (!text.trim() || !socketRef.current) return;
        
        // Add user message to state
        setMessages((prev) => [
            ...prev,
            { id: Date.now().toString(), role: 'user', content: text }
        ]);

        setIsTyping(true);
        
        // Send to server
        socketRef.current.emit('chat:message', {
            sessionId: sessionIdRef.current,
            text
        });
    };

    return {
        messages,
        isTyping,
        sendMessage
    };
};
