import { useContext, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";


const Sidevar = () => {

const [username, setUsername] = useState("");
const [user, setUser] = useState(null);
const [err, setErr] = useState(false);

const { currentUser } = useContext(AuthContext);


const handleSearch = () => {
  const q = query(
    collection(db, "user"),
    where("displayName", "==", username)
  );
  
try{
  const querySnapshot = getDocs(q);
  querySnapshot.forEach((doc) => {
    setUser(doc.data());
  });
} catch (err) {
  setErr(true);
}
};

const handleKey = (e) => {
  e.code === "Enter" && handleSearch();
};


  return (
    
       <div className='search'>
         <div className="searchForm">
             <input type="text" placeholder="名前を入力してください" onKeyDown={handleKey} onChange={(e)=>setUsername(e.target.value)} ></input>
         </div>
         {err && <span>違う</span>}
      {user && (<div>
              <img src={user.photoURL} alt=''></img>
             <div className="userChatInfo">
               <span>{user.displayName}</span>
              </div>
            </div>)}
    </div>
   
  )
}

export default Sidevar

