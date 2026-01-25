
import React, { useState, useEffect, useRef } from 'react';
import { Chat, Message } from '../types';
import { geminiService } from '../services/geminiService';

interface ChatViewProps {
  chat: Chat;
  onBack: () => void;
  onSendMessage: (chatId: string, text: string) => void;
}

const ChatView: React.FC<ChatViewProps> = ({ chat, onBack, onSendMessage }) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat.messages, isTyping]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    const userMsg = inputText;
    setInputText('');
    onSendMessage(chat.id, userMsg);

    if (chat.type === 'ai') {
      setIsTyping(true);
      const history = chat.messages.map(m => ({
        role: m.senderId === 'me' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));
      
      const aiResponse = await geminiService.getChatResponse(userMsg, history);
      setIsTyping(false);
      onSendMessage(chat.id, aiResponse);
    }
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      <div className="whatsapp-bg absolute inset-0 -z-10"></div>
      
      {/* Header */}
      <header className="bg-[#202c33] p-2 flex items-center gap-2 z-10 shadow-md">
        <button onClick={onBack} className="p-2 text-slate-300">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1 min-w-0" onClick={onBack}>
          <h3 className="font-semibold text-slate-100 truncate leading-tight">{chat.name}</h3>
          <p className="text-[10px] text-[#00a884]">{chat.isOnline ? 'online' : 'last seen recently'}</p>
        </div>
        <div className="flex gap-4 p-2 text-slate-400">
          <i className="fa-solid fa-video cursor-pointer"></i>
          <i className="fa-solid fa-phone cursor-pointer"></i>
          <i className="fa-solid fa-ellipsis-vertical cursor-pointer"></i>
        </div>
      </header>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar flex flex-col"
      >
        <div className="mx-auto bg-[#182229] px-3 py-1 rounded-lg text-[10px] text-slate-400 uppercase font-bold mb-4">
          Today
        </div>

        {chat.messages.map((msg) => (
          <div 
            key={msg.id}
            className={`max-w-[85%] p-2 shadow-sm flex flex-col animate-in slide-in-from-bottom-2 duration-200 ${
              msg.senderId === 'me' 
                ? 'chat-bubble-sender self-end text-slate-100' 
                : 'chat-bubble-receiver self-start text-slate-100'
            }`}
          >
            <p className="text-[13px] leading-relaxed break-words">{msg.text}</p>
            <div className="flex justify-end items-center gap-1 mt-1">
              <span className="text-[9px] text-slate-400/80">{msg.timestamp}</span>
              {msg.senderId === 'me' && (
                <i className={`fa-solid fa-check-double text-[10px] ${msg.status === 'read' ? 'text-blue-400' : 'text-slate-500'}`}></i>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-bubble-receiver self-start p-3 rounded-lg text-slate-400 text-xs italic animate-pulse">
            Meta AI is typing...
          </div>
        )}
      </div>

      {/* Input */}
      <footer className="p-2 flex items-end gap-2 bg-transparent">
        <div className="flex-1 bg-[#202c33] rounded-3xl flex items-end p-1 px-3 min-h-[48px]">
          <button className="p-2 text-slate-400">
            <i className="fa-regular fa-face-smile text-xl"></i>
          </button>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Message"
            className="flex-1 bg-transparent border-none text-slate-100 px-2 py-2 text-sm focus:ring-0 resize-none max-h-32 overflow-y-auto"
            rows={1}
          />
          <button className="p-2 text-slate-400">
            <i className="fa-solid fa-paperclip text-xl rotate-45"></i>
          </button>
          {!inputText && (
             <button className="p-2 text-slate-400">
              <i className="fa-solid fa-camera text-xl"></i>
            </button>
          )}
        </div>
        <button 
          onClick={handleSend}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform ${
            inputText ? 'bg-[#00a884] text-[#0c1317]' : 'bg-[#00a884] text-[#0c1317]'
          }`}
        >
          {inputText ? (
            <i className="fa-solid fa-paper-plane text-lg ml-0.5"></i>
          ) : (
            <i className="fa-solid fa-microphone text-lg"></i>
          )}
        </button>
      </footer>
    </div>
  );
};

export default ChatView;
