module.exports = {
    type: "object",
    properties: {
        candidate_name: { type: "string" },
        job_title: { type: "string" },
        overall_score: { type: "integer", minimum: 0, maximum: 100 },
        technical_evaluation: { type: "string" },
        communication_evaluation: { type: "string" },
        strengths: { type: "array", items: { type: "string" } },
        weaknesses: { type: "array", items: { type: "string" } },
        recommendation: {
            type: "string",
            enum: ["Strong Hire", "Hire", "Lean Hire", "No Hire", "Strong No Hire"],
        },
        recommendation_justification: { type: "string" },
        summary: { type: "string" },
    },
    required: [
        "candidate_name", "job_title", "overall_score", "technical_evaluation",
        "communication_evaluation", "strengths", "weaknesses", "recommendation",
        "recommendation_justification", "summary",
    ],
    additionalProperties: false,
};