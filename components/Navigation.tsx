
import React, { useState, useRef, useEffect } from 'react';

interface NavigationProps {
  onMetaAiClick?: () => void;
  onOpenSettings?: () => void;
  onOpenStats?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onMetaAiClick, onOpenSettings, onOpenStats }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const menuOptions = [
    { label: 'New group', onClick: () => alert('New group feature coming soon!') },
    { label: 'New broadcast', onClick: () => alert('New broadcast feature coming soon!') },
    { label: 'Linked devices', onClick: () => alert('Linked devices') },
    { label: 'Statistics', onClick: () => { setIsMenuOpen(false); onOpenStats?.(); } },
    { label: 'Settings', onClick: () => { setIsMenuOpen(false); onOpenSettings?.(); } },
  ];

  return (
    <nav className="whatsapp-header border-none z-50 px-4 py-4 flex items-center justify-between shadow-md h-[60px] relative">
      <h1 className="text-xl font-medium text-white tracking-wide">Mostafa App</h1>
      <div className="flex items-center gap-6 text-white">
        {/* Meta AI icon - Fully functional as per screenshot request */}
        <button 
          onClick={onMetaAiClick}
          className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center cursor-pointer hover:bg-white/25 transition-all active:scale-90"
          title="Open Meta AI Hub"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#00d2ff] via-[#3a7bd5] to-[#fbc2eb] p-[1.5px]">
            <div className="w-full h-full bg-[#008069] rounded-full flex items-center justify-center">
               <i className="fa-solid fa-circle-nodes text-[10px] text-white"></i>
            </div>
          </div>
        </button>
        <i className="fa-solid fa-camera cursor-pointer text-lg opacity-90 hover:opacity-100 transition-opacity"></i>
        <i className="fa-solid fa-magnifying-glass cursor-pointer text-lg opacity-90 hover:opacity-100 transition-opacity"></i>
        
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center w-6 h-6 outline-none focus:outline-none"
          >
            <i className="fa-solid fa-ellipsis-vertical cursor-pointer text-lg opacity-90 hover:opacity-100 transition-opacity"></i>
          </button>

          {/* Dropdown Menu - WhatsApp Style */}
          {isMenuOpen && (
            <div className="absolute top-10 right-0 w-52 bg-white rounded-lg shadow-2xl py-2 z-[70] animate-in fade-in zoom-in-95 duration-100 origin-top-right">
              {menuOptions.map((option, idx) => (
                <button
                  key={idx}
                  onClick={option.onClick}
                  className="w-full text-left px-4 py-3 text-[15.5px] text-gray-800 hover:bg-gray-100 transition-colors active:bg-gray-200"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
