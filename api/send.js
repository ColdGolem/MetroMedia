import { messagesDB, sessionsDB } from './db';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { line, message, userId } = req.body;
  if (!line || !message || !userId) return res.status(400).json({ error: 'Missing parameters' });

  const session = sessionsDB[userId];
  if (!session) return res.status(403).json({ error: 'No active session' });

  // Free users cannot send at all
  if (session.type === 'free') {
    return res.status(403).json({ error: 'Free users can only read messages' });
  }

  // Paid users can send if their session is still valid
  const now = Date.now();
  if (session.type === 'paid' && session.expiresAt && now > session.expiresAt) {
    return res.status(403).json({ error: 'Paid session expired' });
  }

  if (!messagesDB[line]) messagesDB[line] = [];
  messagesDB[line].push({ userId, message, time: now });

  res.status(200).json({ success: true });
}