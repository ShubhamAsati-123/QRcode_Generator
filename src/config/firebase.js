import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDnzX3pQc7-UXHtNQomFVaUJlfHNprNWRs",
  authDomain: "miniproject-cef45.firebaseapp.com",
  projectId: "miniproject-cef45",
  storageBucket: "miniproject-cef45.appspot.com",
  messagingSenderId: "237623054805",
  appId: "1:237623054805:web:b7a0051a4a2af807a32d5c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
