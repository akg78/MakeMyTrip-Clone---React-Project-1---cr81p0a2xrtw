import React from 'react'
import "./register.css"
import { CiUser } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { CiWallet } from "react-icons/ci";
import { CiCreditCard1 } from "react-icons/ci";


export default function Register({ setToken, showSignIn, setShowSignIn }) {
  function handleSignOut() {
    setShowSignIn(false);
    setToken("");
    localStorage.removeItem("authToken");
  }
  return (
    <div>
      <div className='userPop '>
        <div className='myProfile'>
          <div className='flex g20'><CiUser className='ciUser' /><h4>My Profile</h4></div>
          <p>Manage your profile, travellers details, login <br /> details and password</p>
        </div>
        <div className='myProfile'>
          <div className='flex g20'><IoBagHandleOutline className='baghandle' /><h4>My Trip</h4></div>
          <p>See booking details, print e-ticket, Cancel <br />Booking,
            Modify Booking, Check Refund <br /> Status & more.
          </p>
        </div>
        <div className='myProfile'>
          <div className='flex g20'><CiWallet className='ciwallet' /><h4>My Wallet</h4></div>
          <p>Use your wallet money to avail even greater<br />
            discounts
          </p>
        </div>
        <div className='myProfile'>
          <div className='flex g20'><CiCreditCard1 className='creditCard' /><h4>Make a payment</h4></div>
          <p>Complete your pending payments here</p>
        </div>



        <button className='btnSignout' onClick={() => { handleSignOut() }} >Sign Out</button>
      </div>
    </div>
  )
}
