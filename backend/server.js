import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import quizRoutes from './routes/quiz.js';
import adminRoutes from './routes/admin.js';
import questionRoutes from './routes/questions.js';
import authMiddleware from './middleware/authMiddleware.js';
import adminMiddleware from './middleware/adminMiddleware.js';
import pool from './db.js';
import OpenAI from 'openai';

dotenv.config();
const app = express();

// ------------------ CORS ------------------
const allowedOrigins = [
	'http://localhost:5173',
	'https://dev.d1thswjv0p8u6t.amplifyapp.com',
	'https://cyberguard-capstone.onrender.com',
];

app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
);

// ------------------ Middleware ------------------
app.use(express.json());
app.use(
	session({
		secret: process.env.SESSION_SECRET || 'supersecretdevkey',
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 1000 * 60 * 60 * 24,
		},
	})
);

// ------------------ Database Test ------------------
app.get('/test-db', async (req, res) => {
	try {
		const [rows] = await pool.query('SELECT NOW() AS time');
		res.json({ connected: true, time: rows[0].time });
	} catch (err) {
		console.log(err);
		res.status(500).json({ connected: false, error: err.message });
	}
});

// ------------------ OpenAI Client ------------------
const client = new OpenAI({ apiKey: process.env.OPENAI_APIKEY });

// ------------------ Quiz Generator ------------------
app.post('/api/response', async (req, res) => {
	const { theme, score } = req.body;
	const numOfQuestions = 3;

	const systemPrompt = `
    Generate exactly ${numOfQuestions} cybersecurity questions about "${theme}". 
    Ensure options are random and only 4 per question.
    Include at least 1 real-world scenario question.
    Return strictly valid JSON:
      { listOfQuestions: [{"question":"string","options":["string"],"correctAnswer":0}] }
    No extra text or explanations.
  `;

	try {
		const response = await client.responses.create({
			model: 'gpt-4o-mini',
			text: { format: { type: 'json_object' } },
			input: [{ role: 'system', content: systemPrompt }],
			temperature: 1.3,
			max_output_tokens: 500,
		});

		const outputText = response.output_text.trim();
		let data;

		try {
			data = JSON.parse(outputText);
		} catch {
			data = { raw_output: outputText };
		}

		res.json(data);
	} catch (err) {
		console.error('OpenAI error:', err);
		res.status(500).json({ error: 'Failed to generate quiz' });
	}
});

// ------------------ API Routes ------------------
app.use('/api/auth', authRoutes);
app.use('/api/questions', authMiddleware, questionRoutes);
app.use('/api/quiz', authMiddleware, quizRoutes);
app.use('/api/admin', authMiddleware, adminMiddleware, adminRoutes);

// ------------------ Serve React ------------------
// Serve static files from repo-level dist (monorepo: client build -> /dist at repo root)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticDir = path.join(__dirname, '..', 'dist');

app.use(express.static(staticDir));

// SPA fallback — MUST come after API routes. Exclude /api so API routes are not hijacked.
app.get(/^\/(?!api).*/, (req, res) => {
	res.sendFile(path.join(staticDir, 'index.html'));
});

// ------------------ Start Server ------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`✅ Server running on port ${PORT}`));
