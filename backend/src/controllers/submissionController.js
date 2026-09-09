const { evaluateSubmission, isInfrastructureFailure } = require("../judge/judgeService");
const { generateCodeEvaluation } = require("../services/aiService");

const INFRASTRUCTURE_FAILURE_RESPONSE = {
    score: 0,
    correctness: "fail",
    time_complexity_estimate: "unknown",
    space_complexity_estimate: "unknown",
    strengths: [],
    weaknesses: [],
    edge_cases_missed: [],
    code_feedback:
        "Evaluation could not be completed due to a sandbox infrastructure failure, not a fault in the candidate's code. This submission should be re-run once the execution environment is available.",
};

const submitCode = async (req, res) => {
    try {
        const { candidateCode, testCases, programmingLanguage, experienceLevel, problemStatement } = req.body;

        const { executionResult, results } = await evaluateSubmission(candidateCode, testCases);

        // Backend-level safety net: if the sandbox itself failed (not the
        // candidate's code), skip calling the AI entirely and return the
        // fallback directly — no dependency on the model following the
        // prompt's infrastructure-failure instruction correctly.
        if (isInfrastructureFailure(results)) {
            console.warn("[submitCode] Detected infrastructure failure — skipping AI evaluation.");
            return res.json({ success: true, data: INFRASTRUCTURE_FAILURE_RESPONSE });
        }

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