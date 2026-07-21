require("dotenv").config();

const Groq = require("groq-sdk");

const apiKey = process.env.GROQ_API_KEY || process.env.GROP_API_KEY;
let groq;

const getGroqClient = () => {
    if (!apiKey) {
        throw new Error("Missing GROQ_API_KEY environment variable.");
    }

    if (!groq) {
        groq = new Groq({ apiKey });
    }

    return groq;
};

const generateText = async (prompt) => {
    try {
        const response = await getGroqClient().chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile",
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Groq API Error:", error);
        throw error;
    }
};

module.exports = {
    generateText,
};
