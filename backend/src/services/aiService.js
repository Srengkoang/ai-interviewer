const { generateAIResponse } = require("../config/groq");
const { validateAIOutput } = require("../utils/validateAIOutput");

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
const runPrompt = async (promptBuilder, data, schema, featureName, options = {}) => {
    const { maxRetries = 1 } = options;
    const prompt = promptBuilder(data);

    let lastError;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const result = await generateAIResponse(prompt);
            return validateAIOutput(result, schema, featureName);
        } catch (err) {
            lastError = err;
            console.warn(`[runPrompt:${featureName}] Attempt ${attempt + 1} failed: ${err.message}`);
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
};