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
  let dayOfWeek = searchParams.get("date");
  let returnDate = searchParams.get("returndate");
  const dateObject = new Date(dayOfWeek);
  const [date, setDate] = useState(dateObject);
  let dateObjReturnDate = new Date(returnDate)
  const [dateReturn, setDateReturn] = useState(dateObjReturnDate);
  let hotel_id = searchParams.get("hotel_id");
  let number = searchParams.get("number");

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
  const [guests, setguests] = useState({ "room": 1, "adults": 1, "children": 0 });
  const [guestspopcount, setguestspopcount] = useState({ "room": false, "adults": false, "children": false });
  const [guestss, setguestss] = useState(guests["adults"] + guests["children"]);
  const [room, setroom] = useState(guests["room"]);
  const [hotels, setHotels] = useState([]);



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
            <div className='navleftmenu flexa cp'>
              <NavLink to="/"><span className={`${activenav["flights"] ? "activecolor" : ""} flexja flexc`} onClick={() => { activenavmaker("flights") }}>{!activenav["flights"] ? <img src='/flights.png' /> : <img src='/flightsblue.png' />}<p className='flexja'><a>Flights</a></p></span></NavLink>
              <NavLink to="/hotels"><span className={`${activenav["hotels"] ? "activecolor" : ""} flexja flexc`} onClick={() => { activenavmaker("hotels") }}>{!activenav["hotels"] ? <img src='/hotels.png' className='icons' /> : <img src='/hotelblue.png' />}<p className='flexja'><a>Hotels</a></p></span></NavLink>
              <NavLink to="/trains"><span className={`${activenav["trains"] ? "activecolor" : ""} flexja flexc`} onClick={() => { activenavmaker("trains") }}>{!activenav["trains"] ? <img src='/trains.png' className='icons' /> : <img src='/trainblue.png' />}<p className='flexja'><a>Trains</a></p></span></NavLink>
            </div>
          </div>
          <div className='backgroundddd flexja flexc'>
            <div className='bg-gradiantt flightBg'></div>

            <div className='bookingCard flex'>
              <div className='bookingcardLeft '>
                <div className='bookingcontainerL'>
                  <h3>{name} {">"} {locationn}</h3>
                  <div className='flex flexa bookingCheckIN'>
                    <div className='flexc flex chekinBooking g5'>
                      <h4>CHECK IN</h4>
                      <div className='flex g5'>
                        <p>{date.getDate()},</p> <p>{months[date.getMonth()]}</p> <p>{[date.getFullYear()]}</p>
                      </div>
                      {/* <div>{date.getHours()}h: {date.getMinutes()}m</div> */}
                    </div>
                    <div className='flexc flex checkOutBooking g5'>
                      <h4>CHECK OUT</h4>
                      <div className='flex g5 dateBook'>
                        <p>{dateReturn.getDate()},</p><p>{months[dateReturn.getMonth()]}</p><p>{[dateReturn.getFullYear()]}</p>
                      </div>
                      {/* <div>{Math.floor(dateObject.getHours() * 1.1)}h: {dateObject.getMinutes() * 1}m</div> */}
                    </div>
                    <div className='flex flex adultBooking g10'>
                      <h4>Guest</h4>
                      <p>{guests["room"]}</p>
                      {guestspopcount["room"] && <div className='flex flexc popguests'>{counting.map((item) => (<div className='flexja' onClick={() => guestsmanage("room", item)}>{item}</div>))}</div>}
                      <h4>Rooms</h4>
                      <p>{guests["adults"]}</p>
                      {guestspopcount["adults"] && <div className='flex flexc popguests'>{counting.map((item) => (<div className='flexja' onClick={() => guestsmanage("adults", item)}>{item}</div>))}</div>}

                    </div>
                  </div>
                </div>

                <div>
                  <div className='travellerssDetails '>
                    <h3>Traveller Details</h3>
                    <div className='idText'><strong>Important:</strong> Enter name as mentioned on your password or Government approved IDs.</div>
                    <button onClick={() => increasearrsize()}>Add Traveller</button>
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
                            <input type='tel' id='mobile_number' onChange={(e) => { detailsChanger("mobile", e.target.value) }} value={details["mobile"]} placeholder='Enter 10 Digits*' required />
                          </div>
                          <div className='flexc'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' id='email' onChange={(e) => { detailsChanger("email", e.target.value) }} value={details["email"]} placeholder='Enter Email*' required />
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
                      <input onChange={(e) => { detailsChanger("pincode", e.target.value); console.log(details) }} value={details["pincode"]} type='pincode' placeholder='Enter 6 Digits*' required />
                    </div>
                    <div className='flexc'>
                      <label htmlFor=''>State</label>
                      <input onChange={(e) => { detailsChanger("state", e.target.value) }} value={details["state"]} type='state' placeholder='Enter your State*' required />
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







