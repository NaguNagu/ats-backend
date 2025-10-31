const { google } = require('googleapis');

function getSheetsClient() {
  const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const scopes = ['https://www.googleapis.com/auth/spreadsheets'];
  const auth = new google.auth.JWT(key.client_email, null, key.private_key, scopes);
  return google.sheets({ version: 'v4', auth });
}

exports.addApplicant = async (data, fileId) => {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  const row = [
    data.name,
    data.email,
    fileId,
    new Date().toISOString(),
    'Applied', // Initial stage
    ''  // Add more info if needed (notes, score, etc.)
  ];
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Sheet1!A1',
    valueInputOption: 'USER_ENTERED',
    resource: { values: [row] },
  });
};

exports.getApplicants = async () => {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Sheet1!A1:F1000',
  });
  return res.data.values || [];
};
