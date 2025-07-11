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

////////////////////////////////////////////////////////////////////////////
import "dotenv/config";
import multer from "multer";
import fs from "fs";
import { GoogleGenAI } from '@google/genai';


// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Accept audio files
        if (file.mimetype.startsWith('audio/')) {
            cb(null, true);
        } else {
            cb(new Error('Only audio files are allowed'), false);
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// Existing text chat endpoint
router.post("/chat", async (req, res) => {
    try {
        const { systemPrompt, context, prompt } = req.body;
        
        const fullPrompt = `${systemPrompt || ""}\n${context || ""}\n${prompt || ""}`;
        
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });
        
        const config = {
            responseMimeType: 'application/json',
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
        console.error(error);
        res.status(500).json({ error: error.message || "AI generation failed" });
    }
});

// New audio processing endpoint
router.post("/process-audio", upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No audio file provided" });
        }

        const audioFile = req.file;
        const audioPath = audioFile.path;

        // Read the audio file
        const audioData = fs.readFileSync(audioPath);
        
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });

        const systemPrompt = `You are an AI assistant that processes audio content and extracts structured information for a tourism platform. 

Your task is to:
1. Transcribe the audio content in any language
2. Extract key information about a tourism experience/activity
3. Format the response as a JSON object with the following structure:

{
  "title": "Brief descriptive title of the experience",
  "description": "Detailed description of the experience/activity",
  "village": "Name of village/location",
  "state": "State/region name",
  "images": ["placeholder image URLs - generate 2-3 relevant placeholder URLs"],
  "price": "estimated price in INR (number)",
  "duration": "estimated duration (e.g., '3 hours', '1 day')",
  "isPublic": true
}

Rules:
- If specific information is not mentioned, make reasonable assumptions based on context
- For missing village/state, use popular tourism destinations in India
- For price, estimate based on similar activities in India
- For images, create placeholder URLs like "https://example.com/images/activity1.jpg"
- Always respond with valid JSON only
- If the audio doesn't contain tourism-related content, create a generic tourism experience

The user will provide audio in their native language. Extract and structure the information accordingly.`;

        const model = 'gemini-2.5-flash-lite-preview-06-17';
        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: systemPrompt
                    },
                    {
                        inlineData: {
                            mimeType: audioFile.mimetype,
                            data: audioData.toString('base64')
                        }
                    }
                ],
            },
        ];

        const config = {
            responseMimeType: 'application/json',
        };

        const response = await ai.models.generateContent({
            model,
            config,
            contents,
        });

        // Clean up the uploaded file
        fs.unlinkSync(audioPath);

        // Parse the JSON response
        let result;
        try {
            result = JSON.parse(response.text);
        } catch (parseError) {
            console.error('JSON parsing error:', parseError);
            // Fallback response if JSON parsing fails
            result = {
                title: "Tourism Experience",
                description: "A wonderful tourism experience extracted from audio",
                village: "Munnar",
                state: "Kerala",
                images: [
                    "https://example.com/images/experience1.jpg",
                    "https://example.com/images/experience2.jpg"
                ],
                price: 1500,
                duration: "3 hours",
                isPublic: true
            };
        }

        res.json({ result });
    } catch (error) {
        console.error('Audio processing error:', error);
        
        // Clean up file if it exists
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        res.status(500).json({ error: error.message || "Audio processing failed" });
    }
});

export default router;




