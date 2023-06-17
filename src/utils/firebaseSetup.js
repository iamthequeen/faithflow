import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


// const firebaseConfig = {
//   apiKey: "AIzaSyDgT3f15ldnVUAccVbK4D79JWe4Ejtd0mI",
//   authDomain: "faithflow-ce172.firebaseapp.com",
//   projectId: "faithflow-ce172",
//   storageBucket: "faithflow-ce172.appspot.com",
//   messagingSenderId: "765668145498",
//   appId: "1:765668145498:web:c18537ec2ea8487b189b63",
//   measurementId: "G-2H40HX1PD4"
// };

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// initialize firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
