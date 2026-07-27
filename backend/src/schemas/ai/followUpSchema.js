module.exports = {
    type: "object",
    properties: {
        follow_up_needed: { type: "boolean" },
        reason: { type: "string" },
        follow_up_question: { type: ["string", "null"] },
    },
    required: ["follow_up_needed", "reason", "follow_up_question"],
    additionalProperties: false,
};