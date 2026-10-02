const technicalQuestionsSchema = require("../src/schemas/ai/technicalQuestionsSchema");
const resumeQuestionsSchema = require("../src/schemas/ai/resumeQuestionsSchema");
const jobDescriptionQuestionsSchema = require("../src/schemas/ai/jobDescriptionQuestionsSchema");
const followUpSchema = require("../src/schemas/ai/followUpSchema");
const feedbackSchema = require("../src/schemas/ai/feedbackSchema");
const { validateAIOutput } = require("../src/utils/validateAIOutput");

describe("AI-001 Technical Questions schema", () => {
    it("accepts the 'design' question type (added after the model migration)", () => {
        const good = {
            questions: [
                {
                    id: "q1",
                    type: "design",
                    topic: "Schema design",
                    difficulty: "medium",
                    skills: ["PostgreSQL"],
                    estimated_time: "10-15 minutes",
                    question_text: "Design a schema for...",
                },
            ],
        };
        expect(() => validateAIOutput(good, technicalQuestionsSchema, "AI-001")).not.toThrow();
    });

    it("rejects an invalid question type", () => {
        const bad = {
            questions: [
                {
                    id: "q1",
                    type: "conceptual", // not one of theoretical | coding | design
                    topic: "test",
                    difficulty: "medium",
                    skills: ["test"],
                    estimated_time: "10-15 minutes",
                    question_text: "test",
                },
            ],
        };
        expect(() => validateAIOutput(bad, technicalQuestionsSchema, "AI-001")).toThrow();
    });
});

describe("AI-003 Job Description Questions schema", () => {
    it("accepts the 'design' question type here too (same enum as AI-001)", () => {
        const good = {
            questions: [
                {
                    id: "q1",
                    maps_to_requirement: "Database optimization",
                    type: "design",
                    topic: "Query performance",
                    skills_tested: ["PostgreSQL"],
                    estimated_time: "10-15 minutes",
                    question_text: "Propose an index for...",
                },
            ],
        };
        expect(() => validateAIOutput(good, jobDescriptionQuestionsSchema, "AI-003")).not.toThrow();
    });

    it("requires maps_to_requirement to be present", () => {
        const bad = {
            questions: [
                {
                    id: "q1",
                    // maps_to_requirement missing
                    type: "theoretical",
                    topic: "test",
                    skills_tested: ["test"],
                    estimated_time: "10-15 minutes",
                    question_text: "test",
                },
            ],
        };
        expect(() => validateAIOutput(bad, jobDescriptionQuestionsSchema, "AI-003")).toThrow();
    });
});

describe("AI-002 Resume Questions schema", () => {
    it("accepts a valid question grounded in resume content", () => {
        const good = {
            questions: [
                {
                    id: "q1",
                    based_on: "Built a chat app using Socket.IO and Redis",
                    topic: "Real-time systems",
                    question_text: "Describe your architecture...",
                    skills_tested: ["Socket.IO", "Redis"],
                    estimated_time: "10-15 minutes",
                },
            ],
        };
        expect(() => validateAIOutput(good, resumeQuestionsSchema, "AI-002")).not.toThrow();
    });

    it("rejects a question missing based_on (traceability to the resume)", () => {
        const bad = {
            questions: [
                {
                    id: "q1",
                    // based_on missing — this was the key field preventing hallucinated experience
                    topic: "test",
                    question_text: "test",
                    skills_tested: ["test"],
                    estimated_time: "10-15 minutes",
                },
            ],
        };
        expect(() => validateAIOutput(bad, resumeQuestionsSchema, "AI-002")).toThrow();
    });
});

describe("AI-004 Follow-up Question schema", () => {
    it("accepts follow_up_needed: false with follow_up_question: null", () => {
        const good = {
            follow_up_needed: false,
            reason: "Answer was complete.",
            follow_up_question: null,
        };
        expect(() => validateAIOutput(good, followUpSchema, "AI-004")).not.toThrow();
    });

    it("accepts follow_up_needed: true with a real question string", () => {
        const good = {
            follow_up_needed: true,
            reason: "Answer was vague.",
            follow_up_question: "Can you elaborate on...?",
        };
        expect(() => validateAIOutput(good, followUpSchema, "AI-004")).not.toThrow();
    });

    it("rejects a response missing the reason field", () => {
        const bad = {
            follow_up_needed: false,
            follow_up_question: null,
            // reason missing
        };
        expect(() => validateAIOutput(bad, followUpSchema, "AI-004")).toThrow();
    });
});

describe("AI-006 Answer Feedback schema", () => {
    it("accepts a score within the 0-10 range (distinct from AI-005's 0-100 scale)", () => {
        const good = {
            score: 7,
            strengths: ["Clear explanation"],
            weaknesses: ["Missed one detail"],
            feedback: "Good answer overall.",
            missed_key_points: [],
        };
        expect(() => validateAIOutput(good, feedbackSchema, "AI-006")).not.toThrow();
    });

    it("rejects a score outside 0-10 (e.g. a 0-100 scale value mistakenly used here)", () => {
        const bad = {
            score: 78, // valid for AI-005, invalid for AI-006 — easy mistake to catch
            strengths: ["test"],
            weaknesses: ["test"],
            feedback: "test",
            missed_key_points: [],
        };
        expect(() => validateAIOutput(bad, feedbackSchema, "AI-006")).toThrow();
    });
});