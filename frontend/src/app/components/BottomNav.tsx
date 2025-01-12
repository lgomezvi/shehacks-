import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Plus, MessageCircle, Bot, User } from 'lucide-react';

export const BottomNav = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t h-16 px-4">
      <div className="max-w-lg mx-auto h-full">
        <div className="flex justify-between items-center h-full relative mt-1">
          {/* Explore */}
          <Link 
            href="/explore" 
            className={`flex flex-col items-center space-y-1 ${
              isActive('/explore') ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <Compass className="h-6 w-6" />
            <span className="text-xs">Explore</span>
          </Link>

          {/* Chat */}
          <Link 
            href="/chat" 
            className={`flex flex-col items-center space-y-1 ${
              isActive('/chat') ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs">Chat</span>
          </Link>

          {/* Add Item Button */}
          <Link 
            href="/add-item"
            className="absolute left-1/2 -translate-x-1/2 -top-6 bg-black text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="h-8 w-8" />
          </Link>

          {/* AI Assistant */}
          <Link 
            href="/assistant" 
            className={`flex flex-col items-center space-y-1 ${
              isActive('/assistant') ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <Bot className="h-6 w-6" />
            <span className="text-xs">Assistant</span>
          </Link>

          {/* Profile */}
          <Link 
            href="/profile" 
            className={`flex flex-col items-center space-y-1 ${
              isActive('/profile') ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <User className="h-6 w-6" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};