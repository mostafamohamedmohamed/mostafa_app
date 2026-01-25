
import React from 'react';
import { storageService } from '../services/storageService';

const AdminView: React.FC = () => {
  const stats = storageService.getGlobalStats();

  return (
    <div className="space-y-6 pb-24">
      <h2 className="text-2xl font-bold mb-6">Global Statistics</h2>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Users</p>
            <h3 className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xl">
            <i className="fa-solid fa-users"></i>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Global Volume</p>
            <h3 className="text-3xl font-bold">{(stats.globalVolume / 1000).toFixed(0)} Tons</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-xl">
            <i className="fa-solid fa-weight-hanging"></i>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Trending Exercise</p>
            <h3 className="text-2xl font-bold text-indigo-400">{stats.popularExercise}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-xl">
            <i className="fa-solid fa-chart-line"></i>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <h3 className="font-bold">Recent Server Events</h3>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded font-bold uppercase">Live</span>
        </div>
        <div className="divide-y divide-slate-800">
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="p-4 flex gap-3 text-xs">
                    <div className="w-2 h-2 rounded-full bg-slate-700 mt-1"></div>
                    <div>
                        <p className="text-slate-300 font-medium">User #82{i} completed a Heavy Legs session</p>
                        <p className="text-slate-500 mt-1">2 minutes ago</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminView;
