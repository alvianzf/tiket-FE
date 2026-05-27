import React, { useState, useRef, useEffect } from 'react';
import { useChatSocket } from './useChatSocket';
import ChatMessage from './ChatMessage';
import { Button, Input } from '@nextui-org/react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const { messages, isTyping, sendMessage } = useChatSocket();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    const handleSend = () => {
        if (!inputValue.trim()) return;
        sendMessage(inputValue);
        setInputValue('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-[350px] sm:w-[400px] h-[550px] max-h-[80vh] flex flex-col overflow-hidden rounded-2xl shadow-2xl bg-[#0f172a] border border-slate-700/50 backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-orange-500 flex items-center justify-center">
                                    <MessageCircle size={16} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-sm">TiketQ Assistant</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                        <p className="text-green-400 text-xs">Online</p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 bg-slate-900/50 scrollbar-hide">
                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
                                    <MessageCircle size={40} className="text-slate-600 opacity-50" />
                                    <p className="text-sm text-center">Hi! I can help you search flights, ferries, check booking status, and more.</p>
                                </div>
                            )}
                            
                            {messages.map((msg) => (
                                <ChatMessage key={msg.id} message={msg} sendMessage={sendMessage} />
                            ))}
                            
                            {isTyping && (
                                <div className="flex w-full justify-start mb-4">
                                    <div className="max-w-[85%] px-4 py-3 bg-slate-800 text-slate-100 border border-slate-700 rounded-2xl rounded-tl-sm shadow-md flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-slate-900 border-t border-slate-800">
                            <div className="relative flex items-center">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Type your message..."
                                    variant="faded"
                                    classNames={{
                                        input: "text-white placeholder:text-slate-500",
                                        inputWrapper: "bg-slate-800 border-slate-700 pr-12 text-white hover:bg-slate-800/80 focus-within:!bg-slate-800"
                                    }}
                                />
                                <Button 
                                    isIconOnly 
                                    size="sm" 
                                    className="absolute right-1 z-10 bg-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
                                    onClick={handleSend}
                                    isDisabled={!inputValue.trim()}
                                >
                                    <Send size={16} />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button & Tooltip */}
            <div className="flex items-center gap-3">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-white text-slate-800 text-sm font-bold px-4 py-2 rounded-2xl rounded-br-none shadow-lg border border-slate-200 whitespace-nowrap"
                        >
                            Pesan tiket via AI, tanya apa saja! ✨
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.3)] text-white transition-colors duration-300 ${
                        isOpen 
                            ? 'bg-slate-800 hover:bg-slate-700' 
                            : 'bg-gradient-to-br from-primary to-orange-500 hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]'
                    }`}
                >
                    {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
                </motion.button>
            </div>
        </div>
    );
};

export default ChatBot;
