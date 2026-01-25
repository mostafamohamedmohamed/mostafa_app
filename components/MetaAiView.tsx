
import React, { useState, useEffect, useRef } from 'react';
import { geminiService } from '../services/geminiService';

interface MetaAiViewProps {
  onBack: () => void;
}

const MetaAiView: React.FC<MetaAiViewProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<{ role: string; text: string; id: string }[]>([
    { role: 'model', text: 'Hi! I\'m Meta AI. Think of me like a creative partner that can help you get things done, learn something new, or just chat. How can I help you today?', id: 'welcome' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Plan a 3-day workout routine",
    "How much protein do I need?",
    "Explain progressive overload",
    "Suggest a healthy post-workout snack"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMsg = { role: 'user', text: messageText, id: Date.now().toString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const response = await geminiService.getChatResponse(messageText, history);
      setMessages(prev => [...prev, { role: 'model', text: response, id: Date.now().toString() + '-ai' }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0b141a] animate-in slide-in-from-bottom duration-300">
      {/* Dynamic Gradient Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_0%,_#3a7bd5_0%,_transparent_50%)] pointer-events-none"></div>

      {/* Header */}
      <header className="px-4 py-4 flex items-center gap-4 z-10 border-b border-white/5 bg-[#0b141a]/80 backdrop-blur-xl">
        <button onClick={onBack} className="text-white hover:bg-white/10 p-2 -ml-2 rounded-full transition-colors">
          <i className="fa-solid fa-arrow-left text-xl"></i>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00d2ff] via-[#3a7bd5] to-[#fbc2eb] p-[1px]">
            <div className="w-full h-full bg-[#0b141a] rounded-full flex items-center justify-center">
               <i className="fa-solid fa-circle-nodes text-[12px] text-white"></i>
            </div>
          </div>
          <h1 className="text-lg font-bold text-white tracking-tight">Meta AI</h1>
        </div>
      </header>

      {/* Content Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar relative z-10"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}
          >
            <div className={`max-w-[85%] p-3 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-[#005c4b] text-white rounded-tr-none' 
                : 'bg-[#202c33] text-gray-100 rounded-tl-none border border-white/5'
            }`}>
              <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#202c33] text-gray-400 p-3 rounded-2xl rounded-tl-none border border-white/5 italic text-sm animate-pulse flex items-center gap-2">
              <i className="fa-solid fa-circle-nodes animate-spin text-[10px]"></i>
              Meta AI is thinking...
            </div>
          </div>
        )}
      </div>

      {/* Suggestions / Footer */}
      <footer className="p-4 bg-transparent relative z-10">
        {!isTyping && messages.length < 5 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 pb-2">
            {suggestions.map((s, i) => (
              <button 
                key={i}
                onClick={() => handleSend(s)}
                className="bg-white/5 border border-white/10 text-white/80 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap hover:bg-white/10 active:scale-95 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-end gap-2">
          <div className="flex-1 bg-[#2a3942] rounded-3xl flex items-end px-4 py-1.5 min-h-[48px] border border-white/5">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask Meta AI anything..."
              className="flex-1 bg-transparent border-none text-white px-2 py-2 text-sm focus:ring-0 resize-none max-h-32 overflow-y-auto placeholder-white/30"
              rows={1}
            />
          </div>
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              input.trim() ? 'bg-[#00a884] text-[#0b141a]' : 'bg-white/10 text-white/40'
            }`}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default MetaAiView;
