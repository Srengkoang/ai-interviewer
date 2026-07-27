const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

/**
 * Validates an AI response object against a given JSON schema.
 * Throws a descriptive error if validation fails, so `runPrompt`
 * can catch it and retry — same pattern as the JSON-parse retry.
 */
const validateAIOutput = (data, schema, featureName = "AI response") => {
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
        const messages = validate.errors
            .map((err) => `${err.instancePath || "(root)"} ${err.message}`)
            .join("; ");
        throw new Error(`${featureName} failed schema validation: ${messages}`);
    }

    return data;
};

module.exports = { validateAIOutput };