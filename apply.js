const express = require('express');
const multer = require('multer');
const driveUtils = require('../utils/drive');
const sheetsUtils = require('../utils/sheets');

const router = express.Router();
const upload = multer();

router.post('/', upload.single('resume'), async (req, res) => {
  try {
    // Save file in Google Drive and update Google Sheet
    const fileId = await driveUtils.uploadResume(req.file, req.body.name, req.body.email);
    await sheetsUtils.addApplicant(req.body, fileId);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
