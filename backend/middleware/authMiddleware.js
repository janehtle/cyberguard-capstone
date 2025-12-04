//middleware/authMiddleware.js

import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  // Checking if user has an active session
  if (req.session?.userId) {
    req.user = {
      id: req.session.userId,
      role: req.session.role
    };
    return next();
  }


  // Else: Try JWT
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
}
