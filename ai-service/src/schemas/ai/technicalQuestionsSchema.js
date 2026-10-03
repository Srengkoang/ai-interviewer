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
                    type: { type: "string", enum: ["theoretical", "coding", "design"] },
                    topic: { type: "string" },
                    difficulty: { type: "string", enum: ["easy", "medium", "hard"] },
                    skills: { type: "array", items: { type: "string" } },
                    estimated_time: { type: "string" },
                    question_text: { type: "string" },
                },
                required: ["id", "type", "topic", "difficulty", "skills", "estimated_time", "question_text"],
                additionalProperties: false,
            },
        },
    },
    required: ["questions"],
    additionalProperties: false,
};