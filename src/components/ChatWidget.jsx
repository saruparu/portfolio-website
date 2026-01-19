import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import {
    sendMessageStream,
    getSessionHistory,
} from '../lib/chatService';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState(null);
    const [hasLoadedHistory, setHasLoadedHistory] = useState(false);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Generate unique message ID
    const generateId = () => `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    // Scroll to bottom of messages
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    // Load conversation history on first open
    useEffect(() => {
        if (isOpen && !hasLoadedHistory) {
            const loadHistory = async () => {
                try {
                    const history = await getSessionHistory();
                    if (history.length > 0) {
                        const formattedHistory = history.map((msg) => ({
                            ...msg,
                            id: generateId(),
                        }));
                        setMessages(formattedHistory);
                    }
                } catch (err) {
                    console.error('Failed to load history:', err);
                }
                setHasLoadedHistory(true);
            };
            loadHistory();
        }
    }, [isOpen, hasLoadedHistory]);

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Handle sending a message
    const handleSend = async () => {
        const trimmedInput = inputValue.trim();
        if (!trimmedInput || isLoading) return;

        setError(null);
        const userMessage = {
            id: generateId(),
            role: 'user',
            content: trimmedInput,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        // Create placeholder for assistant response
        const assistantId = generateId();
        const assistantMessage = {
            id: assistantId,
            role: 'assistant',
            content: '',
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsStreaming(true);

        try {
            await sendMessageStream(
                trimmedInput,
                // On chunk received
                (chunk) => {
                    setMessages((prev) =>
                        prev.map((msg) =>
                            msg.id === assistantId
                                ? { ...msg, content: msg.content + chunk }
                                : msg
                        )
                    );
                },
                // On complete
                () => {
                    setIsStreaming(false);
                    setIsLoading(false);
                },
                // On error
                (err) => {
                    setError(err.message);
                    setIsStreaming(false);
                    setIsLoading(false);
                    // Remove empty assistant message on error
                    setMessages((prev) => prev.filter((msg) => msg.id !== assistantId || msg.content));
                }
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setIsStreaming(false);
            setIsLoading(false);
        }
    };

    // Handle keyboard submit
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Welcome message condition
    const welcomeMessage = messages.length === 0 && !isLoading;

    return (
        <>
            {/* Chat Toggle Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="chat-widget-btn"
                        aria-label="Open chat"
                    >
                        {/* Chat icon */}
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>

                        {/* Pulse animation */}
                        <span className="chat-btn-pulse" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="chat-window"
                    >
                        {/* Header */}
                        <div className="chat-header">
                            <div className="flex items-center gap-3">

                                <div>
                                    <h3 className="text-white font-semibold text-sm">Ask Me Anything</h3>
                                    <p className="text-blue-100 text-xs">About my professional experience</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="chat-header-btn"
                                aria-label="Minimize chat"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20 12H4"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="chat-messages">
                            {welcomeMessage && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-8"
                                >
                                    <div className="chat-welcome-icon">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                            />
                                        </svg>
                                    </div>
                                    <h4 className="text-gray-800 dark:text-white font-semibold mb-2">
                                        Hi! I'm Saravana's AI Assistant
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                                        Ask me about his experience, skills, or achievements!
                                    </p>
                                    <div className="space-y-2">
                                        {[
                                            'What is your experience?',
                                            'What skills do you have?',
                                            'Tell me about your achievements',
                                        ].map((suggestion) => (
                                            <button
                                                key={suggestion}
                                                onClick={() => {
                                                    setInputValue(suggestion);
                                                    inputRef.current?.focus();
                                                }}
                                                className="chat-suggestion-btn"
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {messages.map((msg, index) => (
                                <ChatMessage
                                    key={msg.id}
                                    role={msg.role}
                                    content={msg.content}
                                    isStreaming={isStreaming && index === messages.length - 1 && msg.role === 'assistant'}
                                />
                            ))}

                            {/* Typing indicator - shows when waiting for backend response */}
                            {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'assistant' && messages[messages.length - 1].content === '' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="chat-typing-indicator"
                                >
                                    <div className="chat-typing-avatar">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="chat-typing-content">
                                        <span className="chat-typing-label">AI is thinking</span>
                                        <div className="chat-typing-dots">
                                            <span className="chat-typing-dot"></span>
                                            <span className="chat-typing-dot"></span>
                                            <span className="chat-typing-dot"></span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Error message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg px-4 py-2 text-sm"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="chat-input-area">
                            <div className="chat-input-wrapper">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type your message..."
                                    disabled={isLoading}
                                    className="chat-input"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim() || isLoading}
                                    className="chat-send-btn"
                                    aria-label="Send message"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 text-center mt-2">
                                Powered by AI • Responses are based on Saravana's resume
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatWidget;
