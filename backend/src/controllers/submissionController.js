const { evaluateSubmission } = require("../judge/judgeService");
const { generateCodeEvaluation } = require("../services/aiService");

const submitCode = async (req, res) => {
    try {
        const { candidateCode, testCases, programmingLanguage, experienceLevel, problemStatement } = req.body;

        // Step 1: run it for real
        const { executionResult } = await evaluateSubmission(candidateCode, testCases);

        // Step 2: feed the REAL executionResult into your already-working AI-005
        const evaluation = await generateCodeEvaluation({
            programmingLanguage,
            experienceLevel,
            problemStatement,
            candidateCode,
            executionResult,
            testCasesTested: testCases.map((tc) => tc.input),
        });

        res.json({ success: true, data: evaluation });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = { submitCode };