import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC8QU6lufVVpfzbN4xKX7yLiq4LWk_c98w",
  authDomain: "react-chanakya.firebaseapp.com",
  projectId: "react-chanakya",
  storageBucket: "react-chanakya.appspot.com",
  messagingSenderId: "511872603280",
  appId: "1:511872603280:web:d34bb0792b14c1cee37415",
  measurementId: "G-61GED5DG5B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const colRef = collection(db, "patient");
