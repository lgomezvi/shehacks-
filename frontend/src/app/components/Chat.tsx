// components/Chat.tsx
import React, { useState } from 'react';
import { Send, Paperclip, ChevronLeft } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
}

interface Chat {
  id: string;
  user: string;
  lastMessage: string;
  timestamp: Date;
}

export const Chat: React.FC = () => {
  const { user } = useAuth0();
  console.log(user)
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<{ [chatId: string]: Message[] }>({});
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const timestamp = new Date();
      
      if (!activeChat) {
        // Create new chat
        const newChatId = Date.now().toString();
        const newChat: Chat = {
          id: newChatId,
          user: "John Smith", // This would come from the selected product/user
          lastMessage: newMessage,
          timestamp: timestamp
        };
        setChats([newChat, ...chats]);
        setActiveChat(newChatId);
        setMessages({
          ...messages,
          [newChatId]: [{
            id: timestamp.toString(),
            content: newMessage,
            sender: 'user1',
            timestamp: timestamp
          }]
        });
      } else {
        // Add to existing chat
        const chatMessages = messages[activeChat] || [];
        setMessages({
          ...messages,
          [activeChat]: [...chatMessages, {
            id: timestamp.toString(),
            content: newMessage,
            sender: user?.nickname || 'unknown',
            timestamp: timestamp
          }]
        });
        // Update last message in chat list
        setChats(chats.map(chat => 
          chat.id === activeChat 
            ? { ...chat, lastMessage: newMessage, timestamp: timestamp }
            : chat
        ));
      }
      setNewMessage('');
    }
  };

  const renderChatList = () => (
    <div className="h-full bg-white">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>
      <div className="overflow-y-auto">
        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => setActiveChat(chat.id)}
            className="p-4 border-b hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 font-semibold">
                  {chat.user.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{chat.user}</h3>
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
              <span className="text-xs text-gray-500">
                {chat.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        ))}
        {chats.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No messages yet. Start a conversation!
          </div>
        )}
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="border-b p-4 bg-white">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveChat(null)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 font-semibold">JS</span>
          </div>
          <div>
            <h2 className="font-semibold">John Smith</h2>
            <p className="text-sm text-gray-500">Macbook Pro</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
        {(messages[activeChat!] || []).map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user1' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'user1'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none shadow'
              }`}
            >
              <p>{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'user1' ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message input */}
      <div className="border-t bg-white p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Paperclip className="w-5 h-5 text-gray-500" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Chat list - hide on mobile when chat is active */}
      <div className={`w-full md:w-80 border-r ${activeChat ? 'hidden md:block' : 'block'}`}>
        {renderChatList()}
      </div>
      
      {/* Active chat - show on mobile only when active */}
      <div className={`flex-1 ${activeChat ? 'block' : 'hidden md:block'}`}>
        {activeChat ? renderChat() : (
          <div className="h-full flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">Select a chat or start a new conversation</p>
          </div>
        )}
      </div>
    </div>
  );
};