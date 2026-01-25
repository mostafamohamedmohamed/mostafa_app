
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Exercise } from '../types';

interface AICoachProps {
  history: Exercise[];
}

const AICoach: React.FC<AICoachProps> = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<any>(null);
  const [goal, setGoal] = useState('Next push day routine');

  const fetchSuggestion = async () => {
    setLoading(true);
    try {
      const result = await geminiService.suggestWorkout(history, goal);
      setSuggestion(result);
    } catch (error) {
      alert("Failed to get AI suggestion. Please check your API Key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      <header className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-blue-600/20 text-blue-500 mb-4 animate-pulse">
          <i className="fa-solid fa-robot text-3xl"></i>
        </div>
        <h2 className="text-2xl font-bold">FlexTrack AI Coach</h2>
        <p className="text-slate-400 text-sm mt-2 px-6">Personalized routines powered by Gemini based on your actual performance.</p>
      </header>

      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">What's the focus today?</label>
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="flex-1 bg-slate-800 border-none rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
          <button 
            onClick={fetchSuggestion}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 rounded-xl transition-all"
          >
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-bolt"></i>}
          </button>
        </div>

        {suggestion ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">{suggestion.routineName}</h3>
                <span className="text-xs text-blue-500 font-bold uppercase tracking-widest">{suggestion.focus}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {suggestion.exercises.map((ex: any, i: number) => (
                <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-bold text-slate-100">{ex.name}</h4>
                    <span className="text-blue-400 font-mono text-xs">{ex.sets} sets × {ex.reps}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed italic">{ex.coachingTip}</p>
                </div>
              ))}
            </div>

            <div className="bg-blue-600/10 border border-blue-600/20 p-4 rounded-xl">
              <p className="text-sm text-blue-200 text-center font-medium italic">
                "{suggestion.encouragement}"
              </p>
            </div>
          </div>
        ) : !loading && (
          <div className="grid grid-cols-1 gap-3">
             <button onClick={() => {setGoal('Suggest a high volume pull day'); fetchSuggestion()}} className="text-left p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300">"Suggest a high volume pull day"</button>
             <button onClick={() => {setGoal('Prepare me for a bench press PR'); fetchSuggestion()}} className="text-left p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300">"Prepare me for a bench press PR"</button>
             <button onClick={() => {setGoal('Quick 20-min core and legs'); fetchSuggestion()}} className="text-left p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300">"Quick 20-min core and legs"</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICoach;
