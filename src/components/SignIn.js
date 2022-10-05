import React from 'react'
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"


///ユーザー登録　Google認証
const googleSignIn = () => {
   const provider =new GoogleAuthProvider();
   signInWithRedirect(auth, provider);
};

const SignIn = () => {

  // //useAuthState認証情報取得
  // const [user] = useAuthState(auth);
  // ///ログインしているユーザー確認
  // const a = auth.currentUser;
  // ///もしログインしていればユーザー情報をcloud fireへ格納
  //  if (a) {
  //  console.log(a)
  //  setDoc(doc(db, "user", a.uid), {
  //   uid: a.uid,
  //   displayName: a.displayName
  // });
  // };
   
  return (
    <div>
      <GoogleButton onClick={googleSignIn}/>
    </div>
  )
}

export default SignIn
