import { GoogleGenAI, Type } from "@google/genai";
import { MathQuestion, Difficulty } from "../types";

export const generateMathQuestions = async (difficulty: Difficulty): Promise<MathQuestion[]> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API Key is missing");
      // Return fallback data if API key is missing (for demo purposes if env not set)
      return getFallbackQuestions(difficulty);
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Generate 3 unique math questions for a ${difficulty} level student. 
    Provide 4 multiple choice options for each.
    Include a short explanation for the correct answer.
    Return strictly JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY,
                items: { type: Type.NUMBER }
              },
              answer: { type: Type.NUMBER },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "answer", "explanation"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as MathQuestion[];
    }
    return getFallbackQuestions(difficulty);

  } catch (error) {
    console.error("Failed to generate questions:", error);
    return getFallbackQuestions(difficulty);
  }
};

const getFallbackQuestions = (difficulty: Difficulty): MathQuestion[] => {
  // Simple fallback generation to ensure app doesn't crash without API key
  const base = difficulty === Difficulty.EASY ? 10 : difficulty === Difficulty.MEDIUM ? 50 : 100;
  
  const q1a = Math.floor(Math.random() * base) + 1;
  const q1b = Math.floor(Math.random() * base) + 1;
  
  return [
    {
      question: `What is ${q1a} + ${q1b}?`,
      options: [q1a + q1b, q1a + q1b + 1, q1a + q1b - 1, q1a + q1b + 2].sort(() => 0.5 - Math.random()),
      answer: q1a + q1b,
      explanation: "Basic addition."
    },
    {
      question: `What is ${q1a * 2} divided by 2?`,
      options: [q1a, q1a * 2, q1a + 2, q1a - 2].sort(() => 0.5 - Math.random()),
      answer: q1a,
      explanation: "Division is the inverse of multiplication."
    }
  ];
};