import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "./SearchFlights.css"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { IoIosArrowDown } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import Calendar from 'react-calendar';






export default function SearchFlights() {
  const [filter, setfilter] = useState({ "6E": true, "SG": true, "I5": true, "UK": true, "AI": true, "QP": true, "S5": true, "stops": null });
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let source = searchParams.get("source");
  let destination = searchParams.get("destination");
  let from =searchParams.get("boxdatasearchdeparture")
  let adult = searchParams.get("adult");
  let child = searchParams.get("child");
  let infant = searchParams.get("infant");
  let dayOfWeek = searchParams.get("date");
  const dateObject = new Date(dayOfWeek);
  const [date, setDate] = useState(new Date());

const objdropdowncity = [{ name: "BLR", fname: "Bangalore, IN", lname: "- Kempegowda International Airport (BLR)" },
{ name: "BOM", fname: "Mumbai, IN", lname: "- Chatrapati Shivaji Airport (BOM)" },
{ name: "DEL", fname: "New Delhi, IN", lname: "- Indira Gandhi Airport (DEL)" },
{ name: "CCU", fname: "Kolkata, IN", lname: "- Netaji Subhas Chandra Bose Airport (CCU)" },
{ name: "GOI", fname: "Goa, IN", lname: "- Dabolim Airport (GOI)" },
{ name: "HYD", fname: "Hyderabad, IN", lname: "- Rajiv Gandhi International (HYD)" },
{ name: "MAA", fname: "Chennai, IN", lname: "- Chennai Airport (MAA)"},];



  const [logoflights, setlogoflights] = useState([
    "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/6E.svg", "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/SG.svg",
    "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/I5.svg", "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/UK.svg",
    "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/AI.svg", "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/QP.svg",
    "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/S5.svg"
  ])

  const [inputSearchh, setInputSearchh] = useState("");
  const [showlessandmore, setShowLessandmore] = useState(true);
  const [flightData, setFlightData] = useState();
  const [rangeprice, setrangeprice] = useState(3000);
  const [stopFromm, setstopFromm] = useState("");
  const [viewMorePop, setViewMorepop] = useState(true);
  const [sotedPrice, setSortedPrice] = useState("Cheapest")
  const [clickedSorted, setClickedSorted] = useState({ "cheapest": true });
  const [popUpIndex, setPopUpIndex] = useState(null);
  const [toggleText, setToggleText] = useState(true);
  const [sizeincreaser, setsizeincreaser] = useState({});
  const [popDetails, setPopDetails] = useState({});
  const [dataaa,setdataaa]=useState();
  const arrr = [0, 1, 2, 3, 4, 5, 6];
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [cityfrom,setcityfrom]=useState({"name": objdropdowncity.filter(item=>JSON.stringify(item.name)==source)[0].fname ,"iata_code": source});

  function fromCityChanger(city, iata_code){
    setcityfrom((prev)=> ({...prev,"name":city }))
    setcityfrom((prev)=>({...prev,"iata_code":iata_code}))
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

  function openViewMore(key, index) {
    setToggleText(true)
    setPopUpIndex(index);
    setViewMorepop(true);
    setViewMorepop((prev) => ({ ...prev, [key]: !viewMorePop[key] }));
  }
  const closeViewMore = () => {
    setViewMorepop(false);
  }



 async function Search() {
    const endpoint = `https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":""}`;
    
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
    
    useEffect(() => {
      fetchData();
      Search();
    }, [rangeprice, stopFromm])

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

  // function stopFrom(){
  //   setstopFromm()
  // }

  function popUp(key) {
    setPopDetails({});
    setPopDetails((prev) => ({ ...prev, [key]: !popDetails[key] }));
  }


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

  async function fetchData() {
    try {
      const res = await (await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":${source},"destination":${destination}}&day=${days[dateObject.getDay()]}&filter={"ticketPrice":{"$lte":${rangeprice}}${stopFromm != "" ? `,"stops":${stopFromm}` : ""}}`,
        {
          method: 'GET',
          headers: {
            projectID: "cr81p0a2xrtw",
          },
        })).json();
      setFlightData(res.data.flights)
    } catch (error) {
      console.error('Error fetching flight', error);
    }
  }

  const navigate = useNavigate();
  function clickToBook(flightID, item) {
    navigate(`/flights/results/flightBooking?flight_id=${flightID}&date=${dateObject}`)
  }

  return (
    <div className='flexa searchhhhhhhhhhh'>
      <div className='navheader flexa'>
        <div className='imggg flexa'><img src='/logo@2x.png' /></div>
        <div className='navList '>
          <div className='flex  imgSearchbar g20'>
            <span className={activenav["flights"] ? "activecolor" : ""} onClick={() => { activenavmaker("flights") }}>{!activenav["flights"] ? <img src='/flights.png' /> : <img src='/flightsblue.png' />}<p className='flexja'><a href='/flights'>Flights</a></p></span>
            <span className={activenav["hotels"] ? "activecolor" : ""} onClick={() => { activenavmaker("hotels") }}>{!activenav["hotels"] ? <img src='/hotels.png' className='icons' /> : <img src='/hotelblue.png' />}<p className='flexja'><a href='/hotels'>Hotels</a></p></span>
            <span className={activenav["trains"] ? "activecolor" : ""} onClick={() => { activenavmaker("trains") }}>{!activenav["trains"] ? <img src='/trains.png' /> : <img src='/trainsblue.png' />}<p className='flexja'><a href='/trains'>Trains</a></p></span>
            <span className={activenav["bus"] ? "activecolor" : ""} onClick={() => { activenavmaker("bus") }}>{!activenav["bus"] ? <img src='/bus.png' /> : <img src='/busblue.png' />}<p className='flexja'><a href='/bus'>Buses</a></p></span>
          </div>
        </div>
      </div>
      <div className='backgrounddd'>

        <div className='bg-gradiant'>
          <div className='b1 parentWrapDetails'>
            <div className='flex flexa g20 wrapDetails'>
              <div className='flexc wrapChildContainer g5' onClick={() => { popUp("detailsWrap") }}>
                <div>From</div>
                <div>{cityfrom.name}</div>
                {popDetails["detailsWrap"] && <div className='fromDetailsSearch'>
                  <input type='text' placeholder='Enter City' onClick={(e) => { e.stopPropagation(); }} value={inputSearchh} onChange={(e) => { setInputSearchh(e.target.value) }} />
                  {dataaa && console.log(dataaa) && dataaa.map((item, index) => (<div className='searchDetailSWrappop'>
                    <div><CiLocationOn /></div>

                    <div onClick={() => {fromCityChanger(item.city, item.iata_code)}}>{item.city}</div>
                  </div>))}
                </div>}
              </div>
              <div>icon</div>

              <div className='flexc wrapChildContainer g5' onClick={()=>{popUp("toDetailsWrap")}}>
                {popDetails["toDetailsWrap"] && <div className='toDetailsSearch'>
                  <input type='text' placeholder='Enter City' onClick={(e) => { e.stopPropagation(); }} value={inputSearchh} onChange={(e) => { setInputSearchh(e.target.value) }}/>
                  {flightData && flightData.map((item)=>(<div className='searchDetailSWrappop'>
                  <div><CiLocationOn /></div>
                  </div>))}
                  </div>}
                <div>TO</div>
                <div>BENGALURU</div>
              </div>
              <div className='flexc wrapChildContainer g5' onClick={()=>{popUp("departSearch")}}>
                {popDetails["departSearch"] &&  <Calendar className="calendarForGoing" minDate={new Date()} onChange={(date) => { setDate(date) }} value={date}/>}
                <div>DEPART</div>
                <div className='flex'><p>{dateObject.getDate()},</p><p>{days[dateObject.getDay()]}</p>, <p>{months[dateObject.getMonth()]}</p></div>

              </div>
              <div className='flexc wrapChildContainer g5' onClick={()=>{popUp("wrapPassangers")}}>
                {popDetails["wrapPassangers"] && <div className='wraPassanger'></div>}
                <div>PASSANGERS&CLASS</div>
                <div>{adult} Adult, economy</div>
              </div>
              <div >
                <button className='btn-wrap-container' onClick={()=>{}}>SEARCH</button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex'>
          <div className='filters flexc flexa'>

            <div className='priceSlider flexc'>
              <h3>One Way Price</h3>
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
              <h3>Stops From { }</h3>
              <label for="searchFlightsStops" className='flexc'>
                <div onClick={() => { setstopFromm("0") }}><input type='radio' id='earchFlightsStops' name='earchFlightsStops' /> Non Stop</div>
                <div onClick={() => { setstopFromm("1") }}><input type='radio' id='earchFlightsStops' name='earchFlightsStops' /> 1 Stop</div>
                <div onClick={() => { setstopFromm("2") }}><input type='radio' id='earchFlightsStops' name='earchFlightsStops' /> 2 Stop</div>
              </label>
            </div>
            <div className='departureCity flexc'>
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
            </div>
            <div className='airlines flexc flex g10'>
              <h3>Airlines</h3>
              <div className="filterstypeairline ">
                <label className='flexa' onClick={() => { airlineSelector("6E") }}>
                  <div><input type='checkbox' checked={filter["6E"]} /> IndiGo</div>
                  <div>₹ 11,197</div>
                </label>
                <label className='flexa' onClick={() => { airlineSelector("AI") }}>
                  <div><input type='checkbox' checked={filter["AI"]} />  Air India</div>
                  <div>₹ 9,247</div>
                </label>
                <label className='flexa' onClick={() => { airlineSelector("UK") }}>
                  <div><input type='checkbox' checked={filter["UK"]} /> Vistara</div>
                  <div>₹ 23,745</div>
                </label>
                <label className='flexa' onClick={() => { airlineSelector("SG") }}>
                  <div><input type='checkbox' checked={filter["SG"]} />SpiceJet</div>
                  <div>₹ 36,209</div>
                </label>
                <label className='flexa' onClick={() => { airlineSelector("I5") }}>
                  <div><input type='checkbox' checked={filter["I5"]} /> Air India Express</div>
                  <div>₹ 12,577</div>
                </label>
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
                    <h5>{item.duration}</h5>
                    <p>{item.stops}</p>
                  </div>
                  <div className='arrivalTime flexc flexja'>
                    <h3>{item.departureTime}</h3>
                    <p>{item.destination}</p>
                  </div>
                  <div className='pricefortickets'>
                    <h3>₹{item.ticketPrice}<br /></h3><p>per adult</p>
                  </div>
                  <button className='clicButtonnn cp'>SELECT</button>
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
                    <h6 className='durationofFlight'>{item.duration}</h6>
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

                <div className='showMoreDiv' onClick={() => { }}>
                  {viewMorePop["openpop"] && index === popUpIndex && (<div className='showPoppp'>

                  </div>)}
                  <p className='showMoreText ' onClick={() => { openView(`listingcarddiv${index}`) }}> {sizeincreaser[`listingcarddiv${index}`] ? "hide flight details" : "view flight details"}</p>

                </div>
              </div>
            ))))}
          </div>
        </div>
      </div>
    </div>
  )
}