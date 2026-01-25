
import React, { useState } from 'react';
import { Exercise } from '../types';

interface WorkoutHistoryViewProps {
  workouts: Exercise[];
}

const WorkoutHistoryView: React.FC<WorkoutHistoryViewProps> = ({ workouts }) => {
  const [filter, setFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredWorkouts = workouts.filter(w => 
    w.name.toLowerCase().includes(filter.toLowerCase()) && 
    (typeFilter === 'All' || w.type === typeFilter)
  );

  return (
    <div className="space-y-6 pb-24">
      <div className="sticky top-0 bg-slate-950/80 backdrop-blur-md pt-2 pb-4 z-10">
        <h2 className="text-xl font-bold mb-4">Workout History</h2>
        <div className="flex gap-2 mb-2 overflow-x-auto pb-2 custom-scrollbar">
          {['All', 'Push', 'Pull', 'Legs', 'Cardio'].map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                typeFilter === type ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input
            type="text"
            placeholder="Search exercises..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-slate-900 border-none rounded-xl pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredWorkouts.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-dashed border-slate-800">
            <i className="fa-solid fa-box-open text-4xl text-slate-700 mb-4"></i>
            <p className="text-slate-500">No workouts found matching filters.</p>
          </div>
        ) : (
          filteredWorkouts.map((workout) => (
            <div key={workout.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-lg">{workout.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-tighter bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                      {workout.type}
                    </span>
                    <span className="text-xs text-slate-500">{workout.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-blue-500 font-bold text-lg">
                    {workout.sets.reduce((acc, s) => acc + (s.weight * s.reps), 0)}
                    <span className="text-[10px] ml-1 text-slate-500">KG VOL</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                {workout.sets.map((set, i) => (
                  <div key={i} className="bg-slate-800/50 rounded-lg py-2">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Set {i+1}</div>
                    <div className="text-xs font-bold text-white">{set.weight}kg × {set.reps}</div>
                  </div>
                ))}
              </div>

              {workout.notes && (
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs italic text-slate-400">
                  "{workout.notes}"
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkoutHistoryView;
