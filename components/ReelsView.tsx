
import React from 'react';
import { mockReels } from '../services/storageService';

const ReelsView: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-black overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      {mockReels.map((reel) => (
        <div key={reel.id} className="relative w-full h-full flex-none snap-start overflow-hidden">
          {/* Background Content (Using image as placeholder for video) */}
          <img 
            src={reel.videoUrl} 
            className="w-full h-full object-cover" 
            alt="Reel content" 
          />
          
          {/* Gradient Overlay for visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
          
          {/* Interaction Icons (Right Side) */}
          <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center z-10">
            <div className="flex flex-col items-center gap-1 group">
              <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-xl active:scale-90 transition-transform hover:bg-red-500/20">
                <i className="fa-solid fa-heart"></i>
              </button>
              <span className="text-[12px] text-white font-bold drop-shadow-md">{reel.likes}</span>
            </div>
            
            <div className="flex flex-col items-center gap-1 group">
              <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-xl active:scale-90 transition-transform hover:bg-white/20">
                <i className="fa-solid fa-comment-dots"></i>
              </button>
              <span className="text-[12px] text-white font-bold drop-shadow-md">{reel.comments}</span>
            </div>
            
            <div className="flex flex-col items-center gap-1 group">
              <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-xl active:scale-90 transition-transform hover:bg-white/20">
                <i className="fa-solid fa-share"></i>
              </button>
              <span className="text-[12px] text-white font-bold drop-shadow-md">Share</span>
            </div>
            
            <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-xl">
              <i className="fa-solid fa-ellipsis"></i>
            </button>
          </div>
          
          {/* User Info & Caption (Bottom Left) */}
          <div className="absolute left-4 bottom-8 flex flex-col gap-2 max-w-[70%] z-10">
            <div className="flex items-center gap-2">
              <img src={reel.userAvatar} className="w-9 h-9 rounded-full border-2 border-[#25d366]" alt={reel.userName} />
              <span className="text-white font-bold text-[15px] drop-shadow-md">@{reel.userName}</span>
              <button className="bg-transparent border border-white text-white px-3 py-1 rounded-full text-[12px] font-bold ml-2">Follow</button>
            </div>
            <p className="text-white text-sm line-clamp-2 drop-shadow-md">
              {reel.caption}
            </p>
            <div className="flex items-center gap-2 text-white/80 text-xs">
              <i className="fa-solid fa-music"></i>
              <span className="animate-marquee whitespace-nowrap overflow-hidden inline-block">Original Audio - fitness_vibes</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReelsView;
