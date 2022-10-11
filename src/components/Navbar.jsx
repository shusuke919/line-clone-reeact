import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {

  const {currentUser} = useContext(AuthContext);

  return (
    <div className='user'>
      <img src={currentUser.photoURL} alt="" />
      <span>{currentUser.displayName}</span>
    </div>
  )
}

export default Navbar
