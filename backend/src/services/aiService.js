const { generateText } = require("../config/groq");
const {
    buildTechnicalInterviewPrompt,
} = require("../prompts/technicalInterviewPrompt");

const generateInterviewQuestions = async (data) => {
    const prompt = buildTechnicalInterviewPrompt(data);

    return generateText(prompt);
};

module.exports = {
    generateInterviewQuestions,
};