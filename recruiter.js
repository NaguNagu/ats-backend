const express = require('express');
const sheetsUtils = require('../utils/sheets');
const router = express.Router();

router.use((req, res, next) => {
  if (req.headers['authorization'] !== `Bearer ${process.env.RECRUITER_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

router.get('/applicants', async (req, res) => {
  try {
    const applicants = await sheetsUtils.getApplicants();
    res.json(applicants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add more recruiter endpoints here (stage updates, download CSV, etc.)

module.exports = router;
