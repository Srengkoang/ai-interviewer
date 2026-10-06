
import { useState } from "react";
import { generateTechnicalQuestions } from "../../api/aiApi";

function InterviewSetup() {
    const [formData, setFormData] = useState({
        jobTitle: "",
        experienceLevel: "Mid",
        techStack: [],
        difficulty: "Medium",
        questionType: "Mixed",
        questionCount: 3,
    });

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await generateTechnicalQuestions(formData);
            setQuestions(result.data.questions);
        } catch (err) {
            setError("Failed to generate questions. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* your existing form inputs here, updating formData via setFormData */}

            <button onClick={handleGenerate} disabled={loading}>
                {loading ? "Generating..." : "Generate Questions"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {questions.map((q) => (
                    <li key={q.id}>
                        <strong>[{q.type}]</strong> {q.question_text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default InterviewSetup;
