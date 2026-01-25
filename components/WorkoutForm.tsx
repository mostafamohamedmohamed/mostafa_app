
import React, { useState } from 'react';
import { Exercise, Set } from '../types';

interface WorkoutFormProps {
  onSave: (exercise: Exercise) => void;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSave }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Push');
  const [sets, setSets] = useState<Set[]>([{ reps: 0, weight: 0 }]);
  const [notes, setNotes] = useState('');

  const addSet = () => setSets([...sets, { reps: 0, weight: 0 }]);
  const updateSet = (index: number, field: keyof Set, value: number) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
  };

  const removeSet = (index: number) => {
    if (sets.length > 1) {
      setSets(sets.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || sets.some(s => s.reps === 0)) {
      alert("Please fill in exercise name and at least one set with reps.");
      return;
    }

    const newExercise: Exercise = {
      id: Date.now().toString(),
      name,
      type,
      sets,
      date: new Date().toISOString().split('T')[0],
      notes
    };
    
    onSave(newExercise);
    setName('');
    setSets([{ reps: 0, weight: 0 }]);
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-24">
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-white">Log Exercise</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Exercise Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Bench Press"
              className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Category</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option>Push</option>
              <option>Pull</option>
              <option>Legs</option>
              <option>Cardio</option>
              <option>Other</option>
            </select>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sets</label>
              <button 
                type="button" 
                onClick={addSet}
                className="text-blue-500 text-xs font-bold hover:text-blue-400 transition-colors"
              >
                + Add Set
              </button>
            </div>
            
            {sets.map((set, index) => (
              <div key={index} className="flex gap-3 items-center animate-in slide-in-from-left duration-200">
                <div className="flex-none w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    value={set.weight || ''}
                    onChange={(e) => updateSet(index, 'weight', parseFloat(e.target.value))}
                    placeholder="kg"
                    className="w-full bg-slate-800 border-none rounded-xl px-4 py-2 text-center text-white focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    value={set.reps || ''}
                    onChange={(e) => updateSet(index, 'reps', parseInt(e.target.value))}
                    placeholder="reps"
                    className="w-full bg-slate-800 border-none rounded-xl px-4 py-2 text-center text-white focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                {sets.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeSet(index)}
                    className="flex-none text-slate-500 hover:text-red-500 transition-colors"
                  >
                    <i className="fa-solid fa-circle-minus"></i>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none h-20 resize-none"
              placeholder="How did it feel?"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
      >
        Complete Exercise
      </button>
    </form>
  );
};

export default WorkoutForm;
