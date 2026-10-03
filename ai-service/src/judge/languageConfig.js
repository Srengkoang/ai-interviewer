/**
 * Central registry of supported languages for the code execution sandbox.
 * Adding a new language means adding one entry here — nothing else in
 * dockerRunner.js or judgeService.js needs to change.
 */
const LANGUAGE_CONFIG = {
    javascript: {
        image: "node:20-alpine",
        filename: "solution.js",
        runCommand: (filePath) => `node ${filePath}`,
    },
    python: {
        image: "python:3.12-alpine",
        filename: "solution.py",
        runCommand: (filePath) => `python3 ${filePath}`,
    },
};

/**
 * Normalizes user-facing language names (e.g. "JavaScript", "Python 3")
 * to the internal config keys above.
 */
const resolveLanguage = (programmingLanguage) => {
    const normalized = (programmingLanguage || "").trim().toLowerCase();

    if (normalized.startsWith("javascript") || normalized === "js" || normalized === "node") {
        return "javascript";
    }
    if (normalized.startsWith("python") || normalized === "py") {
        return "python";
    }

    return null; // unsupported language
};

module.exports = { LANGUAGE_CONFIG, resolveLanguage };