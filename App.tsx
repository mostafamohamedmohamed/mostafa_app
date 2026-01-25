
import React, { useState, useEffect } from 'react';
import { AppTab, Chat, Message, User, WorkoutHistory } from './types';
import { storageService } from './services/storageService';
import Navigation from './components/Navigation';
import BottomNav from './components/BottomNav';
import ChatList from './components/ChatList';
import ChatView from './components/ChatView';
import Dashboard from './components/Dashboard';
import CommunitiesView from './components/CommunitiesView';
import UpdatesView from './components/UpdatesView';
import ReelsView from './components/ReelsView';
import MapView from './components/MapView';
import SettingsView from './components/SettingsView';
import MetaAiView from './components/MetaAiView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.CHATS);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMetaAi, setShowMetaAi] = useState(false);
  const [mockHistory, setMockHistory] = useState<WorkoutHistory[]>([]);

  useEffect(() => {
    setChats(storageService.getChats());
    const user = storageService.getUser();
    setCurrentUser(user);

    // Generate mock history for Dashboard
    const history: WorkoutHistory[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      history.push({
        date: d.toLocaleDateString([], { month: 'short', day: 'numeric' }),
        totalVolume: 5000 + Math.random() * 3000
      });
    }
    setMockHistory(history);
  }, []);

  const handleSelectChat = (chat: Chat) => {
    setSelectedChatId(chat.id);
    const updatedChats = chats.map(c => 
      c.id === chat.id ? { ...c, unreadCount: 0 } : c
    );
    setChats(updatedChats);
    storageService.saveChats(updatedChats);
  };

  const handleSendMessage = (chatId: string, text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      senderId: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    const updatedChats = chats.map(c => {
      if (c.id === chatId) {
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMessage: text,
          lastTimestamp: newMessage.timestamp
        };
      }
      return c;
    });

    setChats(updatedChats);
    storageService.saveChats(updatedChats);
  };

  const selectedChat = chats.find(c => c.id === selectedChatId);

  // Meta AI Hub Overlay - Fully functional page triggered by header button
  if (showMetaAi) {
    return (
      <div className="max-w-md mx-auto h-screen relative flex flex-col bg-black overflow-hidden shadow-2xl">
        <MetaAiView onBack={() => setShowMetaAi(false)} />
      </div>
    );
  }

  // Stats View Overlay
  if (showStats && currentUser) {
    return (
      <div className="max-w-md mx-auto h-screen relative flex flex-col bg-slate-950 overflow-hidden shadow-2xl">
        <header className="bg-[#008069] p-4 flex items-center gap-4 border-b border-white/10">
          <button onClick={() => setShowStats(false)} className="text-white">
            <i className="fa-solid fa-arrow-left text-xl"></i>
          </button>
          <h1 className="text-xl font-bold text-white">Fitness Progress</h1>
        </header>
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <Dashboard user={currentUser} history={mockHistory} />
        </div>
      </div>
    );
  }

  // Settings View Overlay
  if (showSettings && currentUser) {
    return (
      <div className="max-w-md mx-auto h-screen relative flex flex-col bg-white overflow-hidden shadow-2xl">
        <SettingsView user={currentUser} onBack={() => setShowSettings(false)} />
      </div>
    );
  }

  // Chat View Overlay
  if (selectedChat) {
    return (
      <div className="max-w-md mx-auto h-screen relative flex flex-col bg-white overflow-hidden shadow-2xl">
        <ChatView 
          chat={selectedChat} 
          onBack={() => setSelectedChatId(null)} 
          onSendMessage={handleSendMessage}
        />
      </div>
    );
  }

  const unreadCount = chats.reduce((acc, c) => acc + (c.unreadCount > 0 ? 1 : 0), 0);

  const renderTabContent = () => {
    switch (activeTab) {
      case AppTab.CHATS:
        return (
          <div className="flex flex-col h-full pt-[60px] bg-white">
            <ChatList 
              chats={chats} 
              onSelectChat={handleSelectChat} 
            />
          </div>
        );
      case AppTab.COMMUNITIES:
        return (
          <div className="flex flex-col h-full pt-[60px] bg-white">
            <CommunitiesView />
          </div>
        );
      case AppTab.UPDATES:
        return (
          <div className="flex flex-col h-full pt-[60px] bg-white">
            <UpdatesView />
          </div>
        );
      case AppTab.CALLS:
        return (
          <div className="flex flex-col h-full pt-[60px] bg-white flex items-center justify-center text-gray-400 p-8 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-200">
              <i className="fa-solid fa-phone text-4xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-900">No recent calls</h3>
            <p className="text-sm">To start calling contacts who have WhatsApp, tap the plus icon at the bottom of your screen.</p>
            <button className="fixed bottom-24 right-6 w-14 h-14 bg-[#25d366] rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg active:scale-90 hover:scale-105 transition-all">
               <i className="fa-solid fa-phone-flip"></i>
            </button>
          </div>
        );
      case AppTab.REELS:
        return (
          <div className="flex flex-col h-full pt-[60px] bg-black">
            <ReelsView />
          </div>
        );
      case AppTab.MAP:
        return (
          <div className="flex flex-col h-full pt-[60px] bg-slate-50">
            <MapView />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen relative flex flex-col bg-white overflow-hidden shadow-2xl">
      {/* Fixed Top Bar - Shared across all main tabs */}
      <div className="absolute top-0 w-full z-40">
        <Navigation 
          onMetaAiClick={() => setShowMetaAi(true)} 
          onOpenSettings={() => setShowSettings(true)}
          onOpenStats={() => setShowStats(true)}
        />
      </div>

      <main className="flex-1 w-full overflow-hidden flex flex-col">
        {renderTabContent()}
      </main>
      
      {/* Bottom Navigation Bar */}
      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        unreadChats={unreadCount} 
      />
    </div>
  );
};

export default App;
