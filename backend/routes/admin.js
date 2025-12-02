//routes/admin.js

import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, username, email, role FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
