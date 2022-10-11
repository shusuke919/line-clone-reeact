import { onAuthStateChanged } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase"

//コンテキストAPIを作成していく
export const AuthContext = createContext();

export const AuthContextProvider  = ({children}) =>{

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
   const unsub = onAuthStateChanged(auth,(user)=>{

    setCurrentUser(user);
    console.log(user);
    });
   
   return () => {
    unsub();
   }


  },[]);

 return(
  ///全体にchildrenを渡しcurrentUser情報を渡す
  <AuthContext.Provider value={{currentUser}}>
    {children}
  </AuthContext.Provider>
 );
  
};