// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getDatabase, ref } from 'firebase/database'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
//    authDomain: 'report-a1483.firebaseapp.com',
//    projectId: 'report-a1483',
//    storageBucket: 'report-a1483.appspot.com',
//    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDERID,
//    appId: process.env.REACT_APP_FIREBASE_APPID,
//    databaseURL: 'https://report-a1483-default-rtdb.asia-southeast1.firebasedatabase.app/',
// }

const firebaseConfig = {
  apiKey: "AIzaSyDeDuVmHDOFEdvjAnhrNX7bgzSdeMrMR3o",
  authDomain: "reportpom2.firebaseapp.com",
  databaseURL: "https://reportpom2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "reportpom2",
  storageBucket: "reportpom2.appspot.com",
  messagingSenderId: "1032947411089",
  appId: "1:1032947411089:web:9d40ca33aa19a9d039b730",
  measurementId: "G-MPYWRF42VW",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
// const dbFT = getFirestore(app)
const dbRT = ref(getDatabase(app))
// const providerFB = new FacebookAuthProvider()
const providerGG = new GoogleAuthProvider()
const storage = getStorage(app);
export { auth, providerGG, dbRT ,storage}
