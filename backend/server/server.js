import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import OpenAI from 'openai';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
	apiKey: process.env.OPENAI_APIKEY,
});

app.get('/', async (req, res) => {
	res.send('hi');
});
app.post('/api/response', async (req, res) => {
	let theme = 'social engineering';
	let numOfQuestions = 3;
	const systemPrompt = `
    Generate exactly ${numOfQuestions} cybersecurity questions about "${theme}". 
    Include at least 1 real world scenario question as part of the ${numOfQuestions}. 
    Return your response strictly as a JSON object.
        {
        "question": "string",
        "options": ["A","B","C","D"],
        "correctAnswer": 0
        }
    ("correctAnswer" is the index of the correct option 0–4)
    No explanations. No extra text.

    
    `;
	try {
		const response = await openai.responses.create({
			model: 'gpt-4o-mini',
			input: [{ role: 'system', content: systemPrompt }],
			temperature: 1,
			max_output_tokens: 500,
		});
		const outputText = response.output_text.trim();

		// Attempt to parse JSON
		let data;
		try {
			data = JSON.parse(outputText);
		} catch {
			data = { raw_output: outputText };
		}
		console.log(data);
		res.json(data);
	} catch (err) {
		console.log(`Error ${err}`);
	}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`✅ Server running on port http://localhost:${PORT}/api/response`));
