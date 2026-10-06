const { generateAIResponse } = require("../config/groq");
const { validateAIOutput } = require("../utils/validateAIOutput");
const { aiQueue } = require("../judge/executionQueue");

const { buildTechnicalInterviewPrompt } = require("../prompts/ai/technicalInterviewPrompt");
const { buildResumePrompt } = require("../prompts/ai/resumePrompt");
const { buildJobDescriptionPrompt } = require("../prompts/ai/jobDescriptionPrompt");
const { buildFollowUpPrompt } = require("../prompts/ai/followUpPrompt");
const { buildFeedbackPrompt } = require("../prompts/ai/feedbackPrompt");
const { buildFinalReportPrompt } = require("../prompts/ai/finalReportPrompt");
const { buildCodeEvaluationPrompt } = require("../prompts/ai/codeEvaluationPrompt");

const codeEvaluationSchema = require("../schemas/ai/codeEvaluationSchema");
const technicalQuestionsSchema = require("../schemas/ai/technicalQuestionsSchema");
const resumeQuestionsSchema = require("../schemas/ai/resumeQuestionsSchema");
const jobDescriptionQuestionsSchema = require("../schemas/ai/jobDescriptionQuestionsSchema");
const followUpSchema = require("../schemas/ai/followUpSchema");
const feedbackSchema = require("../schemas/ai/feedbackSchema");
const finalReportSchema = require("../schemas/ai/finalReportSchema");

/**
 * Shared runner: builds a prompt, sends it to the AI provider,
 * and validates the parsed JSON against the feature's schema.
 * Retries on either a JSON-parse failure (thrown inside
 * generateAIResponse) or a schema validation failure.
 */

const MIN_GAP_BETWEEN_AI_CALLS_MS = 8000; // spaces calls out to stay under Groq's TPM limit
let lastAiCallTimestamp = 0;

const expectedRecommendation = (score) => {
    if (score >= 90) return "Strong Hire";
    if (score >= 75) return "Hire";
    if (score >= 65) return "Lean Hire";
    if (score >= 50) return "No Hire";
    return "Strong No Hire";
};

const validateFinalReportConsistency = (report) => {
    const expected = expectedRecommendation(report.overall_score);
    if (report.recommendation !== expected) {
        throw new Error(
            `AI-007 recommendation "${report.recommendation}" does not match score ${report.overall_score}; expected "${expected}"`,
        );
    }
    return report;
};

const runPrompt = async (promptBuilder, data, schema, featureName, options = {}) => {
    const { maxRetries = 2 } = options;
    const prompt = promptBuilder(data);

    let lastError;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const result = await aiQueue.run(async () => {
                // Enforce a minimum gap since the last AI call started,
                // on top of the concurrency limit — this is what actually
                // keeps token usage spread out over time, not just avoiding
                // simultaneous requests.
                const now = Date.now();
                const elapsed = now - lastAiCallTimestamp;
                if (elapsed < MIN_GAP_BETWEEN_AI_CALLS_MS) {
                    await new Promise((r) => setTimeout(r, MIN_GAP_BETWEEN_AI_CALLS_MS - elapsed));
                }
                lastAiCallTimestamp = Date.now();

                return generateAIResponse(prompt);
            });

            const validated = validateAIOutput(result, schema, featureName);
            return featureName === "AI-007 Final Report"
                ? validateFinalReportConsistency(validated)
                : validated;
        } catch (err) {
            lastError = err;
            console.warn(`[runPrompt:${featureName}] Attempt ${attempt + 1} failed: ${err.message}`);

            const waitMatch = err.message.match(/try again in ([\d.]+)s/);
            if (waitMatch) {
                const waitMs = Math.ceil(parseFloat(waitMatch[1]) * 1000) + 500;
                console.warn(`[runPrompt:${featureName}] Rate limited — waiting ${waitMs}ms before retry`);
                await new Promise((resolve) => setTimeout(resolve, waitMs));
            }
        }
    }

    throw new Error(`${featureName} failed after ${maxRetries + 1} attempt(s): ${lastError.message}`);
};

const generateInterviewQuestions = (data) =>
    runPrompt(buildTechnicalInterviewPrompt, data, technicalQuestionsSchema, "AI-001 Technical Questions");

const generateResumeQuestions = (data) =>
    runPrompt(buildResumePrompt, data, resumeQuestionsSchema, "AI-002 Resume Questions");

const generateJobDescriptionQuestions = (data) =>
    runPrompt(buildJobDescriptionPrompt, data, jobDescriptionQuestionsSchema, "AI-003 Job Description Questions");

const generateFollowUpQuestions = (data) =>
    runPrompt(buildFollowUpPrompt, data, followUpSchema, "AI-004 Follow-up Question");

const generateCodeEvaluation = (data) =>
    runPrompt(buildCodeEvaluationPrompt, data, codeEvaluationSchema, "AI-005 Code Evaluation");

const generateFeedback = (data) =>
    runPrompt(buildFeedbackPrompt, data, feedbackSchema, "AI-006 Answer Feedback");

const generateFinalReport = (data) =>
    runPrompt(buildFinalReportPrompt, data, finalReportSchema, "AI-007 Final Report");

module.exports = {
    generateInterviewQuestions,
    generateResumeQuestions,
    generateJobDescriptionQuestions,
    generateFollowUpQuestions,
    generateCodeEvaluation,
    generateFeedback,
    generateFinalReport,
    expectedRecommendation,
    validateFinalReportConsistency,
};