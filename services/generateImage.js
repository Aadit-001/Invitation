// services/aiService.js
import axios from "axios";

// Replace with your actual API endpoint
const API_URL = "https://your-api-endpoint.com/generate-image";

const generateImageWithAI = async (prompt) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        prompt,
        model: "dall-e-3", // or whatever model you're using
        size: "1024x1024",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${YOUR_API_KEY}`, // Store securely
        },
      }
    );

    return {
      imageUrl: response.data.url,
      promptId: response.data.id,
    };
  } catch (error) {
    console.error("API error:", error);
    throw new Error("Failed to generate image with AI");
  }
};

export default generateImageWithAI;
