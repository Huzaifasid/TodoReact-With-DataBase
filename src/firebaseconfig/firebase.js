import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBc2eqigWT3KDjHQRa7lBykBEJZI1JLd8I",
  authDomain: "todo-with-account-hs.firebaseapp.com",
  projectId: "todo-with-account-hs",
  storageBucket: "todo-with-account-hs.appspot.com",
  messagingSenderId: "517291107619",
  appId: "1:517291107619:web:19393dfdb61ba589ea5896",
  measurementId: "G-9GX41ZKH96"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth };