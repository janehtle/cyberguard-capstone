//routes/quiz.js

import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.post('/submit', async (req, res) => {
	const userId = req.user.id; // from middleware
	const { theme, score, correct_answers, incorrect_answers, answers } = req.body;

	try {
		await pool.query(
			`INSERT INTO quiz_results 
      (user_id, theme, score, correct_answers, incorrect_answers, answers)
      VALUES (?, ?, ?, ?, ?, ?)`,
			[userId, theme, score, correct_answers, incorrect_answers, JSON.stringify(answers)]
		);

		res.json({ msg: 'Quiz saved!' });
	} catch (err) {
		console.error('Quiz Save Error:', err);
		res.status(500).json({ error: err.message });
	}
});

// GET quiz history for a user
router.get('/history/:id', async (req, res) => {
	const userId = req.params.id;

	try {
		const [rows] = await pool.query(
			`SELECT id, user_id, theme, score, correct_answers, incorrect_answers, timestamp
       FROM quiz_results 
       WHERE user_id = ? 
       ORDER BY timestamp DESC`,
			[userId]
		);

		res.json({ quizHistory: rows });
	} catch (err) {
		console.error('Quiz History Error:', err);
		res.status(500).json({ error: err.message });
	}
});

export default router;
