const codeEvaluationSchema = require("../src/schemas/ai/codeEvaluationSchema");
const finalReportSchema = require("../src/schemas/ai/finalReportSchema");
const { validateAIOutput } = require("../src/utils/validateAIOutput");

describe("AI-005 Code Evaluation schema", () => {
    it("accepts a valid, internally consistent pass result", () => {
        const good = {
            score: 90,
            correctness: "pass",
            time_complexity_estimate: "O(n)",
            space_complexity_estimate: "O(1)",
            strengths: ["Clear logic"],
            weaknesses: ["Could be more concise"],
            edge_cases_missed: [],
            code_feedback: "Solid solution.",
        };
        expect(() => validateAIOutput(good, codeEvaluationSchema, "AI-005")).not.toThrow();
    });

    it("rejects an invalid correctness value (the enum bug we hit after the model swap)", () => {
        const bad = {
            score: 70,
            correctness: "design", // not a valid correctness value — this belongs to AI-001's type enum, not here
            time_complexity_estimate: "O(n)",
            space_complexity_estimate: "O(1)",
            strengths: [],
            weaknesses: [],
            edge_cases_missed: [],
            code_feedback: "test",
        };
        expect(() => validateAIOutput(bad, codeEvaluationSchema, "AI-005")).toThrow();
    });

    it("allows empty strengths/weaknesses arrays (fixed after a genuine 0-test-passed case)", () => {
        const zeroScoreCase = {
            score: 0,
            correctness: "fail",
            time_complexity_estimate: "unknown",
            space_complexity_estimate: "unknown",
            strengths: [],
            weaknesses: [],
            edge_cases_missed: [],
            code_feedback: "All test cases failed.",
        };
        expect(() => validateAIOutput(zeroScoreCase, codeEvaluationSchema, "AI-005")).not.toThrow();
    });

    it("rejects a score outside 0-100", () => {
        const bad = {
            score: 105, // the exact real bug we saw from the model once
            correctness: "pass",
            time_complexity_estimate: "O(n)",
            space_complexity_estimate: "O(1)",
            strengths: ["ok"],
            weaknesses: [],
            edge_cases_missed: [],
            code_feedback: "test",
        };
        expect(() => validateAIOutput(bad, codeEvaluationSchema, "AI-005")).toThrow();
    });
});

describe("AI-007 Final Report schema", () => {
    it("accepts a valid recommendation value", () => {
        const good = {
            candidate_name: "Alex Chen",
            job_title: "Backend Developer",
            overall_score: 62,
            technical_evaluation: "test",
            communication_evaluation: "test",
            strengths: ["test"],
            weaknesses: ["test"],
            recommendation: "No Hire",
            recommendation_justification: "test",
            summary: "test",
        };
        expect(() => validateAIOutput(good, finalReportSchema, "AI-007")).not.toThrow();
    });

    it("rejects a recommendation value outside the 5 allowed strings", () => {
        const bad = {
            candidate_name: "Alex Chen",
            job_title: "Backend Developer",
            overall_score: 62,
            technical_evaluation: "test",
            communication_evaluation: "test",
            strengths: ["test"],
            weaknesses: ["test"],
            recommendation: "Maybe Hire", // invalid — not one of the 5 allowed values
            recommendation_justification: "test",
            summary: "test",
        };
        expect(() => validateAIOutput(bad, finalReportSchema, "AI-007")).toThrow();
    });
});

/**
 * This function encodes the score/recommendation consistency rule we added
 * to AI-007's prompt after debugging. It's duplicated here (not imported
 * from the prompt) so the test independently verifies the RULE itself,
 * not just that the prompt happens to mention it.
 */
function expectedRecommendation(score) {
    if (score >= 90) return "Strong Hire";
    if (score >= 75) return "Hire";
    if (score >= 65) return "Lean Hire";
    if (score >= 50) return "No Hire";
    return "Strong No Hire";
}

describe("AI-007 score/recommendation consistency rule", () => {
    it.each([
        [95, "Strong Hire"],
        [80, "Hire"],
        [68, "Lean Hire"],
        [55, "No Hire"],
        [30, "Strong No Hire"],
    ])("score %i maps to %s", (score, expected) => {
        expect(expectedRecommendation(score)).toBe(expected);
    });
});