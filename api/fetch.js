// fetch.js
let chatDatabase = {}; // must match send.js in real backend or use DB

export default async function handler(req, res) {
  const { city, line } = req.query;
  if (!city || !line) return res.status(400).json({error:'Missing parameters'});

  const key = `${city}_${line}`;
  const messages = chatDatabase[key] || [];
  res.status(200).json({messages});
}