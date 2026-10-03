module.exports = {
    type: "object",
    properties: {
        score: { type: "integer", minimum: 0, maximum: 100 },
        correctness: { type: "string", enum: ["pass", "partial", "fail"] },
        time_complexity_estimate: { type: "string" },
        space_complexity_estimate: { type: "string" },
        strengths: { type: "array", items: { type: "string" } },      // minItems removed
        weaknesses: { type: "array", items: { type: "string" } },     // minItems removed
        edge_cases_missed: { type: "array", items: { type: "string" } },
        code_feedback: { type: "string" },
    },
    required: [
        "score", "correctness", "time_complexity_estimate", "space_complexity_estimate",
        "strengths", "weaknesses", "edge_cases_missed", "code_feedback",
    ],
    additionalProperties: false,
};