import firebase from 'firebase/app';
import 'firebase/messaging'; 

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "paocommunity-14f72.firebaseapp.com",
  projectId: "paocommunity-14f72",
  storageBucket: "paocommunity-14f72.appspot.com",
  messagingSenderId: "MESSAGING_SENDER_ID",
  appId: "APP_ID",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const messaging = firebase.messaging();
