// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG_WZ84ISMaIT4EguBSCcBuZOa7qo1jes",
  authDomain: "go-green-5959e.firebaseapp.com",
  projectId: "go-green-5959e",
  storageBucket: "go-green-5959e.appspot.com",
  messagingSenderId: "942353135778",
  appId: "1:942353135778:web:d4984962672a987ba57ffb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
