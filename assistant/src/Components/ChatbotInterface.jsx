import { useState, useEffect } from 'react';
import './ChatbotInterface.css';  // We'll create this next
import ChatWindow from "./ChatWindow"
import Navbar from "./Navbar"
//import askQuestionToAssistant from "./ApiCalls"

const chatbots = [
    { name: 'VestiBOT', color: '#5865F2', icon: '🖼️',id: '962e8e6e-602e-4d53-93cc-fe3bff1e65be' },
    { name: 'Traductor a Ingles', color: '#19C37D', icon: '🤖',id: '882202bf-24ca-440e-ba71-4e28e77aaa84' },
    { name: 'Claude', color: '#9747FF', icon: '🧠', id: '962e8e6e-602e-4d53-93cc-fe3bff1e65be'},
    { name: 'Gemini', color: '#1A73E8', icon: '💫', id: '962e8e6e-602e-4d53-93cc-fe3bff1e65be' },
    { name: 'Llama', color: '#FF6B6B', icon: '🦙', id: '962e8e6e-602e-4d53-93cc-fe3bff1e65be' },
    { name: 'DALL-E', color: '#FF9A3C', icon: '🎨', id: '962e8e6e-602e-4d53-93cc-fe3bff1e65be' }
];

// POST question to assistant
async function askQuestionToAssistant(messages, id) {
    try {
        const response = await fetch('https://chat.int.bayer.com/api/v2/chat/agent', {  // Replace with actual API endpoint
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_MYGENASSIST_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: messages.map(msg => ({
                    role: msg.isUser ? 'user' : 'system',
                    role: 'user',
                    content: msg.text
                })),
                assistant_id: id,
                model: 'gpt-4o-mini',
            }),
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.choices[0]["message"]["content"]; // Adjust according to actual API response structure
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}


// ChatbotButton Component
const ChatbotButton = ({ chatbot, onClick }) => (
    <button className="chatbot-button" onClick={() => onClick(chatbot)}>
        <div className="chatbot-icon" style={{ background: chatbot.color }}>
            {chatbot.icon}
        </div>
        <span>{chatbot.name}</span>
    </button>
);

// Main Component
const ChatbotInterface = () => {
    const [currentChatbot, setCurrentChatbot] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const handleChatbotClick = (chatbot) => {
        setCurrentChatbot(chatbot);
        setMessages([{
            text: `Hazle una pregunta inicial al asistente ${chatbot.name}`,
            isUser: false
        }]);
    };

    const handleClose = () => {
        setCurrentChatbot(null);
        setMessages([]);
    };

    // Modified handleSendMessage to use the API
    const handleSendMessage = async (message, currentChatbot) => {
        try {
            // Add user message
            const newMessages = [
                ...messages,
                { text: message, isUser: true }
            ];
            setMessages(newMessages);
            
            // Show loading state
            setIsLoading(true);

            // Call API
            // id = currentChatbot.id
            const response = await askQuestionToAssistant(newMessages, currentChatbot.id);

            // Add bot response
            setMessages(prevMessages => [
                ...prevMessages,
                { text: response, isUser: false }
            ]);
        } catch (error) {
            // Handle error - add error message to chat
            setMessages(prevMessages => [
                ...prevMessages,
                { 
                    text: "Disculpa, un error a sucedido. Intentalo de nuevo.",
                    isUser: false,
                    isError: true
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='container'>
            {/* <Navbar/> */}
            <div className="chatbot-grid">
                {chatbots.map((chatbot) => (
                    <ChatbotButton
                        key={chatbot.name}
                        chatbot={chatbot}
                        onClick={handleChatbotClick}
                    />
                ))}
            </div>
            {currentChatbot && (
                <ChatWindow
                    chatbot={currentChatbot}
                    onClose={handleClose}
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};

export default ChatbotInterface;