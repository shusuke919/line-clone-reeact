import React from 'react'

import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";



const googleSignIn = () => {
   const provider =new GoogleAuthProvider()
   signInWithRedirect(auth, provider)

   
   
}


const SignIn = () => {
  const user =useAuthState(auth)
  console.log(user)

  
  return (
    <div>
      <GoogleButton onClick={googleSignIn}/>
     
    </div>
  )
}

export default SignIn
