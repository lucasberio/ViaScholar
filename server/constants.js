export const parsing_prompt = (input_data) => `
You are given a JSON array of scholarship objects.
For each object:
- Look inside the "requirements" array.
- Extract GPA (float, or 0 if not specified).
- Extract majors (list of strings; if "Open to all majors" or similar, use ["Available to All"]).
- Return a JSON object with a "scholarships" array containing the updated scholarship objects.
- Keep all other fields exactly the same.

Input data:
${JSON.stringify(input_data, null, 2)}

Return format should be:
{
  "scholarships": [
    // ... updated scholarship objects with GPA and Majors fields
  ]
}
`;

export const scholarship_schema = {
  name: "ScholarshipSchema",
  schema: {
    type: "object",  // Root must be object
    properties: {
      scholarships: {  // Array goes inside this property
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            provider: { type: "string" },
            amount: { type: "string" },
            applicationLink: { type: "string" },
            deadline: { type: "string" },
            GPA: { type: "number" },
            Majors: {
              type: "array",
              items: { type: "string" },
            },
            requirements: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: [
            "name",
            "provider",
            "amount",
            "applicationLink",
            "deadline",
            "GPA",
            "Majors",
            "requirements",
          ],
          additionalProperties: false
        },
      }
    },
    required: ["scholarships"],
    additionalProperties: false
  },
  strict: true
};

export const feedback_sys_prompt = `You are an AI essay advisor helping students improve 
scholarship application essays, talk directy to them. Do not rewrite the essay—just provide 
thoughtful feedback. Structure your response in the following format: Overview: Briefly summarize 
what the essay conveys and how effectively it does so. Strengths: Highlight what works well in 
terms of content and impact. Weaknesses: Point out areas that lack clarity, depth, or focus. 
Grammar & Style Notes: Mention any noticeable issues with language, tone, or flow. This should 
be structured as inconsistent x, missing x after y, x is y, etc. `
