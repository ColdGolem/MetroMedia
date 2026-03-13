
// /api/logSession.js
let dailyLogs = []; // Stores all sessions for the day (resets daily)

export default function handler(req, res) {
  if (req.method === "POST") {
    // Add new session
    const { city, line, type, timestamp } = req.body;

    dailyLogs.push({ city, line, type, timestamp });
    console.log(`LOG: ${type} | ${city} | ${line} | ${timestamp}`);

    res.status(200).json({ status: "logged", count: dailyLogs.length });

  } else if (req.method === "GET") {
    // Generate XML for download
    let xml = `<?xml version="1.0" encoding="UTF-8"?><sessions>`;
    dailyLogs.forEach(log => {
      xml += `<session>
        <timestamp>${log.timestamp}</timestamp>
        <city>${log.city}</city>
        <line>${log.line}</line>
        <type>${log.type}</type>
      </session>`;
    });
    xml += `</sessions>`;

    // Send as downloadable XML
    res.setHeader("Content-Disposition", "attachment; filename=dailyLogs.xml");
    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(xml);

  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}