//routes/quiz.js

import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/save", async (req, res) => {
  const { user_id, score, correct_answers, incorrect_answers, answers } = req.body;

  try {
    await pool.query(
      `INSERT INTO quiz_results 
      (user_id, score, correct_answers, incorrect_answers, answers)
      VALUES (?, ?, ?, ?, ?)`,
      [user_id, score, correct_answers, incorrect_answers, JSON.stringify(answers)]
    );

    res.json({ msg: "Quiz saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
