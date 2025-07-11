import express from "express";
import "dotenv/config"; // Make sure to install: npm install dotenv

const router = express.Router();

// Import the correct class from the SDK
import {
    GoogleGenAI,
} from '@google/genai';



// POST /chat
router.post("/chat", async (req, res) => {
    try {
        const { systemPrompt, context, prompt } = req.body;

        // For API key authentication, system prompts and context are part of the main prompt
        const fullPrompt = `${systemPrompt || ""}\n${context || ""}\n${prompt || ""}`;



        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });
        const config = {
            responseMimeType: 'text/plain',
        };
  const model = 'gemini-2.5-flash-lite-preview-06-17';
        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: fullPrompt,
                    },
                ],
            },
        ];

        const response = await ai.models.generateContent({
            model,
            config,
            contents,
        });

        res.json({ result: response.text });
    } catch (error) {
        console.error(error); // It's helpful to log the actual error on the server
        res.status(500).json({ error: error.message || "AI generation failed" });
    }
});

export default router;




