const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { randomUUID } = require("crypto");
const { LANGUAGE_CONFIG, resolveLanguage } = require("./languageConfig");

const EXECUTION_TIMEOUT_MS = 10000; // raised from 5000 — accounts for cold starts and slower interpreters like Python
const MEMORY_LIMIT = "128m";
const CPU_LIMIT = "0.5";

/**
 * Runs candidate code inside an isolated Docker container.
 * Language is resolved via languageConfig.js — the image, filename,
 * and run command all come from that single source of truth.
 *
 * @param {string} code - the candidate's raw code
 * @param {string} input - stdin to feed the program (if any)
 * @param {string} programmingLanguage - e.g. "JavaScript", "Python"
 * @returns {Promise<{stdout: string, stderr: string, timedOut: boolean, exitCode: number|null}>}
 */
const runInSandbox = (code, input = "", programmingLanguage = "javascript") => {
    return new Promise((resolve, reject) => {
        const languageKey = resolveLanguage(programmingLanguage);

        if (!languageKey) {
            return reject(
                new Error(`Unsupported programming language: "${programmingLanguage}"`)
            );
        }

        const config = LANGUAGE_CONFIG[languageKey];
        const runId = randomUUID();
        const tempDir = path.join(os.tmpdir(), `sandbox-${runId}`);
        fs.mkdirSync(tempDir);

        const codeFilePath = path.join(tempDir, config.filename);
        fs.writeFileSync(codeFilePath, code);

        const inputFilePath = path.join(tempDir, "input.txt");
        fs.writeFileSync(inputFilePath, input);

        const containerFilePath = `/sandbox/${config.filename}`;
        const runCmd = config.runCommand(containerFilePath);

        const dockerCommand = [
            "docker run --rm",
            `--network none`,
            `--memory=${MEMORY_LIMIT}`,
            `--cpus=${CPU_LIMIT}`,
            `-v "${tempDir}:/sandbox:ro"`,
            config.image,
            `sh -c "${runCmd} < /sandbox/input.txt"`,
        ].join(" ");

        exec(
            dockerCommand,
            { timeout: EXECUTION_TIMEOUT_MS },
            (error, stdout, stderr) => {
                fs.rmSync(tempDir, { recursive: true, force: true });

                const timedOut = error && error.killed;

                resolve({
                    stdout: stdout || "",
                    stderr: stderr || "",
                    timedOut: !!timedOut,
                    exitCode: error ? error.code : 0,
                });
            }
        );
    });
};

module.exports = { runInSandbox };