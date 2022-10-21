import React from 'react'
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"
import { useNavigate } from 'react-router-dom';


///ユーザー登録　Google認証
const googleSignIn = () => {
   const provider =new GoogleAuthProvider();
   signInWithRedirect(auth, provider);
};

const SignIn = () => {

  const navigate = useNavigate();

  //useAuthState認証情報取得
  const [user] = useAuthState(auth);
  ///ログインしているユーザー確認
  const a = auth.currentUser;
  ///もしログインしていればユーザー情報をcloud fireへ格納
   if (a) {
  //userコレクションに格納
   setDoc(doc(db, "user", a.uid), {
    uid: a.uid,
    email: a.email,
    displayName: a.displayName,
    photoURL: a.photoURL
  });
   //userChatsに格納
  setDoc(doc(db, "userChats", a.uid), {
  });
  //フレンド申請
  setDoc(doc(db, "setFriendRequest", a.uid), {
  });
  setDoc(doc(db, "gotFriendRequest", a.uid), {
  });
  setDoc(doc(db, "friendList", a.uid), {
  });
  navigate("/");

  };
   
  return (
    <div>
      <GoogleButton onClick={googleSignIn}/>
    </div>
  )
}

export default SignIn
