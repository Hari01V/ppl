import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_Ttsm_LbQYHZbFgmBKBYec5gU2PF4xCY",
  authDomain: "ppl-app-5bf09.firebaseapp.com",
  projectId: "ppl-app-5bf09",
  storageBucket: "ppl-app-5bf09.appspot.com",
  messagingSenderId: "217316247950",
  appId: "1:217316247950:web:df231fdae8102387b63cdf"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default firebase;

export { app };