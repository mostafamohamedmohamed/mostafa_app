import React, { useState, useRef, useEffect } from 'react';
import { Chat } from '../types';

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const metaAiChat = chats.find(c => c.id === 'ai-meta');
  const filteredChats = chats
    .filter(c => c.id !== 'ai-meta')
    .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    if (isSearching && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearching]);

  const toggleSearch = () => {
    setIsSearching(!isSearching);
    if (isSearching) {
      setSearchTerm('');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white relative overflow-hidden">
      {/* Search Bar Overlay */}
      {isSearching && (
        <div className="absolute top-0 left-0 w-full h-[60px] bg-[#008069] z-50 px-4 flex items-center gap-4 shadow-md animate-in slide-in-from-top duration-200">
          <button onClick={toggleSearch} className="text-white p-2">
            <i className="fa-solid fa-arrow-left text-lg"></i>
          </button>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none text-white placeholder-white/70 focus:ring-0 text-lg outline-none"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="text-white p-2">
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          )}
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar whatsapp-bg">
        {/* Archived Row */}
        <div className="flex items-center gap-6 px-5 py-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100 transition-colors">
          <div className="flex-none text-[#008069] text-xl">
             <i className="fa-solid fa-box-archive"></i>
          </div>
          <div className="flex-1 flex justify-between items-center">
            <span className="font-bold text-gray-900 text-[15px]">Archived</span>
            <span className="text-[#008069] text-[12px] font-bold">12</span>
          </div>
        </div>

        {/* Chat List Items */}
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors active:bg-gray-100"
            >
              <div className="relative flex-none">
                <img src={chat.avatar} alt={chat.name} className="w-[52px] h-[52px] rounded-full object-cover border border-gray-100 shadow-sm" />
                {chat.isOnline && (
                  <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-[#25d366] border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0 border-b border-gray-100 pb-3">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-gray-900 text-[16px] truncate">{chat.name}</h3>
                  <span className={`text-[11px] ${chat.unreadCount > 0 ? 'text-[#25d366] font-bold' : 'text-gray-500'}`}>
                    {chat.lastTimestamp || '10:53 AM'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 min-w-0">
                    <i className={`fa-solid fa-check-double text-[12px] text-[#53bdeb]`}></i>
                    <p className="text-[14px] text-gray-500 truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unreadCount > 0 && (
                    <span className="bg-[#25d366] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] h-[20px] flex items-center justify-center shadow-sm">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-10 text-center animate-in fade-in duration-300">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-4">
              <i className="fa-solid fa-magnifying-glass text-4xl"></i>
            </div>
            <p className="text-gray-500 font-medium">No chats found</p>
          </div>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 right-6 flex flex-col gap-4 z-20">
        <button 
          onClick={() => metaAiChat && onSelectChat(metaAiChat)}
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 active:scale-90 hover:scale-105 transition-all group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00d2ff] via-[#3a7bd5] to-[#fbc2eb] opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00d2ff] via-[#3a7bd5] to-[#fbc2eb] p-[1.5px]">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <i className="fa-solid fa-circle-nodes text-[#3a7bd5] text-sm"></i>
            </div>
          </div>
        </button>

        <button className="w-14 h-14 bg-[#25d366] rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg active:scale-90 hover:scale-105 transition-all">
          <i className="fa-solid fa-comment-dots"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatList;