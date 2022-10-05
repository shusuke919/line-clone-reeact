import React from 'react'
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"
import SignOut from './SignOut'


///ユーザー登録　Google認証
const googleSignIn = () => {
   const provider =new GoogleAuthProvider();
   signInWithRedirect(auth, provider);
};

const SignIn = () => {
  //useAuthState認証情報取得
  const [user] = useAuthState(auth);
console.log(user);

  //fire cloudへ保存
  setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    displayName: user.displayName,
  });
 
  return (
    <div>

      <GoogleButton onClick={googleSignIn}/>
     <SignOut/>
    </div>
  )
}

export default SignIn
