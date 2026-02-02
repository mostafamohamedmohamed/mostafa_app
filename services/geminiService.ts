
import { GoogleGenAI, Type } from "@google/genai";

export const geminiService = {
  /**
   * Helper to handle API calls with error tracking for key selection
   */
  async _callApi(fn: (ai: GoogleGenAI) => Promise<any>) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      return await fn(ai);
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      
      // If the key is invalid or not found (common with injected keys or missing billing)
      if (error?.message?.includes("Requested entity was not found") || error?.status === 404) {
        if (typeof window !== 'undefined' && (window as any).aistudio?.openSelectKey) {
          alert("Your AI Project key needs re-selection or billing setup. Opening setup dialog...");
          await (window as any).aistudio.openSelectKey();
        }
      }
      throw error;
    }
  },

  getChatResponse: async (message: string, history: {role: string, parts: {text: string}[]}[]) => {
    return geminiService._callApi(async (ai) => {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
            ...history,
            { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: "You are Meta AI integrated into WhatsApp. Be helpful, concise, and friendly. Use emojis occasionally. You are talking to a mobile user."
        }
      });
      return response.text || "I'm sorry, I couldn't process that.";
    }).catch(() => "Network error. Please ensure your AI Project Key is selected in Settings.");
  },

  suggestWorkout: async (history: any[], goal: string) => {
    return geminiService._callApi(async (ai) => {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
          {
            role: 'user',
            parts: [{ text: `User Goal: ${goal}. Workout History: ${JSON.stringify(history)}. Please suggest a specific routine.` }]
          }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              routineName: { type: Type.STRING },
              focus: { type: Type.STRING },
              exercises: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    sets: { type: Type.NUMBER },
                    reps: { type: Type.NUMBER },
                    coachingTip: { type: Type.STRING }
                  },
                  required: ["name", "sets", "reps", "coachingTip"]
                }
              },
              encouragement: { type: Type.STRING }
            },
            required: ["routineName", "focus", "exercises", "encouragement"]
          }
        }
      });
      
      const jsonStr = response.text?.trim();
      if (!jsonStr) throw new Error("Empty response from AI");
      return JSON.parse(jsonStr);
    });
  }
};
