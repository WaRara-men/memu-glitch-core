import axios from 'axios';

// Using the key from the context/file
const API_KEY = "mu_lSRQjfTDMfVKwNoZrUbHRJ1NEACUZDnjQZ3m6MlbrJahVsIBwdxrAjZ_G8MNmBfIBEAW3Lm5lATaVpkG4G_50QFPlGi5f81etu8jtw";
// In production (Vercel), use the proxy path "/api/v3/memory" which is rewritten by vercel.json
// But wait, axios might need full URL if not on same domain?
// Vercel rewrites work on same domain.
const BASE_URL = "/api/v3/memory";

// Types
export interface MemoryItem {
  memory_type: string;
  content: string;
}

export interface RetrieveResponse {
  rewritten_query: string;
  items: MemoryItem[];
}

// API Service
export const memuApi = {
  retrieve: async (query: string): Promise<RetrieveResponse> => {
    try {
      const response = await axios.post(
        `${BASE_URL}/retrieve`,
        {
          user_id: "demo_user_001", // Consistent ID
          agent_id: "hackathon_agent_001",
          query: query
        },
        {
          headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("MemU API Error (Retrieve):", error);
      // Return empty structure on error to prevent crash
      return { rewritten_query: query, items: [] };
    }
  },

  memorize: async (userContent: string, aiContent: string = "Acknowledged"): Promise<any> => {
    try {
      const response = await axios.post(
        `${BASE_URL}/memorize`,
        {
          user_id: "demo_user_001",
          agent_id: "hackathon_agent_001",
          messages: [ // CHANGED from 'conversation' to 'messages' to match API if needed, or keeping conversation
            { role: "user", content: userContent },
            { role: "assistant", content: aiContent }
          ]
        },
        {
          headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("MemU Memorize Error:", error);
      throw error;
    }
  }
};
