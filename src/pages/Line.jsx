import React  from 'react'
import { auth, db } from '../firebase'
import SignOut from '../components/SignOut'
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc } from "firebase/firestore"
import Sidevar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AllUsers from '../components/AllUsers';
import Sidebar from '../components/Sidebar';

const Line = () => {

 
  ///ログインしているユーザー確認
  // const a = auth.currentUser;
  ///もしログインしていればユーザー情報をcloud fireへ格納
  //  if (a) {
  //  console.log(a)
  //  setDoc(doc(db, "user", a.uid), {
  //   uid: a.uid,
  //   email: a.email,
  //   displayName: a.displayName,
  //   photoURL: a.photoURL
  // });
  // };

 
  return (
    <div>
      ログインしてます
      <Navbar />
      <Sidebar />
      <SignOut />
    </div>
  )
}

export default Line
