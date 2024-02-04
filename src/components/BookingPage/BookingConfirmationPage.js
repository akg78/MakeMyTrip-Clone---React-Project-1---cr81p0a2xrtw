import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, NavLink, useLocation, Link } from 'react-router-dom';
import "./BookingConfirmPage.css"
import { FaUserCircle } from "react-icons/fa";
import { getValue } from '@mui/system';

export default function BookingConfirmationPage() {
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
    if (details["fname"] && details["lname"] && details["mobile"] && details["email"] && details["pincode"] && details["state"] && details["address"]) {
      navigate(`/flights/results/flightBooking/Payment?FirstName="${details["fname"]}"&Email="${details["email"]}"&amount=${(dataa.ticketPrice + ((dataa.ticketPrice * 12) / 100))}`);
    }
    else {
      alert("fill the form first");
    }
  }
  function increasearrsize() {
    const variable = [...arr];
    variable.push(variable[variable.length - 1] + 1)
    setarr(variable)
  }
  console.log(genderselector);

  const objdropdowncity = [{ name: "BLR", fname: "Bangalore", lname: "- Kempegowda International Airport (BLR)" },
  { name: "BOM", fname: "Mumbai", lname: "- Chatrapati Shivaji Airport (BOM)" },
  { name: "DEL", fname: "New Delhi", lname: "- Indira Gandhi Airport (DEL)" },
  { name: "CCU", fname: "Kolkata", lname: "- Netaji Subhas Chandra Bose Airport (CCU)" },
  { name: "GOI", fname: "Goa", lname: "- Dabolim Airport (GOI)" },
  { name: "HYD", fname: "Hyderabad", lname: "- Rajiv Gandhi International (HYD)" },
  { name: "MAA", fname: "Chennai", lname: "- Chennai Airport (MAA)" },];
  
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
  const [logoflights, setlogoflights] = useState([
    "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/6E.svg", "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/SG.svg",
    "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/I5.svg", "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/UK.svg",
    "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/AI.svg", "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/QP.svg",
    "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/S5.svg"
  ])

  const [dataa, setdataa] = useState();
  const [activenav, setactivenav] = useState({ "flights": true });


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
              <NavLink to="/trains"><span className={`${activenav["trains"] ? "activecolor" : ""} flexja flexc`} onClick={() => { activenavmaker("trains") }}>{!activenav["trains"] ? <img src='/trains.png' /> : <img src='/trainsblue.png' />}<p className='flexja'><a >Trains</a></p></span></NavLink>
              <NavLink to="/bus"><span className={`${activenav["bus"] ? "activecolor" : ""} flexja flexc`} onClick={() => { activenavmaker("bus") }}>{!activenav["bus"] ? <img src='/bus.png' /> : <img src='/busblue.png' />}<p className='flexja'><a>Buses</a></p></span></NavLink>
            </div>
          </div>
          <div className='backgroundddd flexja flexc'>
            <div className='bg-gradiantt'></div>

            <div className='bookingCard flex'>
              <div className='bookingcardLeft '>
                <div className='bookingcontainerL'>
                  <div className='cardupper flex jsb'>
                    <div className='cardupperleft flex flexc g10'>
                      <h3 className='flexa g5'>
                        {objdropdowncity.map((item) => (<h3>{item.name == dataa.source ? item.fname : ""} </h3>))}
                        {">"}
                        {objdropdowncity.map((item) => (<h3>{item.name == dataa.destination ? item.fname : ""}</h3>))}
                      </h3>
                      <div><span>{days[dateObject.getDay()]},{months[dateObject.getMonth()]} {dateObject.getDate()}</span> {dataa.stops == 0 ? "Non Stop" : `${dataa.stops} stops`} {dataa.duration}h0m</div>
                      <div className='flexa g10'><img src={logofinder(dataa)} /> {airlineNamefinder(dataa)} {dataa.flightID[0] + dataa.flightID[1]} {dataa.flightID[dataa.flightID.length - 5] + dataa.flightID[dataa.flightID.length - 3] + dataa.flightID[dataa.flightID.length - 2] + dataa.flightID[dataa.flightID.length - 1]}</div>
                    </div>
                    <div className='cardupperright flex flexc g10'>
                      <div className='flexja'>CANCELLATION FEES APPLY</div>
                      <div>Economy&nbsp;&#62;&nbsp;<span>SAVER</span> <icon /></div>
                    </div>
                  </div>
                  <div className='fromTo flexa '>
                    <div className='flex flexc jsb'>
                      <h3>{dataa.departureTime}</h3>
                      <h3>{dataa.arrivalTime}</h3>
                    </div>
                    <svg width="9" height="97" viewBox="0 0 9 97"><g fill="none" fill-rule="evenodd"><circle fill="#999" cx="4.5" cy="4.5" r="4.5"></circle><circle fill="#999" cx="4.5" cy="92.5" r="4.5"></circle><path stroke="#999" stroke-linecap="square" stroke-dasharray="7" d="M4.5 7v84"></path></g></svg>
                    <div className='flex flexc jsb'>
                      <div><h3>{objdropdowncity.map((item) => (<h3>{item.name == dataa.source ? item.fname : ""} </h3>))}</h3></div>
                      <div>0{dataa.duration}h 00m</div>
                      <div><h3>{objdropdowncity.map((item) => (<h3>{item.name == dataa.destination ? item.fname : ""}</h3>))}</h3></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='travellerssDetails'>
                    <h3>Traveller Details</h3>
                    <div className='idText'><strong>Important:</strong> Enter name as mentioned on your password or Government approved IDs.</div>
                    <button onClick={() => increasearrsize()}>Add Traveller</button>
                    {arr.map(item => (<div>
                      <div className='adult1'>Adult{item}</div>
                      <div className='travellerssDetailsInput flexa flexc'>
                        <div className='flexa g10'>
                          <input onChange={(e) => { detailsChanger("fname", e.target.value) }} value={details["fname"]} type='text' placeholder='First & Middle Name' required />
                          <input onChange={(e) => { detailsChanger("lname", e.target.value) }} value={details["lname"]} type='text' placeholder='Last Name' required />
                          <div className=' genderdiv flexa'>
                            <input onClick={() => { setgenderselector(true) }} type='text' placeholder='Male' className={`${genderselector ? 'colorinputactive' : ""}`} required readOnly />
                            <input onClick={() => { setgenderselector(false) }} type='text' placeholder='Female' className={`${genderselector ? '' : "colorinputactive"}`} required readOnly />
                          </div>
                        </div>
                        <div className='flexa g20'>
                          <label htmlFor='tel'>Mobile No
                            <input type='tel' onChange={(e) => { detailsChanger("mobile", e.target.value) }} value={details["mobile"]} placeholder='Mobile No(Optional)' required />
                          </label>
                          <label htmlFor='email'>Email
                            <input type='email' onChange={(e) => { detailsChanger("email", e.target.value) }} value={details["email"]} placeholder='Email(Optional)' required />
                          </label>
                        </div>
                      </div>
                    </div>))}
                  </div>
                </div>
                <div className='sentTo'>
                  <h5>Booking details will be sent to</h5>
                  <div className='senToLabels flex'>
                    <p>Mobile No</p>
                    <p>Email</p>
                  </div>
                  <input type='phone' />
                  <input type='email' />
                </div>
                <div className='PinCodeAndState'>
                  <h5>Your Pincode and State</h5>
                  <div className='pinCodeInput flex g20'>
                    <label htmlFor=''>Pincode
                      <input onChange={(e) => { detailsChanger("pincode", e.target.value); console.log(details) }} value={details["pincode"]} type='pincode' placeholder='Pincode' required />
                    </label>
                    <label htmlFor=''>State
                      <input onChange={(e) => { detailsChanger("state", e.target.value) }} value={details["state"]} type='state' placeholder='State' required />
                    </label>
                    <label htmlFor=''>Address
                      <input onChange={(e) => { detailsChanger("address", e.target.value) }} value={details["address"]} type='Address' placeholder='Address' required />
                    </label>
                  </div>
                </div>
                <button onClick={() => { target() }} className='submitform'>Submit</button>
              </div>

              <div className='bookingcardRight flexa flexc'>
                <div className='bookingcontainerR'>
                  <h2>Fare Summary</h2>
                  <div className='flex baseFare'>
                    <h5>Base Fare</h5>
                    <p>₹ {dataa.ticketPrice}</p>
                  </div>
                  <div className='flex taxSurcharge'>
                    <h5>Tax Surcharges</h5>
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







