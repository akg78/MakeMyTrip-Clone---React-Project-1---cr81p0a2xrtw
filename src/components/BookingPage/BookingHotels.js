import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, NavLink, useLocation, Link } from 'react-router-dom';
import "./BookingHotels.css"
import { FaUserCircle } from "react-icons/fa";
import { getValue } from '@mui/system';

export default function BookingConfirmationPage() {
  const submitbtnref = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let hotel_id = searchParams.get("hotel_id");
  let number = searchParams.get("number");
  let dayOfWeek = searchParams.get("date");
  const dateObject = new Date(dayOfWeek);
  const [name, setname] = useState();
  const [locationn, setlocationn] = useState();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todayDate = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  const [arr, setarr] = useState([1]);
  const [genderselector, setgenderselector] = useState(true);
  const [details, setdetails] = useState({ "fname": "", "lname": "", "mobile": "", "email": "", "state": "", "pincode": "", "address": "" });
  const [proceedcolor, setproceedcolor] = useState(false);
  const [dataa, setdataa] = useState();
  const [activenav, setactivenav] = useState({ "flights": true });

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
      navigate(`/flights/results/flightBooking/Payment?FirstName="${details["fname"]}"&Email="${details["email"]}"&amount=${(dataa[0].price + ((dataa[0].price * 12) / 100))}`);
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


  function activenavmaker(key) {
    setactivenav({});
    setactivenav((prev) => ({ ...prev, [key]: !activenav[key] }))
  }

  async function fetchData() {
    try {
      const response = await (await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${hotel_id}`,
        {
          method: "GET",
          headers: {
            projectID: "cr81p0a2xrtw",
          },
        })).json();
      setdataa(response.data.rooms.filter(item => item.roomNumber == number));
      setname(response.data.name);
      setlocationn(response.data.location);
    } catch (error) {
      console.error('Error fetching flight', error);
    }
  }
  // console.log(locationn)
  // console.log(dataa);

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
                  <h3>{name} {">"} {locationn}</h3>
                  <div className='flex flexa bookingCheckIN'>
                    <div className='flexc flex chekinBooking g5'>
                      <div>CHECK IN</div>
                      <div className='flex'><p>{todayDate[dateObject.getDate()]},</p> <p>{days[dateObject.getDay()]}</p> <p>{months[dateObject.getMonth()]}</p></div>
                      <div>{dateObject.getHours()}h: {dateObject.getMinutes()}m</div>
                    </div>
                    <div className='flexc flex checkOutBooking g5'>
                      <div>CHECK OUT</div>
                      <div className='flex'><p>{todayDate[dateObject.getDate()]},</p> <p>{days[dateObject.getDay()]}</p> <p>{months[dateObject.getMonth()]}</p></div>
                      <div>{Math.floor(dateObject.getHours()*1.1)}h: {dateObject.getMinutes()*5}m</div>
                    </div>
                    <div className='flex flex adultBooking'>
                      <div>adult child</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className='travellerssDetails'>
                    <h3>Guest Details</h3>
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
                    <p>₹ {dataa[0].price}</p>
                  </div>
                  <div className='flex taxSurcharge'>
                    <h5>Tax Surcharges</h5>
                    <p>₹ {(dataa[0].price * 12) / 100}</p>
                  </div>
                  <div className='flex totalA '>
                    <h4>Total Amount</h4>
                    <h4>₹ {(dataa[0].price + ((dataa[0].price * 12) / 100))}</h4>
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






