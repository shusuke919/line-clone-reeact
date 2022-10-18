import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../context/AuthContext";
import { db } from '../firebase'

const AllUsers = () => {
///状態関数
  const [user, setUser] = useState([]);

  //ログイン中のユーザー情報
  const { currentUser } = useContext(AuthContext);

  useEffect(()=> {
        const userData = collection(db, "user");
        getDocs(userData).then((snapshot) => {
            setUser(snapshot.docs.map((doc)=> ({...doc.data() })));
        });
        
    },[])
 
//ユーザーをクリックすると
const handleClick = () => {
  //chatコレクション内にuser chats存在するか確認、もしなければ作成する
  const combineId =currentUser.uid > user.uid ? currentUser.uid + user.uid : user.id + currentUser.uid
  
    const res = getDoc(doc(db, "chats", combineId))
    //もしcombineIdが存在しなければchatsコレクション、userschatsコレクションの作成
    if(!res.exists()){
     
     //chats コレクションの作成
    
     setDoc(doc(db,"chats", combineId), {message:[]});
     //userChatsコレクションを更新 ログインユーザーがユーザーを追加
     updateDoc(doc(db,"userChats", currentUser.uid),{
      [combineId+".userInfo"]:{
        uid:user.id,
        displayName:user.displayName,
        photoURL:user.photoURL,
      },
      [combineId+".date"]:serverTimestamp()
     });

      //userChatsコレクションを更新 ユーザーにログイン中のユーザーを追加
      updateDoc(doc(db, "userChats", user.uid),{
        [combineId+".userInfo"]:{
          uid:currentUser.uid,
          displayName:currentUser.displayName,
          photoURL:currentUser.photoURL,
        },
        [combineId+".date"]:serverTimestamp(),
       });
    }
    
 
 
};


return (
  <div className="msgs">
  {user.map(({index,photoURL,displayName}) => (
   
      <div className='users' key={index} onClick={handleClick}>
        <img src={photoURL} alt="" />
        <p>{displayName}</p>
      </div>
    
  ))}
</div>
  )
}

export default AllUsers
