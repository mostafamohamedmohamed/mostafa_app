
import React from 'react';
import { mockChannels, mockStatuses } from '../services/storageService';

const UpdatesView: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto">
      {/* Status Section */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Status</h2>
          <i className="fa-solid fa-ellipsis-vertical text-gray-500 cursor-pointer"></i>
        </div>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {mockStatuses.map((status) => (
            <div key={status.id} className="flex flex-col items-center min-w-[70px] cursor-pointer">
              <div className={`p-0.5 rounded-full border-2 ${status.isSeen ? 'border-gray-300' : 'border-[#008069]'} mb-1`}>
                <img src={status.avatar} className="w-14 h-14 rounded-full object-cover border-2 border-white" alt={status.userName} />
              </div>
              <span className="text-[11px] text-gray-700 font-medium truncate w-16 text-center">{status.userName}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-2 bg-gray-50"></div>

      {/* Channels Section */}
      <div className="px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Channels</h2>
          <button className="text-[#008069] text-sm font-bold flex items-center gap-1">
            Explore <i className="fa-solid fa-chevron-right text-[10px]"></i>
          </button>
        </div>

        <p className="text-gray-500 text-sm mb-4 leading-snug">Stay updated on topics that matter to you. Find channels to follow below.</p>

        <div className="space-y-4">
          {mockChannels.map((channel) => (
            <div key={channel.id} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-3">
                <img src={channel.avatar} className="w-12 h-12 rounded-full object-cover border border-gray-100" alt={channel.name} />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-bold text-gray-900 text-[15px]">{channel.name}</h4>
                    {channel.verified && <i className="fa-solid fa-circle-check text-[#53bdeb] text-[12px]"></i>}
                  </div>
                  <p className="text-xs text-gray-500">{channel.followers} followers</p>
                </div>
              </div>
              <button className="bg-[#e7fce3] text-[#008069] px-4 py-1.5 rounded-full text-sm font-bold hover:bg-[#d6f7cf] transition-colors">
                Follow
              </button>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 border-2 border-gray-100 text-[#008069] py-2 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors">
          Find channels
        </button>
      </div>

      {/* Floating Action Buttons for Updates */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-20">
        <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 shadow-md active:scale-95 transition-all">
          <i className="fa-solid fa-pen text-lg"></i>
        </button>
        <button className="w-14 h-14 bg-[#25d366] rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg active:scale-95 transition-all">
          <i className="fa-solid fa-camera"></i>
        </button>
      </div>
    </div>
  );
};

export default UpdatesView;
