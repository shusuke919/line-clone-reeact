import './App.css';
import SignIn from './components/SignIn';

import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {

  const [user] = useAuthState(auth)
  console.log(user)
  return (
    <div >
    <SignIn />
    </div>
  );
}

export default App;
