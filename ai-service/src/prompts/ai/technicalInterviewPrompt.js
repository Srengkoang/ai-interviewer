const buildTechnicalInterviewPrompt = ({
    jobTitle,
    experienceLevel,
    techStack,
    difficulty,
    questionType,
    questionCount,
}) => {
    return `
You are a senior technical interviewer creating interview questions for a live candidate assessment.

TASK:
Generate exactly ${questionCount} interview questions suitable for a real software engineering interview.

ROLE CONTEXT:
Job Title: ${jobTitle}

Experience Level: ${experienceLevel}

Tech Stack:
${techStack.map(skill => `- ${skill}`).join("\n")}

Difficulty:
${difficulty}

Question Type:
${questionType}

REQUIREMENTS:
- Each question's "type" field must be exactly one of: "theoretical", "coding", "design". Do not use any other value, and do not invent new categories.
- Use "theoretical" for concept-explanation questions, "coding" for questions requiring the candidate to write code, and "design" for schema/architecture/system-design questions that don't require writing actual code.

Return ONLY valid JSON in this format:

{
  "questions":[
    {
      "id":"q1",
      "type":"theoretical",
      "topic":"string",
      "difficulty":"medium",
      "skills":["string"],
      "estimated_time":"10-15 minutes",
      "question_text":"string"
    },
    {
      "id":"q2",
      "type":"design",
      "topic":"string",
      "difficulty":"medium",
      "skills":["string"],
      "estimated_time":"10-15 minutes",
      "question_text":"string"
    }
  ]
}
`;
};

module.exports = {
    buildTechnicalInterviewPrompt,
};