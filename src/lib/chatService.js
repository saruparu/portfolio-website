/**
 * Chat service for communicating with the chatbot backend.
 * Handles API calls, streaming responses, and session management.
 */

// API Configuration
const API_BASE_URL = import.meta.env.VITE_CHATBOT_API_URL || 'https://chatbot-backend-822791247982.us-central1.run.app';
const SESSION_ID_KEY = 'chatbot_session_id';

/**
 * Get or create a session ID
 */
export function getSessionId() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(SESSION_ID_KEY);
}

/**
 * Save session ID to localStorage
 */
export function saveSessionId(sessionId) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SESSION_ID_KEY, sessionId);
}

/**
 * Clear the current session
 */
export function clearSession() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SESSION_ID_KEY);
}

/**
 * Send a chat message and stream the response
 */
export async function sendMessageStream(
    message,
    onChunk,
    onComplete,
    onError
) {
    const sessionId = getSessionId();

    try {
        const response = await fetch(`${API_BASE_URL}/chat/stream`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                session_id: sessionId,
            }),
        });

        if (!response.ok) {
            if (response.status === 429) {
                throw new Error('Rate limit exceeded. Please wait a moment before sending another message.');
            }
            throw new Error('Failed to send message. Please try again.');
        }

        const reader = response.body?.getReader();
        if (!reader) {
            throw new Error('Streaming not supported');
        }

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                onComplete();
                break;
            }

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data) {
                        try {
                            const parsed = JSON.parse(data);

                            if (parsed.session_id) {
                                saveSessionId(parsed.session_id);
                            }

                            if (parsed.chunk) {
                                onChunk(parsed.chunk);
                            }

                            if (parsed.error) {
                                onError(new Error(parsed.error));
                                return;
                            }
                        } catch (e) {
                            // Ignore parse errors for non-JSON data
                        }
                    }
                }
            }
        }
    } catch (error) {
        onError(error instanceof Error ? error : new Error('Unknown error'));
    }
}

/**
 * Get conversation history for the current session
 */
export async function getSessionHistory() {
    const sessionId = getSessionId();
    if (!sessionId) return [];

    try {
        const response = await fetch(`${API_BASE_URL}/session/${sessionId}/history`);

        if (!response.ok) {
            if (response.status === 404) {
                return [];
            }
            throw new Error('Failed to fetch history');
        }

        const data = await response.json();
        return data.messages.map(msg => ({
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp ? new Date(msg.timestamp) : undefined,
        }));
    } catch (error) {
        console.error('Failed to fetch session history:', error);
        return [];
    }
}
