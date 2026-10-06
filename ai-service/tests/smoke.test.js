const { generateFollowUpQuestions } = require("../src/services/aiService");

// This test hits the real Groq API — run sparingly to avoid rate limits.
// Not part of the regular fast test suite; run manually with:
// npx jest tests/smoke.test.js
const describeLive = process.env.RUN_LIVE_SMOKE === "1" ? describe : describe.skip;

describeLive("Live smoke test", () => {
    it("AI-004 follow-up call succeeds against the real API", async () => {
        const result = await generateFollowUpQuestions({
            jobTitle: "Backend Developer",
            experienceLevel: "Mid",
            conversationHistory: "Q1: Tell me about your backend experience.\nA1: I've worked with Node.js.",
            originalQuestion: "What is the difference between PUT and PATCH?",
            candidateAnswer: "PUT replaces the whole resource, PATCH updates part of it, and both are idempotent depending on implementation.",
        });

        expect(result).toHaveProperty("follow_up_needed");
        expect(typeof result.follow_up_needed).toBe("boolean");
    }, 30000); // 30s timeout since this hits a real API
});