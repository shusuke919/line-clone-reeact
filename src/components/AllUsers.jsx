import useId from '@mui/material/utils/useId';
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
const handleClick = async (u) => {
//chatコレクション内にuser chats存在するか確認、もしなければ作成する
        const combineId =currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
//getDoc の返り値はPromise<DocumentSnapshot<T>>
         const res = await getDoc((doc(db, "chats", combineId)))
//もしcombineIdが存在しなければchatsコレクション、userschatsコレクションの作成
     if(!res.exists()){
     //chats コレクションの作成
     await setDoc(doc(db,"chats", combineId), {message:[]});
     //userChatsコレクションを更新 ログインユーザーがユーザーを追加
     await updateDoc(doc(db,"userChats", currentUser.uid),{
      [combineId+".userInfo"]:{
        uid:user.uid,
        displayName:user.displayName,
        photoURL:user.photoURL,
      },
      [combineId+".date"]:serverTimestamp()
     });

      //userChatsコレクションを更新 ユーザーにログイン中のユーザーを追加
      await updateDoc(doc(db, "userChats", user.uid),{
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
         {/* ユーザー一覧を表示 */}
      {user.map((u) => (
         <div className='users' key={u.uid} onClick={() =>handleClick(u)}>
               <img src={u.photoURL} alt="" />
                <p>{u.displayName}</p>
        </div>
        ))}
   </div>
)
}

export default AllUsers
