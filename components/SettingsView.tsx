
import React from 'react';
import { User } from '../types';

interface SettingsViewProps {
  user: User;
  onBack: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ user, onBack }) => {
  const handleSelectKey = async () => {
    if (typeof (window as any).aistudio?.openSelectKey === 'function') {
      await (window as any).aistudio.openSelectKey();
    } else {
      alert("Key selection is only available within the AI Studio environment.");
    }
  };

  const settingsOptions = [
    { icon: 'fa-key', title: 'Account', subtitle: 'Security notifications, change number', color: 'text-gray-500' },
    { icon: 'fa-lock', title: 'Privacy', subtitle: 'Block contacts, disappearing messages', color: 'text-gray-500' },
    { icon: 'fa-ghost', title: 'Avatar', subtitle: 'Create, edit, profile photo', color: 'text-gray-500' },
    { icon: 'fa-comment-dots', title: 'Chats', subtitle: 'Theme, wallpapers, chat history', color: 'text-gray-500' },
    { icon: 'fa-bell', title: 'Notifications', subtitle: 'Message, group & call tones', color: 'text-gray-500' },
    { icon: 'fa-database', title: 'Storage and data', subtitle: 'Network usage, auto-download', color: 'text-gray-500' },
    { icon: 'fa-globe', title: 'App language', subtitle: "English (phone's language)", color: 'text-gray-500' },
    { icon: 'fa-circle-question', title: 'Help', subtitle: 'Help center, contact us, privacy policy', color: 'text-gray-500' },
    { icon: 'fa-users', title: 'Invite a friend', color: 'text-gray-500' },
  ];

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="whatsapp-header px-4 py-4 flex items-center gap-6 shadow-sm">
        <button onClick={onBack} className="text-white hover:bg-white/10 p-2 -ml-2 rounded-full transition-colors">
          <i className="fa-solid fa-arrow-left text-xl"></i>
        </button>
        <h1 className="text-xl font-medium text-white">Settings</h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-10">
        {/* Profile Card */}
        <div className="px-4 py-5 flex items-center gap-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100">
          <div className="relative">
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover border border-gray-100" />
            <div className="absolute bottom-0 right-0 bg-[#008069] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
              <i className="fa-solid fa-qrcode text-white text-[10px]"></i>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-900 truncate">{user.name}</h2>
            <p className="text-sm text-gray-500 truncate">{user.status || "At the gym 🏋️‍♂️"}</p>
          </div>
        </div>

        {/* AI Key Management Section */}
        <div className="px-6 py-4 bg-blue-50/50 border-b border-blue-100">
          <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">AI Engine Management</h3>
          <button 
            onClick={handleSelectKey}
            className="w-full flex items-center gap-4 p-3 bg-white border border-blue-200 rounded-xl shadow-sm hover:bg-blue-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <i className="fa-solid fa-microchip"></i>
            </div>
            <div className="text-left flex-1">
              <h4 className="text-sm font-bold text-gray-900">Link AI Project Key</h4>
              <p className="text-[10px] text-gray-500">Requires a paid GCP project with billing enabled</p>
            </div>
            <i className="fa-solid fa-chevron-right text-gray-300 group-hover:text-blue-600 transition-colors"></i>
          </button>
          <p className="mt-2 text-[10px] text-gray-400 leading-tight">
            Learn more about <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Gemini API billing</a>.
          </p>
        </div>

        {/* Settings List */}
        <div className="mt-2">
          {settingsOptions.map((option, idx) => (
            <div key={idx} className="flex items-center gap-6 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors active:bg-gray-100">
              <div className={`w-6 flex justify-center ${option.color}`}>
                <i className={`fa-solid ${option.icon} text-lg opacity-70`}></i>
              </div>
              <div className="flex-1">
                <h3 className="text-[16px] text-gray-900 font-medium">{option.title}</h3>
                {option.subtitle && <p className="text-xs text-gray-500 mt-0.5">{option.subtitle}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-8 flex flex-col items-center gap-1 opacity-50">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">from</p>
          <div className="flex items-center gap-1.5 text-gray-800">
            <i className="fa-brands fa-meta text-sm"></i>
            <span className="font-bold text-xs tracking-wider">Meta</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
