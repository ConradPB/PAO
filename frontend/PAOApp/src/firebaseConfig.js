import firebase from 'firebase/app';
import 'firebase/messaging'; 

const firebaseConfig = {
  apiKey: "AIzaSyAop_tJ0EFm58tdTHdgImaJlg3762qJtiQ",
  authDomain: "paocommunity-14f72.firebaseapp.com",
  projectId: "paocommunity-14f72",
  storageBucket: "paocommunity-14f72.appspot.com",
  messagingSenderId: "628514439370",
  appId: "1:628514439370:web:4598a88627641f40c0f433",
  measurementId: "G-13T511YR54"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const messaging = firebase.messaging();
