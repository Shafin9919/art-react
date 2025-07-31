import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";




const firebaseConfig = {
    apiKey: import.meta.env.VITE_firebase_apiKey,
    authDomain: import.meta.env.VITE_firebase_authDomain,
    projectId: import.meta.env.VITE_firebase_projectId,
    storageBucket: import.meta.env.VITE_firebase_storageBucket,
    messagingSenderId: import.meta.env.VITE_firebase_messagingSenderId,
    appId: import.meta.env.VITE_firebase_appId
  };





const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
