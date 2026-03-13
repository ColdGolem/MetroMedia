// crowd.js
export default async function handler(req, res) {
  const { city, line } = req.query;
  if (!city || !line) return res.status(400).json({error:'Missing parameters'});

  // For demo: random crowd status
  const statuses = ["Low", "Medium", "High", "Very Crowded"];
  const status = statuses[Math.floor(Math.random()*statuses.length)];

  res.status(200).json({status});
}