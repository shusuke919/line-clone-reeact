import { collection, onSnapshot } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../firebase';

const AllUsers = () => {

  //ユーザーを状態管理
  const [user, setUser] =useState(null);
  //dbのユーザーを取得
  const q = collection(db, "user");
  
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
   
  });

return (
    <div>
      {console.log(user)}
      <span>ユーザーの名前</span>
    </div>
  )
}

export default AllUsers
