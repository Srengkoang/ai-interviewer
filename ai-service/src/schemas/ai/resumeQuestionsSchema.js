module.exports = {
    type: "object",
    properties: {
        questions: {
            type: "array",
            minItems: 1,
            items: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    based_on: { type: "string" },
                    topic: { type: "string" },
                    question_text: { type: "string" },
                    skills_tested: { type: "array", items: { type: "string" } },
                    estimated_time: { type: "string" },
                },
                required: ["id", "based_on", "topic", "question_text", "skills_tested", "estimated_time"],
                additionalProperties: false,
            },
        },
    },
    required: ["questions"],
    additionalProperties: false,
};