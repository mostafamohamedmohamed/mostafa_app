
import React from 'react';
import { Community } from '../types';
import { mockCommunities } from '../services/storageService';

const CommunitiesView: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto pt-4">
      <div className="flex items-center gap-4 px-4 py-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100">
        <div className="relative w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 overflow-hidden">
          <i className="fa-solid fa-users text-2xl"></i>
          <div className="absolute bottom-0 right-0 bg-[#008069] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
            <i className="fa-solid fa-plus text-white text-[10px]"></i>
          </div>
        </div>
        <span className="font-bold text-gray-900 text-[16px]">New community</span>
      </div>

      <div className="h-2 bg-gray-50"></div>

      {mockCommunities.map((comm) => (
        <React.Fragment key={comm.id}>
          <div className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50 cursor-pointer transition-colors">
            <img src={comm.avatar} alt={comm.name} className="w-12 h-12 rounded-xl object-cover shadow-sm border border-gray-100" />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-[16px] truncate">{comm.name}</h3>
              <p className="text-[14px] text-gray-500 truncate">{comm.description}</p>
            </div>
          </div>
          <div className="h-0.5 bg-gray-50 mx-4"></div>
        </React.Fragment>
      ))}
      
      <div className="p-8 text-center">
        <p className="text-gray-400 text-sm">Communities bring members together in topic-based groups.</p>
      </div>
    </div>
  );
};

export default CommunitiesView;
