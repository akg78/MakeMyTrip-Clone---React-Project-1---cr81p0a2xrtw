import React from 'react'


export default function Register({setToken, showSignIn, setShowSignIn}) {
  function handleSignOut(){
    setShowSignIn(false)
    setToken("");
    localStorage.removeItem("authToken");
  }
  return (
    <div>
      <div>Hi User</div>
      <button onClick={()=>{handleSignOut()}} >Sign Out</button>
    </div>
  )
}
