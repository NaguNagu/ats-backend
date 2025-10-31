require('dotenv').config();
const express = require('express');
const cors = require('cors');
const recruiterRoutes = require('./routes/recruiter');
const applyRoutes = require('./routes/apply');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/recruiter', recruiterRoutes);
app.use('/apply', applyRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`ATS backend running on port ${PORT}`);
});
