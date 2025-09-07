import OpenAI from "openai";
import { scholarship_schema, parsing_prompt } from "../constants";

const parsing_client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_PARSING,
});

// const scholarship_schema = {
//   name: "ScholarshipSchema",
//   schema: {
//     type: "object",  // Root must be object
//     properties: {
//       scholarships: {  // Array goes inside this property
//         type: "array",
//         items: {
//           type: "object",
//           properties: {
//             name: { type: "string" },
//             provider: { type: "string" },
//             amount: { type: "string" },
//             applicationLink: { type: "string" },
//             deadline: { type: "string" },
//             GPA: { type: "number" },
//             Majors: {
//               type: "array",
//               items: { type: "string" },
//             },
//             requirements: {
//               type: "array",
//               items: { type: "string" },
//             },
//           },
//           required: [
//             "name",
//             "provider",
//             "amount",
//             "applicationLink",
//             "deadline",
//             "GPA",
//             "Majors",
//             "requirements",
//           ],
//           additionalProperties: false
//         },
//       }
//     },
//     required: ["scholarships"],
//     additionalProperties: false
//   },
//   strict: true
// };

// const parsing_prompt = (input_data) => `
// You are given a JSON array of scholarship objects.
// For each object:
// - Look inside the "requirements" array.
// - Extract GPA (float, or 0 if not specified).
// - Extract majors (list of strings; if "Open to all majors" or similar, use ["Available to All"]).
// - Return a JSON object with a "scholarships" array containing the updated scholarship objects.
// - Keep all other fields exactly the same.

// Input data:
// ${JSON.stringify(input_data, null, 2)}

// Return format should be:
// {
//   "scholarships": [
//     // ... updated scholarship objects with GPA and Majors fields
//   ]
// }
// `;

export async function get_parsed_file(input) {
  try {
    const response = await parsing_client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: parsing_prompt(input)
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: scholarship_schema
      },
      temperature: 0.3,
    });

    const structuredData = JSON.parse(response.choices[0].message.content);
    
    // Return just the scholarships array for easier use
    return structuredData.scholarships;

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}


