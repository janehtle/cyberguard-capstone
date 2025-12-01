import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import OpenAI from 'openai';

import authRoutes from "./routes/auth.js";
import quizRoutes from "./routes/quiz.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

import OpenAI from 'openai';

const client = new OpenAI({
// OpenAI Quiz Generator
const openai = new OpenAI({
	apiKey: process.env.OPENAI_APIKEY,
});

app.post('/api/response', async (req, res) => {
	// let theme = req.body;

	let theme = 'Socail Engineering';
	let numOfQuestions = 3;
	const systemPrompt = `
    Generate exactly ${numOfQuestions} of cybersecurity questions about "${theme}". 
	Ensure that the order of the options are random and only 4 options.
    Include at least 1 real world scenario question as part of the ${numOfQuestions}. 
    Return the data strictly in JSON format.

    listOfQuestions:{"question": "string","options": array,"correctAnswer": int}
    ("correctAnswer" is the index of the correct option 0–3)
    No explanations. No extra text.
    `;
	try {
		const response = await client.responses.create({
			model: 'gpt-4o-mini',
			text: {
				format: {
					type: 'json_object',
				},
			},
			input: [{ role: 'system', content: systemPrompt }],
			temperature: 1.3,
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

// Database Routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`✅ Server running on port http://localhost:${PORT}/api/response`));
