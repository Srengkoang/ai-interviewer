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
                    maps_to_requirement: { type: "string" },
                    type: { type: "string", enum: ["theoretical", "coding", "design"] },
                    topic: { type: "string" },
                    skills_tested: { type: "array", items: { type: "string" } },
                    estimated_time: { type: "string" },
                    question_text: { type: "string" },
                },
                required: ["id", "maps_to_requirement", "type", "topic", "skills_tested", "estimated_time", "question_text"],
                additionalProperties: false,
            },
        },
    },
    required: ["questions"],
    additionalProperties: false,
};