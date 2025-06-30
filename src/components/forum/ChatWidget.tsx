"use client";
import React, { useState } from "react";
import { Send, X } from "lucide-react";
import Image from "next/image";

interface ChatMessageProps {
  sender: string;
  avatar: string;
  message: string;
  isUser?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, avatar, message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isUser && (
        <Image src={avatar} alt={sender} className="w-8 h-8 rounded-full mr-2" />
      )}
      <div className={`${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'} px-3 py-2 rounded-2xl max-w-[75%]`}>
        {!isUser && <p className="font-medium text-xs">{sender}</p>}
        <p className="text-xs">{message}</p>
      </div>
      {isUser && (
        <Image src={avatar} alt={sender} className="w-8 h-8 rounded-full ml-2" />
      )}
    </div>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState("");

  const messages = [
    {
      sender: "Support Team",
      avatar: "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg",
      message: "Hey! How's it going?",
      isUser: false,
    },
    {
      sender: "You",
      avatar: "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg",
      message: "I'm having trouble finding information about pet vaccinations",
      isUser: true,
    },
    {
      sender: "Support Team",
      avatar: "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg",
      message: "I'm happy to help! You can check the vaccination section in our health category or ask a question in the forum.",
      isUser: false,
    },
    {
      sender: "You",
      avatar: "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg",
      message: "Thanks, I'll take a look!",
      isUser: true,
    },
  ];

  const onlineSupporters = [
    { name: "Jasmine", avatar: "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg" },
    { name: "Pinkie", avatar: "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg" },
    { name: "Jack L. Thompson", avatar: "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg" },
    { name: "Matt Damon", avatar: "https://images.pexels.com/photos/669502/pexels-photo-669502.jpeg?cs=srgb&dl=pexels-goumbik-669502.jpg&fm=jpg" },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // In a real app, would send the message to backend
      setMessage("");
    }
  };

  if (!isOpen) {
    return (
      <button 
        className="fixed bottom-4 right-4 bg-[#2F1667] text-white rounded-full p-4 shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        Chat with us
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full lg:w-80 max-w-full">
      {/* Header */}
      <div className="bg-[#2F1667] text-white p-3 flex justify-between items-center">
        <h3 className="font-medium">Hey! How&apos;s it going?</h3>
        <button 
          className="text-white hover:text-gray-200"
          onClick={() => setIsOpen(false)}
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="p-3 h-60 overflow-y-auto bg-white">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            sender={msg.sender}
            avatar={msg.avatar}
            message={msg.message}
            isUser={msg.isUser}
          />
        ))}
      </div>

      {/* Online supporters */}
      <div className="px-3 py-2 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-1">Online Support</p>
        <div className="flex -space-x-2 overflow-hidden">
          {onlineSupporters.map((supporter, index) => (
            <Image
              key={index}
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
              src={supporter.avatar}
              alt={supporter.name}
            />
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200 flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-[#2F1667]"
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-[#2F1667] text-white p-2 rounded-full hover:bg-opacity-90"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;