import { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { getApiUrl } from '@api/baseApi';

export type ToolResultData = {
    type: 'booking_form' | 'qris_payment' | 'booking_summary';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any; 
};

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
            content: "Halo! Silakan ketik rute pencarian tiket yang Anda inginkan (contoh: 'Tiket kapal dari Batam ke Singapura besok').\n\nJika Anda butuh bantuan lebih lanjut atau ingin menyampaikan keluhan, cukup ketik **'Customer Service'** kapan saja."
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
