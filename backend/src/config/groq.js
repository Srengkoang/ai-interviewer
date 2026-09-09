require("dotenv").config();

const Groq = require("groq-sdk");
const { parseAIResponse } = require("../utils/aiParser");

let groq = null;

/**
 * Create or return the Groq client
 */
const getGroqClient = () => {
    if (!process.env.GROQ_API_KEY) {
        throw new Error("Missing GROQ_API_KEY environment variable.");
    }

    if (!groq) {
        groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });
    }

    return groq;
};

/**
 * Send a prompt to Groq and return parsed JSON.
 *
 * @param {string} prompt
 * @returns {Promise<Object>}
 */
const generateAIResponse = async (prompt) => {
    try {
        const response = await getGroqClient().chat.completions.create({
            model: "openai/gpt-oss-120b",
            temperature: 0.3,
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const text = response.choices[0].message.content;

        return parseAIResponse(text);
    } catch (error) {
        console.error("Groq API Error:", error.message);

        throw new Error(error.message);
    }
};

module.exports = {
    generateAIResponse,
};