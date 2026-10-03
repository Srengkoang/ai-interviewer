const { evaluateSubmission, isInfrastructureFailure } = require("../judge/judgeService");
const { generateCodeEvaluation } = require("../services/aiService");
const { sandboxQueue } = require("../judge/executionQueue");

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

        console.log("[submitCode] Queue status before submit:", sandboxQueue.getStatus());

        // Wrap the actual sandbox execution in the queue — this is the
        // only change: everything inside the function is identical to
        // before, it just waits for a free slot before running.
        const { executionResult, results } = await sandboxQueue.run(() =>
            evaluateSubmission(candidateCode, testCases, programmingLanguage)
        );

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