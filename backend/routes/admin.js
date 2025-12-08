//routes/admin.js

import express from 'express';
import pool from '../db.js';

const router = express.Router();

// For Users
router.get('/users', async (req, res) => {
	try {
		const [rows] = await pool.query(
			`SELECT u.id, u.username, u.email, u.created_at,
              COUNT(qr.id) AS quizzesTaken
       FROM users u
       LEFT JOIN quiz_results qr ON u.id = qr.user_id
       GROUP BY u.id
       ORDER BY u.created_at DESC`
		);
		res.json(rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Get recent quiz attempts (all users)
router.get('/recent-attempts', async (req, res) => {
	try {
		const [rows] = await pool.query(
			`SELECT qr.id, qr.user_id, u.username, qr.theme, qr.score, qr.correct_answers, qr.incorrect_answers, qr.timestamp
       FROM quiz_results qr
       JOIN users u ON qr.user_id = u.id
       ORDER BY qr.timestamp DESC
       LIMIT 20`
		);
		res.json(rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Get topic statistics
router.get('/topics', async (req, res) => {
	try {
		const [rows] = await pool.query(
			`SELECT theme as topic,
              COUNT(*) as attempts,
              AVG(score) as avgScore
       FROM quiz_results
       GROUP BY theme
       ORDER BY attempts DESC`
		);
		res.json(rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Delete user (and their quiz results)
router.delete('/users/:id', async (req, res) => {
	const userId = req.params.id;
	try {
		// Delete quiz results first (foreign key constraint)
		await pool.query('DELETE FROM quiz_results WHERE user_id = ?', [userId]);
		// Then delete the user
		await pool.query('DELETE FROM users WHERE id = ?', [userId]);
		res.json({ msg: 'User deleted successfully' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Get quiz results
router.get('/results', async (req, res) => {
	try {
		const [rows] = await pool.query('SELECT * FROM quiz_results');
		res.json(rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Admin analytics
router.get('/analytics', async (req, res) => {
	try {
		const [[stats]] = await pool.query(`
      SELECT 
        AVG(score) AS avgScore,
        COUNT(*) AS totalAttempts
      FROM quiz_results
    `);

		res.json(stats);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default router;
