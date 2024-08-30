import admin from 'firebase-admin';
import { join } from 'path';

// Path to service account key
const serviceAccount = require(join(__dirname, './path/to/your-service-account-file.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com"
});

export default admin;