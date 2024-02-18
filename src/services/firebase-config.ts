import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAkG2Z-Ljxo08sBGHeVG6ioshMQa-9VBIg",
  authDomain: "sound-scape-61474.firebaseapp.com",
  projectId: "sound-scape-61474",
  storageBucket: "sound-scape-61474.appspot.com",
  messagingSenderId: "591898150107",
  appId: "1:591898150107:web:e232fdf92251a549bdb8fe"
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const database: Firestore = getFirestore(app);
export const storage = getStorage(app);