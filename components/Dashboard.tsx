
import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { User, WorkoutHistory } from '../types';

interface DashboardProps {
  user: User;
  history: WorkoutHistory[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, history }) => {
  return (
    <div className="space-y-6 pb-24 text-slate-200">
      <header className="flex justify-between items-center bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white">Hey, {user.name.split(' ')[0]} 👋</h1>
          <p className="text-slate-400 text-sm">Fitness stats synced from your logs.</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#008069] to-emerald-400 flex items-center justify-center text-xl font-bold border-2 border-slate-800 shadow-lg">
          {user.name[0]}
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <i className="fa-solid fa-fire text-orange-500"></i>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">Day Streak</span>
          </div>
          <div className="text-2xl font-bold text-white">{user.stats.streak} Days</div>
        </div>
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <i className="fa-solid fa-dumbbell text-[#008069]"></i>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">Total Sessions</span>
          </div>
          <div className="text-2xl font-bold text-white">{user.stats.totalWorkouts}</div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-white">Weekly Performance</h3>
          <div className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded uppercase tracking-widest border border-emerald-400/20">Synced Volume</div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#008069" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#008069" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#64748b', fontSize: 10}}
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontSize: '12px' }}
                labelStyle={{ color: '#64748b', marginBottom: '4px' }}
              />
              <Area 
                type="monotone" 
                dataKey="totalVolume" 
                stroke="#008069" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorVolume)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Achievements Card */}
      <div className="bg-gradient-to-br from-[#008069] to-emerald-700 p-6 rounded-2xl shadow-xl relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="text-white font-bold text-lg mb-1">Global Leaderboard</h3>
          <p className="text-emerald-100 text-sm mb-4 leading-snug">You've reached top 15% of users in the Mostafa App community.</p>
          <button className="bg-white text-[#008069] px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg hover:bg-emerald-50 active:scale-95 transition-all">
            Join the Challenge
          </button>
        </div>
        <i className="fa-solid fa-medal absolute -right-6 -bottom-6 text-8xl text-white/10 group-hover:rotate-12 transition-transform duration-500"></i>
      </div>
    </div>
  );
};

export default Dashboard;
