import React from 'react'
import "./register.css"

export default function Register({ setToken, setShowSignIn }) {
  function handleSignOut() {
    setShowSignIn(false);
    setToken("");
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");
  }
  return (
    <div>
      <div className='userPop'>
        <button className='btnSignout' onClick={() => { handleSignOut() }} >Sign Out</button>
      </div>
    </div>
  )
}
