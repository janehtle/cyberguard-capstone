//routes/admin.js

import express from "express";
import pool from "../db.js";

const router = express.Router();

// For Users
router.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, username, email, role FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get quiz results
router.get("/results", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM quiz_results");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin analytics
router.get("/analytics", async (req, res) => {
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
