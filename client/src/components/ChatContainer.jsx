import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react';
import assets from '../assets/assets';

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (selectedUser) {
            fetchMessages(selectedUser._id);
        }
    }, [selectedUser]);

    const fetchMessages = async (userId) => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            } else {
                console.error('Failed to fetch messages');
                // Fallback to mock data if API fails
                setMessages([
                    {
                        text: "Hey there! 👋 Welcome to Chitchat.",
                        sender: "other",
                        time: "09:00",
                        avatar: selectedUser.profilePic || assets.profile_martin
                    },
                    {
                        text: "Thanks! This UI looks amazing!",
                        sender: "me", 
                        time: "09:01",
                        avatar: assets.profile_alison
                    }
                ]);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
            // Fallback to mock data if API fails
            setMessages([
                {
                    text: "Hey there! 👋 Welcome to Chitchat.",
                    sender: "other",
                    time: "09:00",
                    avatar: selectedUser.profilePic || assets.profile_martin
                },
                {
                    text: "Thanks! This UI looks amazing!",
                    sender: "me",
                    time: "09:01", 
                    avatar: assets.profile_alison
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async () => {
        if (input.trim() === "" || !selectedUser) return;
        
        const newMessage = {
            text: input,
            sender: "me",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            avatar: assets.profile_alison
        };

        setMessages([...messages, newMessage]);
        setInput("");

        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    receiverId: selectedUser._id,
                    content: newMessage.text
                })
            });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return selectedUser ? (
        <div className="h-full flex flex-col relative  backdrop-blur-3xl border border-white/10  shadow-2xl overflow-hidden">
            {/* Floating gradient background */}
            <div className="absolute inset-0  pointer-events-none" />
            
            {/* Header */}
            <div className="relative flex items-center gap-4 p-6 border-b border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="relative">
                    <img 
                        src={selectedUser?.profilePic || assets.profile_martin} 
                        alt="User" 
                        className="w-12 h-12 rounded-full shadow-lg border-2 border-white/20 object-cover" 
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${selectedUser?.online ? "bg-green-400" : "bg-red-400"} rounded-full border-2 border-white/20 animate-pulse`} />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold text-white/90">{selectedUser?.fullName || "Martin Johnson"}</h2>
                        <div className={`px-2 py-1 ${selectedUser?.online ? "bg-green-400/20 text-green-300 border-green-400/30" : "bg-red-400/20 text-red-300 border-red-400/30"} text-xs rounded-full border`}>
                            {selectedUser?.online ? "Online" : "Offline"}
                        </div>
                    </div>
                    <p className="text-sm text-white/60 mt-1">{selectedUser?.online ? "Active now" : "Last seen recently"}</p>
                </div>
                
                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/10 hover:scale-105">
                        <Phone className="w-5 h-5 text-white/80" />
                    </button>
                    <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/10 hover:scale-105">
                        <Video className="w-5 h-5 text-white/80" />
                    </button>
                    <button 
                        onClick={() => setSelectedUser(null)} 
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/10 hover:scale-105"
                    >
                        <ArrowLeft className="w-5 h-5 text-white/80" />
                    </button>
                    <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/10 hover:scale-105">
                        <MoreVertical className="w-5 h-5 text-white/80" />
                    </button>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6 relative">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="text-white/60">Loading messages...</div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} animate-fade-in`}> 
                            <div className={`flex items-end gap-3 max-w-md ${msg.sender === "me" ? "flex-row-reverse" : ""}`}>
                                <img 
                                    src={msg.avatar} 
                                    alt="avatar" 
                                    className="w-8 h-8 rounded-full shadow-md border border-white/20 flex-shrink-0" 
                                />
                                <div className={`relative group ${msg.sender === "me" ? "" : ""}`}>
                                    <div className={`px-5 py-3 rounded-3xl shadow-lg backdrop-blur-xl border transition-all duration-200 group-hover:scale-[1.02] ${
                                        msg.sender === "me" 
                                            ? "bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white border-white/20 ml-2" 
                                            : "bg-white/10 text-white/90 border-white/10 mr-2"
                                    }`}>
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                        <span className={`text-xs mt-2 block ${
                                            msg.sender === "me" ? "text-white/70" : "text-white/50"
                                        }`}>
                                            {msg.time}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="relative p-6 bg-white/5 backdrop-blur-xl border-t border-white/10">
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 p-2 focus-within:border-white/40 transition-all duration-200">
                    <input
                        type="text"
                        className="flex-1 px-4 py-3 bg-transparent border-none outline-none text-white/90 placeholder-white/50 text-sm"
                        placeholder="Type your message..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
                    />
                    <button
                        className={`p-3 rounded-full transition-all duration-200 flex items-center justify-center group ${
                            input.trim() 
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 scale-100 hover:scale-105" 
                                : "bg-white/10 hover:bg-white/20 scale-95"
                        }`}
                        onClick={handleSend}
                    >
                        <Send className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform duration-200" />
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <div className="flex flex-col gap-6 items-center justify-center h-full bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 relative overflow-hidden">
            {/* Floating background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            
            <div className="relative z-10 flex flex-col items-center gap-6 animate-fade-in">
                <div className="relative">
                    <img 
                        src={assets.logo_icon} 
                        alt="Logo" 
                        className="w-20 h-20 opacity-80 animate-bounce" 
                        style={{ animationDuration: '3s' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl scale-150" />
                </div>
                <div className="text-center space-y-2">
                    <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                        Chat anytime, anywhere
                    </h3>
                    <p className="text-white/60 text-sm">Select a user to start chatting</p>
                </div>
            </div>
        </div>
    );
}

export default ChatContainer;