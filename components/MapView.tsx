
import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { Chat } from '../types';

type MapViewState = 'main' | 'select-contact' | 'select-duration' | 'sharing-active';

const MapView: React.FC = () => {
  const [viewState, setViewState] = useState<MapViewState>('main');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  
  // Sharing States
  const [selectedContact, setSelectedContact] = useState<Chat | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string>('1 hour');
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    setChats(storageService.getChats());
  }, []);

  const handleGetLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocating(false);
      },
      () => {
        setError("Unable to retrieve your location");
        setIsLocating(false);
      }
    );
  };

  const startSharing = () => {
    setViewState('sharing-active');
  };

  const stopSharing = () => {
    setViewState('main');
    setSelectedContact(null);
  };

  const nearbyPlaces = [
    { name: 'Elite Fitness Center', distance: '0.4 km', type: 'Gym' },
    { name: 'Central Park Trail', distance: '1.2 km', type: 'Park' },
    { name: 'Protein Palace', distance: '1.8 km', type: 'Health Shop' },
    { name: 'Yoga Zen Studio', distance: '2.5 km', type: 'Studio' }
  ];

  const durations = ['15 minutes', '1 hour', '8 hours'];

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      {/* Map Placeholder / Container */}
      <div className="flex-1 relative bg-[#e5e3df] overflow-hidden">
        {/* Simple grid pattern to simulate map tiles */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#008069 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>
        
        {location ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* User Pulse Circle */}
              <div className={`absolute -inset-8 bg-blue-500/20 rounded-full ${viewState === 'sharing-active' ? 'animate-[ping_1.5s_infinite]' : 'animate-pulse'}`}></div>
              <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg z-10 relative"></div>
              
              {viewState === 'sharing-active' && (
                 <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#008069] text-white px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap shadow-lg">
                    LIVE
                 </div>
              )}
            </div>
            {/* Mock Map Detail */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-12 bg-white px-3 py-1.5 rounded-xl shadow-xl border border-gray-100 whitespace-nowrap">
              <span className="text-xs font-bold text-gray-800">Your current location</span>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-[#008069] mb-6">
              <i className="fa-solid fa-location-dot text-4xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Enable Location Services</h3>
            <p className="text-sm text-gray-500 mb-8 max-w-[240px]">See nearby fitness communities, gyms, and share your live location with friends.</p>
            <button 
              onClick={handleGetLocation}
              disabled={isLocating}
              className="bg-[#008069] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-[#008069]/20 active:scale-95 transition-all flex items-center gap-2"
            >
              {isLocating ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-location-crosshairs"></i>}
              {isLocating ? 'Locating...' : 'Get My Location'}
            </button>
            {error && <p className="mt-4 text-xs text-red-500 font-medium">{error}</p>}
          </div>
        )}

        {/* Top Overlay: Active Sharing Status */}
        {viewState === 'sharing-active' && (
           <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-emerald-100 flex items-center justify-between z-20 animate-in slide-in-from-top duration-300">
              <div className="flex items-center gap-3">
                 <div className="relative">
                    <img src={selectedContact?.avatar} className="w-10 h-10 rounded-full border-2 border-[#25d366]" alt="" />
                    <div className="absolute -bottom-1 -right-1 bg-[#25d366] w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                       <i className="fa-solid fa-location-dot text-[8px] text-white"></i>
                    </div>
                 </div>
                 <div>
                    <h4 className="text-sm font-bold text-gray-800">Sharing with {selectedContact?.name}</h4>
                    <p className="text-[10px] text-gray-500 font-medium">Ends in {selectedDuration}</p>
                 </div>
              </div>
              <button 
                onClick={stopSharing}
                className="bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-[11px] font-bold hover:bg-red-100 transition-colors"
              >
                 Stop
              </button>
           </div>
        )}

        {/* Floating Controls */}
        {location && viewState === 'main' && (
          <div className="absolute right-4 bottom-8 flex flex-col gap-3">
            <button onClick={handleGetLocation} className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-[#008069] active:scale-90 transition-transform">
              <i className="fa-solid fa-location-crosshairs text-xl"></i>
            </button>
            <button className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-600 active:scale-90 transition-transform">
              <i className="fa-solid fa-plus text-xl"></i>
            </button>
            <button className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-600 active:scale-90 transition-transform">
              <i className="fa-solid fa-minus text-xl"></i>
            </button>
          </div>
        )}
      </div>

      {/* Dynamic Bottom Drawer */}
      <div className={`transition-all duration-300 ease-out bg-white rounded-t-[32px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-10 flex flex-col ${viewState === 'main' ? 'h-[40%]' : 'h-[60%]'}`}>
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto my-4"></div>
        
        {viewState === 'main' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-6 flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Nearby Spots</h2>
              <button className="text-[#008069] text-sm font-bold">See All</button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-8 no-scrollbar">
              <div 
                onClick={() => { if(location) setViewState('select-contact'); else handleGetLocation(); }}
                className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl cursor-pointer hover:bg-emerald-100 transition-colors border border-emerald-100"
              >
                <div className="w-10 h-10 bg-[#25d366] rounded-full flex items-center justify-center text-white">
                  <i className="fa-solid fa-share-nodes"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#008069] text-sm">Share Live Location</h4>
                  <p className="text-xs text-emerald-700">Allow friends to see your movement in real-time</p>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Popular Fitness Locations</p>
                <div className="space-y-4">
                  {nearbyPlaces.map((place, idx) => (
                    <div key={idx} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 group-hover:bg-[#008069]/10 group-hover:text-[#008069] transition-colors">
                          <i className={`fa-solid ${place.type === 'Gym' ? 'fa-dumbbell' : place.type === 'Park' ? 'fa-tree' : 'fa-store'}`}></i>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{place.name}</h4>
                          <p className="text-[11px] text-gray-500">{place.type} • {place.distance}</p>
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-[#008069]">
                        <i className="fa-solid fa-chevron-right text-xs"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {viewState === 'select-contact' && (
           <div className="flex-1 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
             <div className="px-6 flex items-center gap-4 mb-4">
               <button onClick={() => setViewState('main')} className="text-gray-500">
                 <i className="fa-solid fa-arrow-left text-lg"></i>
               </button>
               <h2 className="text-xl font-bold text-gray-900">Send to...</h2>
             </div>
             <div className="flex-1 overflow-y-auto px-6 space-y-2 pb-8">
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Recent Chats</p>
               {chats.filter(c => c.id !== 'ai-meta').map((chat) => (
                 <div 
                   key={chat.id} 
                   onClick={() => { setSelectedContact(chat); setViewState('select-duration'); }}
                   className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-2xl cursor-pointer transition-colors border border-transparent active:border-gray-100"
                 >
                   <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover border border-gray-100 shadow-sm" />
                   <div className="flex-1">
                     <h4 className="font-bold text-gray-900 text-sm">{chat.name}</h4>
                     <p className="text-xs text-gray-500">Tap to share location</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        )}

        {viewState === 'select-duration' && (
           <div className="flex-1 flex flex-col p-8 items-center text-center animate-in zoom-in-95 duration-300">
             <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-[#008069] mb-6 border-4 border-white shadow-xl">
               <i className="fa-solid fa-clock-rotate-left text-3xl"></i>
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-2">Select Duration</h3>
             <p className="text-sm text-gray-500 mb-8">How long do you want {selectedContact?.name} to see your location?</p>
             
             <div className="flex gap-3 mb-10 w-full justify-center">
               {durations.map((d) => (
                 <button 
                   key={d}
                   onClick={() => setSelectedDuration(d)}
                   className={`flex-1 py-3 px-4 rounded-2xl text-sm font-bold transition-all border-2 ${
                     selectedDuration === d 
                     ? 'bg-[#008069] text-white border-[#008069] shadow-lg shadow-[#008069]/20' 
                     : 'bg-white text-gray-500 border-gray-100'
                   }`}
                 >
                   {d}
                 </button>
               ))}
             </div>

             <div className="flex gap-4 w-full">
               <button 
                 onClick={() => setViewState('select-contact')}
                 className="flex-1 py-4 text-gray-500 font-bold hover:bg-gray-50 rounded-2xl transition-colors"
               >
                 Back
               </button>
               <button 
                 onClick={startSharing}
                 className="flex-[2] bg-[#25d366] text-white py-4 rounded-2xl font-bold shadow-xl shadow-[#25d366]/20 active:scale-95 transition-all flex items-center justify-center gap-2"
               >
                 <i className="fa-solid fa-paper-plane"></i>
                 Start Live Share
               </button>
             </div>
           </div>
        )}

        {viewState === 'sharing-active' && (
           <div className="flex-1 flex flex-col p-8 items-center text-center justify-center animate-in fade-in duration-500">
             <div className="relative mb-8">
               <div className="absolute -inset-10 bg-[#25d366]/10 rounded-full animate-ping"></div>
               <div className="absolute -inset-6 bg-[#25d366]/20 rounded-full animate-pulse"></div>
               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#25d366] relative border-4 border-[#25d366] shadow-2xl">
                 <i className="fa-solid fa-street-view text-5xl"></i>
               </div>
             </div>
             <h3 className="text-2xl font-bold text-gray-900 mb-2">Live Sharing Active</h3>
             <p className="text-sm text-gray-500 max-w-[280px]">
               {selectedContact?.name} is receiving your real-time GPS coordinates. You can stop sharing at any time.
             </p>
             
             <button 
               onClick={stopSharing}
               className="mt-10 w-full bg-red-500 text-white py-4 rounded-2xl font-bold shadow-xl shadow-red-500/20 active:scale-95 transition-all"
             >
               Stop Sharing Live Location
             </button>
           </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
