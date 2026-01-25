
import { GoogleGenAI, Type } from "@google/genai";

// Initialize with named parameter and direct process.env.API_KEY access
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  getChatResponse: async (message: string, history: {role: string, parts: {text: string}[]}[]) => {
    try {
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
      // response.text is a property, not a method
      return response.text || "I'm sorry, I couldn't process that.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Network error. Please try again later.";
    }
  },

  // Implemented suggestWorkout for AICoach component with JSON response configuration
  suggestWorkout: async (history: any[], goal: string) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview', // Use Pro model for complex routine planning
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
    } catch (error) {
      console.error("Gemini Suggestion Error:", error);
      throw error;
    }
  }
};
