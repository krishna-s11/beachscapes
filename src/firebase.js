import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2V7h9pVWUsqohnJQYbfPXcLA2IQ_1Z5A",
  authDomain: "beachscapes.firebaseapp.com",
  projectId: "beachscapes",
  storageBucket: "beachscapes.appspot.com",
  messagingSenderId: "870004709884",
  appId: "1:870004709884:web:2c5918cde785dd88963a79",
  measurementId: "G-5ZDXZ2W31E",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
