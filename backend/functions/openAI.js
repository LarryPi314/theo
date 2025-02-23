import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../secrets/.env') });

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

// Add the askOpenAI function
export async function askOpenAI(prompt) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant. When asked for structured JSON output, make sure it is parsable by JSON.parse(). Only return the parsable JSON component (do not include anything else in your response." },
                { role: "user", content: prompt }
            ],
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        throw error;
    }
}