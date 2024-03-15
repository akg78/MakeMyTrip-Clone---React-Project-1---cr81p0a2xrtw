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
  const [upi, setupi] = useState("");
  const [month, SetMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [donepayment, setdonepayment] = useState(false);
  const [pop, setpop] = useState({ "UPI": true });
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cardNumber, setCardNumber] = useState('');





  const handleCardno = (e) => {
    const number = e.target.value;
    if (cardNumber.length === 16) {
      setCardNumber(number);
    }
    setCardNumber(number);

  };

  const handleMonthChange = (e) => {
    const month = e.target.value;
    if (/[^\d]/.test(month) || month < 0 || month > 12) {
    } else {
      setExpiryMonth(month);
    }
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    // const currentYear = new Date().getFullYear();
    if (/[^\d]/.test(year)) {
    } else {
      setExpiryYear(year);
    }
  };



  function handleUpiID(event) {
    const { value } = event.target;

    if (value.length == 10) {
      setupi('Invalid upi number');
    } else {
      setupi('');
      setupierror(false);
      upiinput.current.style.outline = `none`
    }
  }

  function validateUpi(e) {
    const value = e.target.value.replace(/\D/g, '');
    setupi(value);
  }

  // function validateMonths(e){
  //   const value = e.target.value.replace(/\D/g, '');
  //   SetMonth(value);
  // }

  // function validateYear(e){
  //   const value = e.target.value.replace(/\D/g, '');
  //   setExpiryYear(value);
  // }

  function validateCvv(e) {
    const value = e.target.value.replace(/\D/g, '');
    setCvv(value);
  }

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
                    <div className='flex' style={{}}>
                      <input type='text' ref={upiinput} placeholder='Enter your UPI ID' onChange={(e) => { handleUpiID(e) }}></input>
                      {/* <p className='flex flexa flexjsb' style={{ width: "100%", border: "1px solid lightgrey", borderRadius: "0px 6px 6px 0px", fontSize: "14px", paddingLeft: "5px" }}> 
                      @oksbi</p> */}
                    </div>
                    {upierror && <span>Please enter a valid UPI ID</span>}
                    <p>Payment request will be sent to the phone no. linked to your UPI ID.</p>
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
                  {/* <input  type='number' placeholder='Enter card number' ></input> */}
                  <input
                    ref={(e) => { inputfill[0] = e }}
                    onChange={(e) => { outlineremoval(0), validateUpi(e), handleCardno(e) }}
                    type="text"
                    maxlength="16"
                    value={upi}
                    placeholder="xxxx xxxx xxxx xxxx" />
                  <label>Expiry date</label>
                  <div className='flexa flex g20'>
                    <input ref={(e) => { inputfill[1] = e }} className='expirydate' type='text' placeholder='Month' maxlength="2" value={expiryMonth} onChange={(e) => { outlineremoval(1), handleMonthChange(e) }}></input>
                    <input ref={(e) => { inputfill[2] = e }} className='expirydate' type='text' placeholder='Year' maxlength="4" value={expiryYear} onChange={(e) => { outlineremoval(2), handleYearChange(e) }} ></input>
                    {/* <select className='expiryyear' ref={(e) => { inputfill[2] = e }} onChange={(e) => { outlineremoval(2), handleYearChange(e) }}>
                      <option value={expiryYear} >2024</option>
                      <option value={expiryYear}>2025</option>
                      <option value={expiryYear}>2026</option>
                      <option value={expiryYear}>2027</option>
                      <option value={expiryYear}>2028</option>
                    </select> */}
                  </div>
                  <label>Card holder name</label>
                  <input ref={(e) => { inputfill[3] = e }} type='text' placeholder='Name as on card' onChange={() => { outlineremoval(3) }}></input>
                  <label>CVV</label>
                  <input ref={(e) => { inputfill[4] = e }} className='cvvinput' type='text' placeholder='CVV' maxlength="3" value={cvv} onChange={(e) => { outlineremoval(4), validateCvv(e) }}></input>
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
