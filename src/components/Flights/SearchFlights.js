import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "./SearchFlights.css"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { CiLocationOn } from "react-icons/ci";
import Calendar from 'react-calendar';
import { TbArrowsExchange } from "react-icons/tb";
import { NavLink } from 'react-router-dom';
import Login from '../Auth/login';
import Register from '../Auth/register';
import { IoIosArrowDown } from "react-icons/io";


export default function SearchFlights() {

  const objdropdowncity = [{ name: "AMD", fname: "Ahmedabad" },
  { name: "BLR", fname: "Bangalore" },
  { name: "BOM", fname: "Mumbai" },
  { name: "DEL", fname: "Delhi" },
  { name: "CCU", fname: "Kolkata" },
  { name: "GOI", fname: "Goa" },
  { name: "HYD", fname: "Hyderabad" },
  { name: "MAA", fname: "Chennai" },
  { name: "AMD", fname: "Ahmedabad" },
  { name: "PNQ", fname: "Pune" },
  { name: "GAU", fname: "Guwahati" },
  { name: "JAI", fname: "Jaipur" },
  { name: "NAG", fname: "Nagpur" },
  { name: "COK", fname: "Kochi" },
  { name: "IXC", fname: "Chandigarh" },
  { name: "LKO", fname: "Lucknow" },
  { name: "ATQ", fname: "Amritsar" }];


  const [logoflights, setlogoflights] = useState([
    "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/6E.svg", "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/SG.svg",
    "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/I5.svg", "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/UK.svg",
    "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/AI.svg", "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/QP.svg",
    "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/S5.svg"
  ])

  function airlineNamefinder(item) {
    if ((item.flightID[0] + item.flightID[1]) == "6E") { return "IndiGo"; }
    if ((item.flightID[0] + item.flightID[1]) == "SG") { return "SpiceJet"; }
    if ((item.flightID[0] + item.flightID[1]) == "I5") { return "Air India Express"; }
    if ((item.flightID[0] + item.flightID[1]) == "UK") { return "Vistara"; }
    if ((item.flightID[0] + item.flightID[1]) == "AI") { return "Air India"; }
    if ((item.flightID[0] + item.flightID[1]) == "QP") { return "Akasa Air"; }
    if ((item.flightID[0] + item.flightID[1]) == "S5") { return "Star Air"; }
    if ((item.flightID[0] + item.flightID[1]) == "G8") { return "Go Air"; }
  }
  function logofinder(item) {
    if ((item.flightID[0] + item.flightID[1]) == "6E") { return logoflights[0]; }
    if ((item.flightID[0] + item.flightID[1]) == "SG") { return logoflights[1]; }
    if ((item.flightID[0] + item.flightID[1]) == "I5") { return logoflights[2]; }
    if ((item.flightID[0] + item.flightID[1]) == "UK") { return logoflights[3]; }
    if ((item.flightID[0] + item.flightID[1]) == "AI") { return logoflights[4]; }
    if ((item.flightID[0] + item.flightID[1]) == "QP") { return logoflights[5]; }
    if ((item.flightID[0] + item.flightID[1]) == "S5") { return logoflights[6]; }
    if ((item.flightID[0] + item.flightID[1]) == "G8") { return logoflights[6]; }
  }





  const [filter, setfilter] = useState({ "6E": true, "SG": true, "I5": true, "UK": true, "AI": true, "QP": true, "S5": true, "stops": null });
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let source = searchParams.get("source");
  let destination = searchParams.get("destination");
  let adult = searchParams.get("adult");
  let child = searchParams.get("child");
  let infant = searchParams.get("infant");
  let dayOfWeek = searchParams.get("date");
  const dateObject = new Date(dayOfWeek);
  const [date, setDate] = useState(new Date());
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [inputSearchh, setInputSearchh] = useState("");
  const [flightData, setFlightData] = useState();
  const [rangeprice, setrangeprice] = useState(3000);
  const [stopFromm, setstopFromm] = useState("");
  const [viewMorePop, setViewMorepop] = useState(true);
  const [sotedPrice, setSortedPrice] = useState("Cheapest")
  const [clickedSorted, setClickedSorted] = useState({ "cheapest": true });
  const [popUpIndex, setPopUpIndex] = useState(null);
  const [sizeincreaser, setsizeincreaser] = useState({});
  const [popDetails, setPopDetails] = useState({});
  const [dataaa, setdataaa] = useState();
  const arrr = [0, 1, 2, 3, 4, 5, 6]; const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [adultselect, setadultselect] = useState(`adultarget${adult}`)
  const [childselect, setachildselect] = useState(`childtarget${child}`)
  const [infantselect, setinfantselect] = useState(`infanttarget${infant}`)
  const [cityfrom, setcityfrom] = useState();
  const [cityto, setcityto] = useState();
  const [isButtonClicked, setISButtonClicked] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  // const [boxdatasearchdeparture, setboxdatasearchdeparture] = useState({ "city": "Kolkata", "country": "India", "iata_code": "CCU", "name": "Netaji Subhas Chandra Bose International Airport" })
  // const [departureTo, setDepartureTo] = useState({ "city": "Delhi", "country": "India", "iata_code": "DEL", "name": "Indira Gandhi International Airport" })

  useEffect(() => {
    const selectCityFrom = objdropdowncity.find(item => item.name === location.state.srcfrom);
    const selectCityTo = objdropdowncity.find(item => item.name === location.state.srcto);
    setcityfrom({ "name": selectCityFrom.fname, "iata_code": source });
    setcityto({ "name": selectCityTo.fname, "iata_code": destination });
    // console.log("abc",selectCityFrom,selectCityTo)
  }, [])


  function adultvaluechanger(item) {
    setadultselect(`adultarget${item}`)

  }
  function childvaluechanger(item) {
    setachildselect(`childtarget${item}`)
  }
  function infantvaluechanger(item) {
    setinfantselect(`infanttarget${item}`)
  }


  const handleClick = () => {
    setISButtonClicked(true);
  }

  function fromCityChanger(city, iata_code) {
    setcityfrom((prev) => ({ ...prev, "name": city }))
    setcityfrom((prev) => ({ ...prev, "iata_code": iata_code }))
  }
  function toCityChanger(city, iata_code) {
    setcityto((prev) => ({ ...prev, "name": city }))
    setcityto((prev) => ({ ...prev, "iata_code": iata_code }))
  }

  const cabinBaggage = "7 kg";
  const checkInBaggage = "20 kg";

  function openView(key) {
    setsizeincreaser({})
    setsizeincreaser((prev) => ({ ...prev, [key]: !sizeincreaser[key] }))
  }
  function handleSubmitSorted(key) {
    setClickedSorted({});
    setClickedSorted((prev) => ({ ...prev, [key]: true }))
  }


  function navigatetonextpage() {
    if (cityfrom.name != cityto.name)
      navigate(`/flights/results?source=${cityfrom.iata_code}&destination=${cityto.iata_code}&date="${date}"&adult=${adultselect[adultselect.length - 1]}&child=${childselect[childselect.length - 1]}&infant=${infantselect[infantselect.length - 1]}`)
  }



  async function Search() {
    const endpoint = `https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city": "${inputSearchh}"}`;

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          projectID: "cr81p0a2xrtw",
        },
      })
      const res = await response.json();
      setdataaa(res.data.airports)
      // console.log(res);
    } catch (error) {
      console.error('Error fetching flight', error);
    }
  }


  function airlineSelector(key) {
    setTimeout(() => {
      setfilter((prev) => ({ ...prev, [key]: !filter[key] }));
    }, 10);
  }

  const [activenav, setactivenav] = useState({ "flights": true });
  function activenavmaker(key) {
    setactivenav({});
    setactivenav((prev) => ({ ...prev, [key]: !activenav[key] }))
  }


  function popUp(key) {
    setPopDetails({});
    setPopDetails((prev) => ({ ...prev, [key]: !popDetails[key] }));
  }


  function sorting(value) {
    if (clickedSorted["cheapest"]) {
      return value.sort((a, b) => a.ticketPrice - b.ticketPrice);
    }
    else if (clickedSorted["nonStop"]) {
      return value.sort((a, b) => a.stops - b.stops);
    }
    else if (clickedSorted["prefer"]) {
      return value;
    }
  }

  async function fetchData() {
    try {
      const res = await (await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":${source},"destination":${destination}}&day=${days[dateObject.getDay()]}&filter={"ticketPrice":{"$lte":${rangeprice}}${stopFromm != "" ? `,"stops":${stopFromm}` : ""}}`,
        {
          method: 'GET',
          headers: {
            projectID: "cr81p0a2xrtw",
          },
        })).json();
      setFlightData(sorting(res.data.flights))
      // console.log(data.flights)

    } catch (error) {
      // console.error('Error fetching flight', error);
    }
  }

  useEffect(() => {
    fetchData();
    Search();
  }, [rangeprice, stopFromm, clickedSorted])



  useEffect(() => {
    if (token) {
      setShowSignUp(false)
    } else {
      setShowSignUp(false)
    }
  }, [])

  function handleUser() {
    if (token) {
      setShowSignIn(!showSignIn);
    } else {
      setShowSignUp(true);
    }
  }




  const navigate = useNavigate();
  function clickToBook(flightID, item) {
    if (token) {
      navigate(`/flights/results/flightBooking?flight_id=${flightID}&date=${dateObject}`)
    } else {
      setShowSignUp(true);
    }

  }

  return (
    <>{cityfrom && cityto &&
      <div className='flexa searchhhhhhhhhhh'>
        <div className='hello'>{showSignUp && <Login token={token} setToken={setToken} showSignUp={showSignUp} setShowSignUp={setShowSignUp} />}</div>
        <div>{showSignIn && <Register token={token} setToken={setToken} showSignIn={showSignIn} setShowSignIn={setShowSignIn} />}</div>
        {showSignUp && <div className='popLogin'></div>}
        <div className='navheader flexja'>
          <nav className='flexa flexjsb'>
            <div className='navinner flexja'>
              <a href='/'><img className='logoimg cp' src='/logo@2x.png' /></a>
              <div className='navleftmenu flex g20 cp'>
                <NavLink to="/"><span className={`${activenav["flights"] ? "activecolor" : ""} flexja flexc`} onClick={() => { activenavmaker("flights") }}>{!activenav["flights"] ? <img src='/flights.png' /> : <img src='/flightsblue.png' />}<p className='flexja'><a>Flights</a></p></span></NavLink>
                <NavLink to="/hotels"><span className={`${activenav["hotels"] ? "activecolor" : ""} flexja flexc`} onClick={() => { activenavmaker("hotels") }}>{!activenav["hotels"] ? <img src='/hotels.png' className='icons' /> : <img src='/hotelblue.png' />}<p className='flexja'><a>Hotels</a></p></span></NavLink>
                <NavLink to="/trains"><span className={`${activenav["trains"] ? "activecolor" : ""} flexja flexc`} onClick={() => { activenavmaker("trains") }}>{!activenav["trains"] ? <img src='/trains.png' className='icons' /> : <img src='/trainblue.png' />}<p className='flexja'><a>Trains</a></p></span></NavLink>

              </div>
            </div>
            <div className='my-login cp g10 navWrap' onClick={() => { handleUser() }} style={{ backgroundImage: !token ? "linear-gradient(93deg, #53b2fe, #065af3)" : "none", color: "black" }}>

              {/* <p>{localStorage.getItem("name") ? `Hi ${JSON.parse(localStorage.getItem("name"))}` : "Login or Create Account"} </p> <IoIosArrowDown /> */}
            </div>
          </nav>

        </div>
        <div className='backgrounddd'>

          <div className='bg-gradiant flex'>
            <div className='flex flexa g10 wrapDetails'>
              <div className='flexc wrapChildContainer g5' onClick={() => { popUp("detailsWrap") }}>
                <div>From</div>
                <div>{cityfrom.name}</div>
                {popDetails["detailsWrap"] && <div className='fromDetailsSearch'>
                  <input type='text' placeholder='Enter City' onClick={(e) => { e.stopPropagation(); }} value={inputSearchh} onChange={(e) => { setInputSearchh(e.target.value) }} />
                  {dataaa && dataaa.map((item, index) => (<div className='searchDetailSWrappop flex g5' onClick={() => { fromCityChanger(item.city, item.iata_code) }}>
                    <div><CiLocationOn /></div>

                    <div>{item.city}</div>
                  </div>))}
                </div>}
              </div>
              <div>
                <TbArrowsExchange className='swapp cp' />
              </div>

              <div className='flexc wrapChildContainer g5' onClick={() => { popUp("toDetailsWrap") }}>
                {popDetails["toDetailsWrap"] && <div className='toDetailsSearch'>
                  <input type='text' placeholder='Enter City' onClick={(e) => { e.stopPropagation(); }} value={inputSearchh} onChange={(e) => { setInputSearchh(e.target.value) }} />
                  {dataaa && dataaa.map((item) => (<div className='searchDetailSWrappop flex g5' onClick={() => { toCityChanger(item.city, item.iata_code) }}>
                    <div><CiLocationOn /></div>
                    <div>{item.city}</div>
                  </div>))}
                </div>}
                <div>TO</div>
                <div>{cityto.name}</div>
              </div>
              <div className='flexc wrapChildContainer g5' onClick={() => { popUp("departSearch") }}>
                {popDetails["departSearch"] && <Calendar className="calendarForGoing" minDate={new Date()} onChange={(date) => { setDate(date) }} value={date} />}
                <div>DEPART</div>
                <div className='flexa flex g10 dateFlightsDetails'><h4 className='flex'>{date.getDate()}</h4>{months[date.getMonth()]}'{date.getFullYear()} <p className='flex'>{daysOfWeek[date.getDay()]}</p></div>


              </div>
              <div className='flexc wrapChildContainer g5' onClick={() => { popUp("wrapPassangers") }}>
                <div>PASSANGERS&CLASS</div>
                <div><h5>{(+adultselect[adultselect.length - 1]) + (+childselect[childselect.length - 1]) + (+infantselect[infantselect.length - 1])}</h5></div>
                {popDetails["wrapPassangers"] &&
                  <div onClick={(e) => { e.stopPropagation(); }} className='popupdivtraveller flexc g10'>
                    <div className='g10 flexc cp'>
                      <div className='textadult'>ADULTS (12y+)</div>
                      <div className='textadultdown'>on the day of travel</div>
                      <div className='flex mapbox mapboxone' onClick={() => { handleClick }}>
                        {arr.map((item) => (<div className={`boxesAdult ${adultselect == `adultarget${item}` ? "activeboxesadult" : ""} flexja`} onClick={() => { adultvaluechanger(item); }}>{item}</div>))}
                      </div>
                    </div>
                    <div className='flex childInfant cp'>
                      <div className='g10 flexc'>
                        <div className='textchild'>CHILDREN (2y - 12y )</div>
                        <div className='textchilddown'>on the day of travel</div>
                        <div className='flex mapbox mapboxtwo'>
                          {arrr.map((item) => (<div className={`boxesAdult ${childselect == `childtarget${item}` ? "activeboxesadult" : ""} flexja`} onClick={() => { childvaluechanger(item); }}>{item}</div>))}
                        </div>
                      </div>
                      <div className='g10 flexc cp'>
                        <div className='textchild'>INFANTS (below 2y)</div>
                        <div className='textchilddown'>on the day of travel</div>
                        <div className='flex mapbox mapboxthree'>
                          {arrr.map((item) => (<div className={`boxesAdult ${infantselect == `infanttarget${item}` ? "activeboxesadult" : ""} flexja`} onClick={() => { infantvaluechanger(item); }}>{item}</div>))}
                        </div>
                      </div>
                    </div>
                    <button className='passengerbuttonsubmit cp' onClick={() => { popUp("wrapPassangers") }}>submit</button>
                  </div>
                }
              </div>
              <div >
                <button className='btn-wrap-container cp' onClick={() => { navigatetonextpage(); fetchData() }}>SEARCH</button>
              </div>
            </div>
          </div>
          <div className='flex wrapFlightsBody'>
            <div className='filters flexc flexa'>

              <div className='priceSlider flexc'>
                <h4>One Way Price</h4>
                <Box sx={{ width: 250 }}>
                  <Slider
                    size="large"
                    value={rangeprice}
                    aria-label="Small"
                    min={1000}
                    max={3000}
                    valueLabelDisplay="auto"
                    onChange={(e) => { setrangeprice(e.target.value) }}
                  />
                </Box>
                <div className='flexr flex wayPrice'>
                  <p>₹1,000</p>
                  <p>₹3,000</p>
                </div>
              </div>
              <div className='stops flexc'>
                <h4>Stops From {cityfrom.name}</h4>
                <label htmlFor="searchFlightsStops" className='flexc cp '>
                  <div onClick={() => { setstopFromm("0") }}><input type='radio' id='earchFlightsStops' name='earchFlightsStops' /> Non Stop</div>
                  <div onClick={() => { setstopFromm("1") }}><input type='radio' id='earchFlightsStops' name='earchFlightsStops' /> 1 Stop</div>
                  <div onClick={() => { setstopFromm("2") }}><input type='radio' id='earchFlightsStops' name='earchFlightsStops' /> 2 Stop</div>
                </label>
              </div>
              <div className='airlines flexc flex'>
                <h4>Airlines</h4>
                <div className="filterstypeairline">
                  <label className='flexa labelFlights' onClick={() => { airlineSelector("6E") }}>
                    <div className='flex'><input type='checkbox' checked={filter["6E"]} /> <p className='airlineSpace'>IndiGo</p></div>
                    <div>₹ 2,500</div>
                  </label>
                  <label className='flexa labelFlights' onClick={() => { airlineSelector("AI") }}>
                    <div className='flex'><input type='checkbox' checked={filter["AI"]} /> <p className='airlineSpace'>Air India</p></div>
                    <div>₹ 2,300</div>
                  </label>
                  <label className='flexa labelFlights' onClick={() => { airlineSelector("UK") }}>
                    <div className='flex'><input type='checkbox' checked={filter["UK"]} /> <p className='airlineSpace'>Vistara</p></div>
                    <div>₹ 2,250</div>
                  </label>
                  <label className='flexa labelFlights' onClick={() => { airlineSelector("SG") }}>
                    <div className='flex'><input type='checkbox' checked={filter["SG"]} /> <p className='airlineSpace'>SpiceJet</p></div>
                    <div>₹ 2,480</div>
                  </label>
                  {/* <label className='flexa labelFlights' onClick={() => { airlineSelector("I5") }}>
                  <div className='flex'><input type='checkbox' checked={filter["I5"]} /> <p className='airlineSpace'>Air India Express</p></div>
                  <div>₹ 12,577</div>
                </label> */}
                </div>
              </div>
            </div>
            <div className='rightbodycarddiv flexja flexc g20'>
              <div className='flightSorted flexr flexa' >
                <div className={`cheapest flexr g10 ${clickedSorted["cheapest"] ? "colorsOfSorted" : ""}`} onClick={() => { setSortedPrice("Cheapest"); handleSubmitSorted("cheapest") }}>
                  <div className='cheapest-box'><img src='https://imgak.mmtcdn.com/flights/assets/media/dt/listing/Cheapest.png' /></div>
                  <div className='flexc flexj cheapestDetails' >
                    <h4>Cheapest</h4>
                    <div className='flexr g20'>
                      <p>₹ 5,623</p>
                      <p>Duration: 02 h 15 m</p>
                    </div>
                  </div>
                </div>
                <div className={`nonStop flexr g10 ${clickedSorted["nonStop"] ? "colorsOfSorted" : ""}`} onClick={() => { setSortedPrice("nonStop"); handleSubmitSorted("nonStop") }}>
                  <div className='cheapest-box'><img src='https://imgak.mmtcdn.com/flights/assets/media/dt/listing/Fastest.png' /></div>
                  <div className='flexc flexj cheapestDetails' >
                    <h4>Non Stop First</h4>
                    <div className='flexr g20'>
                      <p>₹ 5,623 </p>
                      <p> Duration: 02 h 15 m</p>
                    </div>
                  </div>
                </div>
                <div className={`prefer flexr g10 ${clickedSorted["prefer"] ? "colorsOfSorted" : ""}`} onClick={() => { setSortedPrice("prefer"); handleSubmitSorted("prefer") }}>
                  <div className='cheapest-box'><img src='https://imgak.mmtcdn.com/flights/assets/media/dt/listing/Popular.png' /></div>
                  <div className='flexc flexj cheapestDetails' >
                    <h4>You May Prefer</h4>
                    <div className='flexr g20'>
                      <p>₹ 5,623</p>
                      <p>Duration: 02 h 15 m</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* {flightData.length == 0 && <div className='flex flexja'>Flights are not available for this route!</div>} */}
              {flightData && (flightData.map((item, index) => (filter[`${item.flightID[0]}${item.flightID[1]}`] && (
                <div className={`listingCard ${sizeincreaser[`listingcarddiv${index}`] ? "sizeincreaser" : ""}`} >
                  <div className='listingCardupper flexa'>
                    <div className='divListCard flexja g10'>
                      <img src={logofinder(item)} alt='img' className='listingImg' />
                      <div className='flexa g5 flexc'>
                        <h4>{airlineNamefinder(item)}</h4>
                        <p>{`${item.flightID[0]}${item.flightID[1]}-${item.flightID[item.flightID.length - 3] + item.flightID[item.flightID.length - 2] + item.flightID[item.flightID.length - 1]}`}</p>
                      </div>
                    </div>
                    <div className='deparTime '>
                      <h3>{item.arrivalTime}</h3>
                      <p>{item.source}</p>
                    </div>
                    <div className='timeduration flexc flexja'>
                      <h5>0{item.duration} h 00 m</h5>
                      <p>{item.stops} Stop</p>
                    </div>
                    <div className='arrivalTime flexc flexja'>
                      <h3>{item.departureTime}</h3>
                      <p>{item.destination}</p>
                    </div>
                    <div className='pricefortickets'>
                      <h3>₹{item.ticketPrice}<br /></h3><p>per adult</p>
                    </div>
                    <button className='clicButtonnn cp' onClick={() => clickToBook(item._id, item)}>BOOK NOW</button>
                  </div>
                  <div className={`${sizeincreaser[`listingcarddiv${index}`] ? "sizeincreaserinnerdiv flexc flex" : "display"}`}>

                    <div className='flex flightNameandId g10'>
                      <img src={logofinder(item)} />
                      <h6>{airlineNamefinder(item)}</h6>
                      <p>{`${item.flightID[0]}${item.flightID[1]}-${item.flightID[item.flightID.length - 3] + item.flightID[item.flightID.length - 2] + item.flightID[item.flightID.length - 1]}`}</p>
                    </div>

                    <div className='flexr flex boardingContainer b1 flexa flexc'>
                      <div className='flex flexc infoFlight'>
                        <h4>{item.arrivalTime}</h4>
                        <p>{days[dateObject.getDay()]},{dateObject.getDate()}{months[dateObject.getMonth()]},{dateObject.getFullYear()}</p>
                        <p>{item.source}</p>
                      </div>
                      <div className='flexc durationofFlight g5'>
                        <h6 className='stopss'>0{item.duration} h 00 m</h6>
                        <p className='stopsss'>{item.stops} Stop</p>
                      </div>

                      <div className='flex flexc infoFlight'>
                        <h4>{item.departureTime}</h4>
                        <p>{days[dateObject.getDay()]},{dateObject.getDate()}{months[dateObject.getMonth()]},{dateObject.getFullYear()}</p>
                        <p>{item.destination}</p>
                      </div>
                      <div className='flex luggage'>
                        <div className='luggageChild'>
                          <h4>BAGGAGE:</h4>
                          <p>Adult</p>
                        </div>
                        <div className='luggageChild'>
                          <h4>CHECK IN</h4>
                          <p>{checkInBaggage}</p>
                        </div>
                        <div className='luggageChild'>
                          <h4>CABIN</h4>
                          <p>{cabinBaggage}</p>
                        </div>
                      </div>
                    </div>
                    <button className='bookNowbtn flexja cp' onClick={() => clickToBook(item._id, item)}>Book Now</button>
                  </div>

                  <div className='showMoreDiv'>
                    {viewMorePop["openpop"] && index === popUpIndex && (<div className='showPoppp'>

                    </div>)}
                    <p className='showMoreText ' onClick={() => { openView(`listingcarddiv${index}`) }}> {sizeincreaser[`listingcarddiv${index}`] ? "Hide Flight Details" : "View Flight Details"}</p>
                  </div>
                </div>
              ))))}
            </div>
          </div>
        </div>
      </div>
    }</>
  )
}





{/* <div className='departureCity flexc'>
              <h3>Departure From { }</h3>
              <div className='departureTime flex flexa'>
                <div><img src='https://imgak.mmtcdn.com/flights/assets/media/dt/listing/left-filters/morning_inactive.png?v=1' />
                  <p className=''>Before 6 AM</p></div>
                <div><img src='https://imgak.mmtcdn.com/flights/assets/media/dt/listing/left-filters/noon_inactive.png?v=1' />
                  <p className=''>6 AM - 12 PM</p></div>
                <div><img src='https://imgak.mmtcdn.com/flights/assets/media/dt/listing/left-filters/evening_inactive.png?v=1' />
                  <p className=''>6 AM - 12 PM</p></div>
                <div><img src='https://imgak.mmtcdn.com/flights/assets/media/dt/listing/left-filters/night_inactive.png?v=1' />
                  <p className=''>After 6 PM</p></div>
              </div>
            </div> */}