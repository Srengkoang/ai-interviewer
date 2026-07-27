module.exports = {
    type: "object",
    properties: {
        score: { type: "integer", minimum: 0, maximum: 10 },
        strengths: { type: "array", items: { type: "string" }, minItems: 1 },
        weaknesses: { type: "array", items: { type: "string" }, minItems: 1 },
        feedback: { type: "string" },
        missed_key_points: { type: "array", items: { type: "string" } },
    },
    required: ["score", "strengths", "weaknesses", "feedback", "missed_key_points"],
    additionalProperties: false,
};