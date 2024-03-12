import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, NavLink, useLocation, Link } from 'react-router-dom';
import "./BookingPageTrain.css"

export default function BookingPageTrain() {
  const submitbtnref = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const {
    trainNamee,
    trainNumberr,
    sourcee, 
    destinationn,
    arrivalTimee,
    departureTimee,
    faree,
    coachTypee,
    numberOfSeatss,
    travelDurationn
  } = location.state || {};

  let dayOfWeek = searchParams.get("date");
  const dateObject = new Date(dayOfWeek);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [arr, setarr] = useState([1]);
  const [genderselector, setgenderselector] = useState(true);
  const [details, setdetails] = useState({ "fname": "", "lname": "", "mobile": "", "email": "", "state": "", "pincode": "", "address": "" });
  const [proceedcolor, setproceedcolor] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [pincodeError, setPincodeError] = useState('');

  const stateNames = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
    "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi",
    "Puducherry", "Ladakh"
  ];

  const handleStateChanger = (e) => {
    setdetails(e.target.value);
  }

  const handlePincodeChange = (event) => {
    const { value } = event.target;
    if (value.length <= 6 && /^\d+$/.test(value)) {
      setdetails(value);
      setPincodeError('');
    } else {
      setPincodeError('Please enter a valid 6-digit pincode.');
    }
  };

  const handleKeyDown = (e) => {
    if (!(e.key === 'Backspace' || e.key === 'Delete' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Tab')) {
      if (!/\d/.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  const validateEmail = () => {
    const re = /\S+@\S+\.\S+/;
    if (!re.test(details["email"])) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePhone = (event) => {
    // const re = /^\+?[0-9]{1,3}-?[0-9]{3,}$/; && /^\d+$/.test(value)
    const { value } = event.target;
    if (value.length !=10) {
      setPhoneError('Invalid phone number');
    } else {
      setPhoneError('');
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setdetails(value);
  }

  function detailsChanger(key, value) {
    setdetails((prev) => ({ ...prev, [key]: value }))

  }

  function target() {
    if (submitbtnref.current) {
      if (details["fname"] != "" && details["lname"] != "" && details["mobile"] != "" && details["email"] != "" && details["state"] != "" && details["pincode"] != "" && details["address"] != "") {
        window.scrollTo({ top: submitbtnref.current.offsetTop - 400, behavior: 'smooth' });
        setproceedcolor(true);
      }
      else {
        alert("fill all the required fields to proceed");
      }
    }
  }
  function gotopayment() {
    if (details["fname"] != "" && details["lname"] != "" && details["mobile"] != "" && details["email"] != "" && details["state"] != "" && details["pincode"] != "" && details["address"] != "") {
      navigate(`/trains/results/trainBooking/Payment?FirstName="${details["fname"]}"&Email="${details["email"]}"&amount=${(faree + ((faree * 12) / 100))}`);
    }
    else {
      alert("fill the form first");
    }
  }
  // function increasearrsize() {
  //   const variable = [...arr];
  //   variable.push(variable[variable.length - 1] + 1)
  //   setarr(variable)
  // }

  const [activenav, setactivenav] = useState({ "flights": true });


  function activenavmaker(key) {
    setactivenav({});
    setactivenav((prev) => ({ ...prev, [key]: !activenav[key] }))
  }

  return (
    <>
      <div className='bookingconfirmationpage'>
        <div className='flexja flexc mainBody'>
          <div className='navheaderBookingPage flex'>
            <div className='flexa'>
              <Link to={"/"}>
                <img src="//imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/logo@2x.png" alt="MMT's LOGO" />
              </Link>
            </div>
            <div className='navleftmenu flexa cp'>
              <NavLink to="/"><span className={`${activenav["flights"] ? "activecolor" : ""} flexja flexc`} onClick={() => { activenavmaker("flights") }}>{!activenav["flights"] ? <img src='/flights.png' /> : <img src='/flightsblue.png' />}<p className='flexja'><a>Flights</a></p></span></NavLink>
              <NavLink to="/hotels"><span className={`${activenav["hotels"] ? "activecolor" : ""} flexja flexc`} onClick={() => { activenavmaker("hotels") }}>{!activenav["hotels"] ? <img src='/hotels.png' className='icons' /> : <img src='/hotelblue.png' />}<p className='flexja'><a>Hotels</a></p></span></NavLink>
              <NavLink to="/trains"><span className={`${activenav["trains"] ? "activecolor" : ""} flexja flexc`} onClick={() => { activenavmaker("trains") }}>{!activenav["trains"] ? <img src='/trains.png' className='icons' /> : <img src='/trainblue.png' />}<p className='flexja'><a>Trains</a></p></span></NavLink>
            </div>
          </div>
          <div className='backgroundddd bgBooking flexja flexc'>
            <div className='bg-gradiantt flightBg'>
              <h3 className='completeBooking'>Select Travellers</h3>
            </div>
            <div className='bookingCard flex'>
              <div className='bookingcardLeft'>
                <div className='bookingcontainerL fullWrapDetails'>
                  <div className='flex wrapInfoTrain'>
                    <div className='flexc'>
                      <h3>{trainNamee}</h3>
                      <p>#{trainNumberr}</p>
                    </div>
                    <div className='flexc g10'>
                      <p>{departureTimee}</p>
                      <h4>{travelDurationn}</h4>
                    </div>
                    <div className=''>{sourcee}</div>
                    <div className='flexc g10'>
                      <p>{arrivalTimee}</p>
                      <h4>{destinationn}</h4>
                    </div>
                  </div>

                  <div className='wrapInfoTrain flex'>
                    <div className='flexc g10'>
                      <h5>Availability Status</h5>
                      <div className='constainerAvail flex g20 b1'>
                        <h4>{coachTypee}</h4>
                        <p>AVAILABLE - {numberOfSeatss}</p>
                      </div>
                    </div>

                    <div className='flexc g10'>
                      <h5>Your Boarding Station</h5>
                      <div className='constainerAvail flex g20 b1'>
                        <p>{travelDurationn} - {departureTimee}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='travellerssDetails '>
                    <h3>Traveller Details</h3>
                    <div className='idText'><strong>Important:</strong> Enter name as mentioned on your password or Government approved IDs.</div>
                    {/* <button onClick={() => increasearrsize()}>Add Traveller</button> */}
                    {arr.map(item => (<div className='mapForm'>
                      <div className='adult1'>Adult {item}</div>
                      <div className='travellerssDetailsInput flexc'>
                        <div className='flex wrapNameDetails'>
                          <div className='flexc'>
                            <label htmlFor='text'>First Name </label>
                            <input onChange={(e) => { detailsChanger("fname", e.target.value) }} value={details["fname"]} type='text' placeholder='Enter Name*' required />
                          </div>
                          <div className='flexc'>
                            <label htmlFor='text'>Last Name</label>
                            <input onChange={(e) => { detailsChanger("lname", e.target.value) }} value={details["lname"]} type='text' placeholder='Enter Last Name*' required />
                          </div>
                          <div className=' genderdiv flexa'>
                            <input onClick={() => { setgenderselector(true) }} type='text' placeholder='Male' className={`${genderselector ? 'colorinputactive' : ""}`} required readOnly />
                            <input onClick={() => { setgenderselector(false) }} type='text' placeholder='Female' className={`${genderselector ? '' : "colorinputactive"}`} required readOnly />
                          </div>
                        </div>
                        <div className='flex wrapNameDetails'>
                        <div className='flexc'>
                            <label htmlFor='mobile_number'>Mobile No</label>
                            <input type='tel' id='mobile_number' onChange={(e) => { handlePhoneChange(e), validatePhone(e) }} value={details["mobile"]} onKeyDown={handleKeyDown} placeholder='Enter 10 Digits*' required />
                            {phoneError && <span style={{ color: 'red' }}>{phoneError}</span>}
                          </div>
                          <div className='flexc'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' id='email' onChange={(e) => { detailsChanger("email", e.target.value), validateEmail() }} value={details["email"]} placeholder='Enter Email*' required />
                            {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
                          </div>
                        </div>
                      </div>
                    </div>))}
                  </div>
                </div>
                <div className='PinCodeAndState'>
                  <h3>Your Pincode and State</h3>
                  <div className='pinCodeInput flex g20'>
                  <div className='flexc'>
                      <label htmlFor=''>Pincode</label>
                      <input onChange={handlePincodeChange} value={details["pincode"]} type='pincode' placeholder='Enter 6 Digits*' onKeyDown={handleKeyDown} required />
                      {pincodeError && <div style={{ color: 'red' }}>{pincodeError}</div>}
                    </div>
                    <div className='flexc'>
                      <label htmlFor="stateSelect">Select State</label>
                      <select id="stateSelect" value={details["state"]} onChange={handleStateChanger}>
                        <option value="">Select a state</option>
                        {stateNames.map((state, index) => (
                          <option key={index} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <div className='flexc'>
                      <label htmlFor=''>Address</label>
                      <input onChange={(e) => { detailsChanger("address", e.target.value) }} value={details["address"]} type='Address' placeholder='Enter your Adress*' required />
                    </div>
                  </div>
                </div>
                <button onClick={() => { target() }} className='submitform'>Submit</button>
              </div>

              <div className='bookingcardRight flexa flexc'>
                <div className='bookingcontainerR'>
                  <h3>Fare Summary</h3>
                  <div className='flex baseFare'>
                    <h5>Base Fare</h5>
                    <p>₹ {faree}</p>
                  </div>
                  <div className='flex taxSurcharge'>
                    <h5>Extra Charges</h5>
                    <p>₹ {(faree * 12) / 100}</p>
                  </div>
                  <div className='flex totalA '>
                    <h4>Total Amount</h4>
                    <h4>₹ {(faree + ((faree * 12) / 100))}</h4>
                  </div>
                </div>
                <div className='clickToPay flexj'>
                  <button ref={submitbtnref} onClick={() => { gotopayment() }} >Proceed</button>

                </div>
                {proceedcolor && <p>Click proceed to furture process</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}













{/* <div className=' genderdiv flexa'>
  <input onClick={() => { setgenderselector(true) }} type='text' placeholder='Male' className={`${genderselector ? 'colorinputactive' : ""}`} required readOnly />
  <input onClick={() => { setgenderselector(false) }} type='text' placeholder='Female' className={`${genderselector ? '' : "colorinputactive"}`} required readOnly />
</div> */}








