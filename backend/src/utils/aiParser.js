/**
 * Parse JSON returned by the AI model.
 */
const parseAIResponse = (text) => {
    if (!text) {
        throw new Error("AI returned an empty response.");
    }

    const cleanText = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    try {
        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Invalid AI Response:");
        console.error(cleanText);

        throw new Error("AI returned invalid JSON.");
    }
};

module.exports = {
    parseAIResponse,
};