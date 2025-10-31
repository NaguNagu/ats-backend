const { google } = require('googleapis');

function getDriveClient() {
  const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const scopes = ['https://www.googleapis.com/auth/drive.file'];
  const auth = new google.auth.JWT(key.client_email, null, key.private_key, scopes);
  return google.drive({ version: 'v3', auth });
}

exports.uploadResume = async (file, name, email) => {
  const drive = getDriveClient();
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  const fileMetadata = {
    name: `${name}_${email}_${Date.now()}.pdf`,
    parents: [folderId],
  };
  const media = {
    mimeType: file.mimetype,
    body: Buffer.from(file.buffer),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id',
  });

  return response.data.id;
};
