import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }


  const sentence = req.body.sentence.trim() || '';
  const language = req.body.language.trim() || '';

  if (sentence.length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid sentence",
      }
    });
    return;
  }


  try {
    const translationResponse = await openai.createCompletion({
      model: "text-curie-001",
      prompt: generatePrompt(language, sentence),
      temperature: 0.3,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0,
      presence_penalty: 1,
    })


    // adding translation data key to store the translation result.
    res.status(200).json({ translationResult: translationResponse.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(language, sentence) {

  const task_description = `Translate English to ${language}:`

  const to_translate = `${sentence}`;

  return task_description + "\n" + to_translate;
}