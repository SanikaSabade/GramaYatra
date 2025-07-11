// app/api/process-audio/route.js
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const audioFile = formData.get('audio');

        if (!audioFile) {
            return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
        }

        // Convert file to buffer
        const audioBuffer = await audioFile.arrayBuffer();
        const audioData = Buffer.from(audioBuffer);

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
                            mimeType: audioFile.type,
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

        return NextResponse.json({ result });
    } catch (error) {
        console.error('Audio processing error:', error);
        return NextResponse.json({ error: error.message || "Audio processing failed" }, { status: 500 });
    }
}

// Handle unsupported methods
export async function GET() {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}