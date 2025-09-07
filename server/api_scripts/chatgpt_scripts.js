import OpenAI from "openai";
import { parsing_prompt, scholarship_schema } from "../constants.js";

const parsing_client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_PARSING,
});

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


