import React from 'react';
import { motion } from 'framer-motion';

const ChatMessage = ({ role, content, isStreaming, showDownload }) => {
    const isUser = role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
        >
            <div className={`chat-message ${isUser ? 'user' : 'assistant'}`}>
                {/* Avatar indicator for assistant */}
                {!isUser && (
                    <div className="flex items-center gap-2 mb-1">
                        <div className="chat-avatar">
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
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            AI Assistant
                        </span>
                    </div>
                )}

                {/* Message content */}
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {content}
                    {isStreaming && (
                        <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse rounded-sm" />
                    )}
                </p>

                {/* Download button for resume requests */}
                {showDownload && !isStreaming && content && (
                    <a
                        href="/DG_Resume.pdf"
                        download="DG_Saravanabalaji_Resume.pdf"
                        className="chat-download-btn"
                    >
                        <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            className="chat-download-icon"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        Download Resume (PDF)
                    </a>
                )}
            </div>
        </motion.div>
    );
};

export default ChatMessage;
