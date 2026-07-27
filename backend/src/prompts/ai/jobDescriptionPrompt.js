const buildJobDescriptionPrompt = ({
    jobDescription,
    experienceLevel,
    questionType,
    questionCount,
}) => {
    return `
You are a senior technical interviewer creating interview questions aligned to a specific job posting.

TASK:
Analyze the job description below and generate exactly ${questionCount} interview questions that assess the skills, technologies, and responsibilities emphasized in the role.

ROLE CONTEXT:
Experience Level: ${experienceLevel}

Question Type: ${questionType}

JOB DESCRIPTION:
${jobDescription}

REQUIREMENTS:
- Identify the key technical skills, responsibilities, and technologies from the job description before generating questions.
- Every question must map directly to a requirement or responsibility mentioned in the job description.
- Do not ask about technologies, frameworks, or skills that are not explicitly mentioned or reasonably implied.
- If Question Type is "Coding", include a clear programming task.
- If Question Type is "Mixed", balance theoretical and coding questions as evenly as possible.
- Do not include answers, hints, explanations, or evaluation criteria.

Return ONLY valid JSON in this format:

{
  "questions":[
    {
      "id":"q1",
      "maps_to_requirement":"string",
      "type":"theoretical",
      "topic":"string",
      "skills_tested":["string"],
      "estimated_time":"10-15 minutes",
      "question_text":"string"
    }
  ]
}
`;
};

module.exports = {
    buildJobDescriptionPrompt,
};
