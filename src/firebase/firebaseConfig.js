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
   apiKey: "AIzaSyCcf-0eER0eonDlznt6EDgXo0S5DIzlzqE",
   authDomain: "report-for-pomina2.firebaseapp.com",
   projectId: "report-for-pomina2",
   storageBucket: "report-for-pomina2.appspot.com",
   messagingSenderId: "708685289283",
   appId: "1:708685289283:web:662e2595870c37d56241f6",
   databaseURL: 'https://report-for-pomina2-default-rtdb.asia-southeast1.firebasedatabase.app/'
 };

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
// const dbFT = getFirestore(app)
const dbRT = ref(getDatabase(app))
// const providerFB = new FacebookAuthProvider()
const providerGG = new GoogleAuthProvider()
const storage = getStorage(app);
export { auth, providerGG, dbRT ,storage}
