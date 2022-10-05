import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsFnTALyuW4_muEOpcCGNQO258p6GXd2c",
  authDomain: "line-clone-react-9785a.firebaseapp.com",
  projectId: "line-clone-react-9785a",
  storageBucket: "line-clone-react-9785a.appspot.com",
  messagingSenderId: "1022714341496",
  appId: "1:1022714341496:web:beacfc3f4a5ab1f896a58d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const db =getFirestore();