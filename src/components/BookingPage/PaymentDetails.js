import React, { useState, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import "./PaymentDetails.css"

export default function PaymentDetails() {
  const checkboxRef = useRef();
  const inputfill = useRef([]);
  const upiinput = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let FirstName = JSON.parse(searchParams.get("FirstName"));
  let Email = JSON.parse(searchParams.get("Email"));
  let amount = searchParams.get("amount");
  const [termserror, settermserror] = useState(false)
  const [upierror, setupierror] = useState(false)
  const [debiterror, setdebiterror] = useState(false);



  const [donepayment, setdonepayment] = useState(false);
  const [pop, setpop] = useState({ "UPI": true });
  function popp(key) {
    setpop({});
    setpop((prev) => ({ ...prev, [key]: true }))
  }
  function termscheck() {
    settermserror(false);
  }
  function outlineremoval(key) {
    inputfill[key].style.outline = "none";
    setdebiterror(false);
  }
  function paymentdone() {
    if (checkboxRef.current.checked) {
      if (pop["UPI"]) {
        if (upiinput.current.value == "") {
          upiinput.current.style.outline = `0.5px solid red`
          setupierror(true);
        }
        else {
          setdonepayment(true);
          navigatelast();
        }
      }
      else {
        let bool = true
        Object.keys(inputfill).forEach(item => {
          if (inputfill[item].value == "") {
            inputfill[item].style.outline = `0.5px solid red`;
            setdebiterror(true);
            bool = false
          }
        })
        if (bool) {
          setdonepayment(true);
          navigatelast();
        }
      }
    }
    else {
      settermserror(true);
    }
  }
  function navigatelast() {
    setTimeout(() => {
      navigate("/");
    }, 7000)
  }

  return (
    <div className='paymentbooking'>
      <nav className=' flexa navigation'>
        <Link to={"/"}>
          <img src="//imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/logo@2x.png" alt="MMT's LOGO" />
        </Link>
      </nav>
      <div className={`paymentbookingMaindiv flexja ${donepayment ? "colordiv" : ""}`}>
        {!donepayment &&
          <div className='paymentCardouter flex flexc g10'>
            <h2>Pay to complete your booking</h2>
            <div className='paymentbookingcard flexa'>
              <div className='paymentcarddiv1 flex flexc g10'>
                <div className={`selectorcardpayment ${pop["UPI"] ? "colorselectorpayment" : ""}`} onClick={() => popp("UPI")}>UPI</div>
                <div className={`selectorcardpayment ${pop["Debit"] ? "colorselectorpayment" : ""}`} onClick={() => popp("Debit")}>Debit/Credit card</div>
              </div>
              {pop["UPI"] &&
                <div className='paymentcarddiv1result flex flexjsb'>
                  <div className='paymentcarddiv2 flex flexc g10'>
                    <h3>Enter UPI ID</h3>
                    <input type='text' ref={upiinput} placeholder='Enter your UPI ID' onChange={() => { setupierror(false); upiinput.current.style.outline = `none` }}></input>
                    {upierror && <span>Please enter a valid UPI ID</span>}
                    <p>Payment request will be sent to the phone no. linked to your UPI ID</p>
                  </div>
                  <div className='paymentcarddiv3 flexja flexc g10'><div className='linevertical'></div><p>OR</p><div className='linevertical'></div></div>
                  <div className='paymentcarddiv4 flexa flexc g20'>
                    <h3>SCAN QR CODE</h3>
                    <div className='qrcodepayment'></div>
                  </div>
                </div>
              }
              {pop["Debit"] &&
                <div className='paymentcarddiv5 flex flexc g10'>
                  <h3>Enter card details</h3>
                  <label>Card number</label>
                  <input ref={(e) => { inputfill[0] = e }} type='number' placeholder='Enter card number' onChange={() => { outlineremoval(0) }}></input>
                  <label>Expiry date</label>
                  <div className='flexa g20'>
                    <input ref={(e) => { inputfill[1] = e }} className='expirydate' type='number' placeholder='Month' onChange={() => { outlineremoval(1) }}></input>
                    <input ref={(e) => { inputfill[2] = e }} className='expirydate' type='number' placeholder='Year' onChange={() => { outlineremoval(2) }}></input>
                  </div>
                  <label>Card holder name</label>
                  <input ref={(e) => { inputfill[3] = e }} type='text' placeholder='Name as on card' onChange={() => { outlineremoval(3) }}></input>
                  <label>CVV</label>
                  <input ref={(e) => { inputfill[4] = e }} className='cvvinput' type='number' placeholder='CVV' onChange={() => { outlineremoval(4) }}></input>
                  {debiterror && <span>Please enter all details correctly</span>}
                </div>
              }
            </div>
            <div className='paymentpolichecker flexa g10'>
              <input type='checkbox' ref={checkboxRef} onClick={() => { termscheck() }} />
              <p>
                <p>I understand and agree to the rules and restrictions of this fare, the booking policy, the privacy policy and the terms and conditions of Cleartrip and confirm address details entered are correct</p>
                {termserror && <span>Please accept the terms and consitions to proceed with this booking</span>}
              </p>
              <div>
                <h2>₹{amount}</h2>
                <p>Total, inclusive of all taxes</p>
              </div>
            </div>
            <button className='paybuttonpayment' onClick={() => { paymentdone() }}>Pay now</button>
          </div>
        }
        {donepayment &&
          <div className='backgroundwhite flexja g20 flexc'>
            <p>{FirstName} ({Email})</p>
            <p>Your Payment is Done</p>
          </div>
        }
      </div>
    </div>
  )
}
