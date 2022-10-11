import './App.css';
import Line from './pages/Line';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import SignIn from './pages/SignIn';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';



function App() {

  const {currentUser} = useContext(AuthContext);
const [user] =useAuthState(auth);

// console.log(currentUser); ログイン状態か確認する

//保護されたログアウトルートを作る
// ? : は使わない
const ProtectedRoute = ({children}) => {
  if(!currentUser){
    return <Navigate to="/sigin" />
  }
  //戻らなければ画面に何も表示されない
  return children;
}
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/'>
      <Route index element={<ProtectedRoute><Line /></ProtectedRoute>} />
      <Route path="sigin" element={<SignIn />} />
    </Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
