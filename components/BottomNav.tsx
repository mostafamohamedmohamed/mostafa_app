
import React from 'react';
import { AppTab } from '../types';

interface BottomNavProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  unreadChats?: number;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, unreadChats = 0 }) => {
  const tabs = [
    { id: AppTab.CHATS, icon: 'fa-message', label: 'Chats', badge: unreadChats },
    { id: AppTab.UPDATES, icon: 'fa-circle-notch', label: 'Updates' },
    { id: AppTab.COMMUNITIES, icon: 'fa-users', label: 'Communities' },
    { id: AppTab.REELS, icon: 'fa-film', label: 'Reels' },
    { id: AppTab.CALLS, icon: 'fa-phone', label: 'Calls' },
  ];

  return (
    <div className="bg-white border-t border-gray-100 flex justify-around items-center py-2 pb-6 px-1 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex flex-col items-center gap-1.5 relative flex-1 min-w-0"
          >
            <div className={`w-14 h-8 flex items-center justify-center rounded-full transition-all duration-300 relative ${
              isActive ? 'bg-[#D9FDD3] text-[#008069]' : 'text-gray-600 hover:bg-gray-50'
            }`}>
              <i className={`fa-solid ${tab.icon} ${isActive ? 'text-[18px]' : 'text-[20px]'}`}></i>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#25D366] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center border-2 border-white shadow-sm z-10">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className={`text-[11px] transition-colors truncate w-full text-center ${
              isActive ? 'text-[#008069] font-bold' : 'text-gray-600 font-medium'
            }`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
