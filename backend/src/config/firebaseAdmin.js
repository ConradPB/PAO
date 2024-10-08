import admin from 'firebase-admin';
import { join } from 'path';

// Path to service account key
const serviceAccount = require(join(__dirname, './path/to/service-account-file.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://paocommunity-14f72.firebaseio.com"
});

export default admin;