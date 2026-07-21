const {
    generateInterviewQuestions,
} = require("../services/aiService");

const generateQuestions = async (req, res) => {
    try {
        const result = await generateInterviewQuestions(req.body);

        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    generateQuestions,
};