import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, NavLink, useLocation, Link } from 'react-router-dom';
import "./BookingConfirmPage.css"

export default function BookingConfirmationPage() {

  const objdropdowncity = [{ name: "BLR", fname: "Bangalore", lname: "- Kempegowda International Airport (BLR)" },
  { name: "BOM", fname: "Mumbai", lname: "- Chatrapati Shivaji Airport (BOM)" },
  { name: "DEL", fname: "Delhi", lname: "- Indira Gandhi Airport (DEL)" },
  { name: "CCU", fname: "Kolkata", lname: "- Netaji Subhas Chandra Bose Airport (CCU)" },
  { name: "GOI", fname: "Goa", lname: "- Dabolim Airport (GOI)" },
  { name: "HYD", fname: "Hyderabad", lname: "- Rajiv Gandhi International (HYD)" },
  { name: "MAA", fname: "Chennai", lname: "- Chennai Airport (MAA)" },
  { name: "AMD", fname: "Ahmedabad", lname: "- Sardar Vallabhbhai Patel International Airport" },
  { name: "PNQ", fname: "Pune", lname: "- Pune Airport" },
  { name: "GAU", fname: "Guwahati", lname: "- Lokpriya Gopinath Bordoloi International Airport" },
  { name: "JAI", fname: "Jaipur", lname: "- Jaipur International Airport" },
  { name: "NAG", fname: "Nagpur", lname: "- Dr. Babasaheb Ambedkar International Airport" },
  { name: "COK", fname: "Kochi", lname: "- Cochin International Airport" },
  { name: "IXC", fname: "Chandigarh", lname: "- Chandigarh International Airport" },
  { name: "LKO", fname: "Lucknow", lname: "- Lucknow International Airport" },
  { name: "ATQ", fname: "Amritsar", lname: "- Amritsar International Airport " }];

  const [logoflights, setlogoflights] = useState([
    "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/6E.svg", "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/SG.svg",
    "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/I5.svg", "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/UK.svg",
    "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/AI.svg", "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/QP.svg",
    "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/S5.svg"
  ])

  const stateNames = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
    "Ladakh"
  ];

  const submitbtnref = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let flight_id = searchParams.get("flight_id");
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
  const [dataa, setdataa] = useState();
  const [activenav, setactivenav] = useState({ "flights": true });


  function detailsChanger(key, value) {
    setdetails((prev) => ({ ...prev, [key]: value }))

  }

  const validateName = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value) || value === '') {
      setdetails((prev) =>({...prev, "fname" : value}));
    }
  };

  const validatelName = (e)=>{
    const value = e.target.value;
    if(/^[a-zA-Z\s]*$/.test(value) || value === ''){
      setdetails((prev) =>({...prev, "lname" : value}))
    }
  }

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

    if (value.length != 10) {
      setPhoneError('Invalid phone number');
    } else {
      setPhoneError('');
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setdetails((prev) => ({ ...prev, "mobile": value }))
  }

  const handleKeyDown = (e) => {
    if (!(e.key === 'Backspace' || e.key === 'Delete' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Tab')) {
      if (!/\d/.test(e.key)) {
        e.preventDefault();

      }
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   validateEmail();
  //   validatePhone();

  //   if (!emailError && !phoneError) {
  //     console.log('Form submitted successfully!');
  //   }
  // }



  const handlePincodeChange = (event) => {
    const val = event.target.value;
    if (val.length <= 6) {
      setdetails((prev) => ({ ...prev, "pincode": val }));
      setPincodeError('');
    }
    if (val.length <= 5) {
      setPincodeError('Please enter a valid 6-digit pincode.');
    }

  };


  const handleStateChanger = (e) => {
    setdetails((prev) => ({ ...prev, "state": e.target.value }));

  }


  function target() {
    // validateEmail();
    // validatePhone();
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
    if (details["fname"] == "" || details["lname"] == "" || details["mobile"] == "" || details["email"] == "" || details["state"] == "" || details["pincode"] == "" || details["address"] == "") {
      alert("fill the form first");
    }
    else {
      navigate(`/flights/results/flightBooking/Payment?FirstName="${details["fname"]}"&Email="${details["email"]}"&amount=${(dataa.ticketPrice + ((dataa.ticketPrice * 12) / 100))}`);
    }
  }
  // function increasearrsize() {
  //   const variable = [...arr];
  //   variable.push(variable[variable.length - 1] + 1)
  //   setarr(variable)
  // }


  function logofinder(item) {
    if ((item.flightID[0] + item.flightID[1]) == "6E") { return logoflights[0]; }
    if ((item.flightID[0] + item.flightID[1]) == "SG") { return logoflights[1]; }
    if ((item.flightID[0] + item.flightID[1]) == "I5") { return logoflights[2]; }
    if ((item.flightID[0] + item.flightID[1]) == "UK") { return logoflights[3]; }
    if ((item.flightID[0] + item.flightID[1]) == "AI") { return logoflights[4]; }
    if ((item.flightID[0] + item.flightID[1]) == "QP") { return logoflights[5]; }
    if ((item.flightID[0] + item.flightID[1]) == "S5") { return logoflights[6]; }
  }

  function airlineNamefinder(item) {
    if ((item.flightID[0] + item.flightID[1]) == "6E") { return "IndiGo"; }
    if ((item.flightID[0] + item.flightID[1]) == "SG") { return "SpiceJet"; }
    if ((item.flightID[0] + item.flightID[1]) == "I5") { return "Air India Express"; }
    if ((item.flightID[0] + item.flightID[1]) == "UK") { return "Vistara"; }
    if ((item.flightID[0] + item.flightID[1]) == "AI") { return "Air India"; }
    if ((item.flightID[0] + item.flightID[1]) == "QP") { return "Akasa Air"; }
    if ((item.flightID[0] + item.flightID[1]) == "S5") { return "Star Air"; }
  }




  function activenavmaker(key) {
    setactivenav({});
    setactivenav((prev) => ({ ...prev, [key]: !activenav[key] }))
  }

  async function fetchData() {
    try {
      const response = await (await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight/${flight_id}`,
        {
          method: "GET",
          headers: {
            projectID: "cr81p0a2xrtw",
          },
        })).json();
      setdataa(response.data)
    } catch (error) {
      console.error('Error fetching flight', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      {dataa && <div className='bookingconfirmationpage'>
        <div className='flexja flexc mainBody'>
          <div className='navheaderBookingPage flex'>
            <div className='flexa'>
              <Link to={"/"}>
                <img src="//imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/logo@2x.png" alt="MMT's LOGO" />
              </Link>
            </div>
            <div className='navleftmenu flexa g20 cp'>
              <NavLink to="/"><span className={`${activenav["flights"] ? "activecolor" : ""} flexja flexc`} onClick={() => { activenavmaker("flights") }}>{!activenav["flights"] ? <img src='/flights.png' /> : <img src='/flightsblue.png' />}<p className='flexja'><a>Flights</a></p></span></NavLink>
              <NavLink to="/hotels"><span className={`${activenav["hotels"] ? "activecolor" : ""} flexja flexc`} onClick={() => { activenavmaker("hotels") }}>{!activenav["hotels"] ? <img src='/hotels.png' className='icons' /> : <img src='/hotelblue.png' />}<p className='flexja'><a>Hotels</a></p></span></NavLink>
              <NavLink to="/trains"><span className={`${activenav["trains"] ? "activecolor" : ""} flexja flexc`} onClick={() => { activenavmaker("trains") }}>{!activenav["trains"] ? <img src='/trains.png' className='icons' /> : <img src='/trainblue.png' />}<p className='flexja'><a>Trains</a></p></span></NavLink>

            </div>
          </div>
          <div className='backgroundddd bgBooking flexja flexc'>
            <div className='bg-gradiantt flightBg'>
              <h3 className='completeBooking'>Complete your booking</h3>
            </div>

            <div className='bookingCard flex'>
              <div className='bookingcardLeft'>
                <div className='bookingcontainerL'>
                  <div className='cardupper flex jsb '>
                    <div className='cardupperleft flex flexc g10'>
                      <h3 className='flexa g5'>
                        {objdropdowncity.map((item) => (<h3>{item.name == dataa.source ? item.fname : ""} </h3>))}
                        {">"}
                        {objdropdowncity.map((item) => (<h3>{item.name == dataa.destination ? item.fname : ""}</h3>))}
                      </h3>
                      <div className='bookingDt'><span>{days[dateObject.getDay()]}, {months[dateObject.getMonth()]} {dateObject.getDate()}</span> {dataa.stops == 0 ? "Non Stop" : `${dataa.stops} stops`} 0{dataa.duration}h 0m</div>
                      <div className='flexa g10 bookingFlightlogo'><img src={logofinder(dataa)} /> {airlineNamefinder(dataa)} {dataa.flightID[0] + dataa.flightID[1]} {dataa.flightID[dataa.flightID.length - 5] + dataa.flightID[dataa.flightID.length - 3] + dataa.flightID[dataa.flightID.length - 2] + dataa.flightID[dataa.flightID.length - 1]}</div>
                    </div>
                    <div className='cardupperright flex flexc g10'>
                      <div className='flexja'>CANCELLATION FEES APPLY</div>
                      <div>Economy&nbsp;&#62;&nbsp;<span>SAVER</span> <icon /></div>
                    </div>
                  </div>
                  <div className='fromTo flexa '>
                    <div className='flex flexc jsb bookingTime '>
                      <h3>{dataa.departureTime}</h3>
                      <h3>{dataa.arrivalTime}</h3>
                    </div>
                    <div className='lineBooking'><svg width="9" height="97" viewBox="0 0 9 97"><g fill="none" fill-rule="evenodd"><circle fill="#999" cx="4.5" cy="4.5" r="4.5"></circle><circle fill="#999" cx="4.5" cy="92.5" r="4.5"></circle><path stroke="#999" stroke-linecap="square" stroke-dasharray="7" d="M4.5 7v84"></path></g></svg></div>
                    <div className='flex flexc jsb bookingCity' >
                      <div><h3>{objdropdowncity.map((item) => (<h3>{item.name == dataa.source ? item.fname : ""} </h3>))}</h3></div>
                      <div>0{dataa.duration}h 00m</div>
                      <div><h3>{objdropdowncity.map((item) => (<h3>{item.name == dataa.destination ? item.fname : ""}</h3>))}</h3></div>
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
                            <input onChange={(e) => { detailsChanger("fname", e.target.value), validateName(e)  }} value={details["fname"]} type='text' placeholder='Enter Name*' required />
                          </div>
                          <div className='flexc'>
                            <label htmlFor='text'>Last Name</label>
                            <input onChange={(e) => { detailsChanger("lname", e.target.value), validatelName(e) }} value={details["lname"]} type='text' placeholder='Enter Last Name*' required />
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
                      <input onChange={(e) => { handlePincodeChange(e) }} value={details["pincode"]} type='pincode' placeholder='Enter 6 Digits*' onKeyDown={handleKeyDown} required />
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
                    <p>₹ {dataa.ticketPrice}</p>
                  </div>
                  <div className='flex taxSurcharge'>
                    <h5>Tax and Surcharges</h5>
                    <p>₹ {(dataa.ticketPrice * 12) / 100}</p>
                  </div>
                  <div className='flex totalA '>
                    <h4>Total Amount</h4>
                    <h4>₹ {(dataa.ticketPrice + ((dataa.ticketPrice * 12) / 100))}</h4>
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
      </div>}
    </>
  )
}













{/* <div className=' genderdiv flexa'>
  <input onClick={() => { setgenderselector(true) }} type='text' placeholder='Male' className={`${genderselector ? 'colorinputactive' : ""}`} required readOnly />
  <input onClick={() => { setgenderselector(false) }} type='text' placeholder='Female' className={`${genderselector ? '' : "colorinputactive"}`} required readOnly />
</div> */}








