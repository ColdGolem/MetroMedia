export default function handler(req, res) {
  const { userId, line } = req.query;
  if (!userId || !line) return res.status(400).json({ allowed: false });

  // Demo logic for free/paid
  const allowed = Math.random() > 0.5;

  // Razorpay/AdMob keys are safely accessible here
  const razorpayKey = process.env.RAZORPAY_KEY;
  const admobKey = process.env.ADMOB_KEY;

  res.status(200).json({ allowed });
}