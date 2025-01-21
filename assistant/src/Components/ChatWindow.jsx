import { useState, useEffect } from 'react';
import "./ChatWindow.css";
import MarkdownToHtml from './MarkdownToHtml';


// Message Component
const Message = ({ text, isUser }) => {
    return (
        <div className={`message ${isUser ? 'user-message' : 'bot-message'}`}>
            <MarkdownToHtml text={text}/>
        </div>
    )
};

// Chat Window
const ChatWindow = ({ chatbot, onClose, messages, onSendMessage, isLoading }) => {
    const [inputMessage, setInputMessage] = useState('');

    const handleSend = () => {
        if (inputMessage.trim() && !isLoading) {
            onSendMessage(inputMessage, chatbot);
            setInputMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            handleSend();
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <span>{chatbot.name}</span>
                <button className="close-chat" onClick={onClose}>×</button>
            </div>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <Message 
                        key={index} 
                        text={msg.text} 
                        isUser={msg.isUser}
                        isError={msg.isError}
                    />
                ))}
                {isLoading && (
                    <div className="loading-indicator">
                        <span>Pensando...</span>
                    </div>
                )}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribi un mensaje..."
                    disabled={isLoading}
                />
                <button 
                    onClick={handleSend}
                    disabled={isLoading}
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;