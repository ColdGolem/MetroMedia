// /api/access.js
import { sessionsDB } from './db';

export default function handler(req, res) {
  const { userId, line, type } = req.query;
  if (!userId || !line || !type) return res.status(400).json({ allowed: false });

  const now = Date.now();

  if (type === 'free') {
    // Start a new free session for 10 min
    sessionsDB[userId] = { line, type: 'free', startTime: now };
    return res.status(200).json({ allowed: true, expiresIn: 10 * 60 }); // seconds
  }

  if (type === 'paid') {
    // Paid session valid until next midnight
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    sessionsDB[userId] = { line, type: 'paid', startTime: now, expiresAt: midnight.getTime() };
    const remaining = Math.floor((midnight.getTime() - now) / 1000);
    return res.status(200).json({ allowed: true, expiresIn: remaining });
  }

  return res.status(400).json({ allowed: false });
}