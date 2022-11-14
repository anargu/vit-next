import { initializeApp } from "firebase/app";
import { getAuth, getRedirectResult } from "firebase/auth";
import { getFirestore, Timestamp } from "firebase/firestore";
/* import { getAnalytics } from "firebase/analytics"; */

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/* const analytics = getAnalytics(app); */
const auth = getAuth(app);

const firestore = getFirestore(app);

export {
  app,
  auth,
  firestore,
  getRedirectResult,
  Timestamp,
  /* analytics */
};
