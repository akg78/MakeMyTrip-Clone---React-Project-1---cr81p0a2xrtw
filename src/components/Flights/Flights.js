import './flights.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import OffersCarousel from './OffersCarousel';
import Bottom from '../Bottoms/Bottom';
import { Search } from "./SearchPanel";
import { IoIosArrowDown } from "react-icons/io";
import Calendar from 'react-calendar';
import { TbArrowsExchange } from "react-icons/tb";

export default function Flights() {
  const [pop, setpop] = useState({});
  const [fares, setfares] = useState("");
  const [ways, setways] = useState("");
  const [dataa, setdataa] = useState();
  const [inputvalue, setinputvalue] = useState("");
  const [inputvaluetwo, setInputvaluetwo] = useState("");
  const [boxdatasearchdeparture, setboxdatasearchdeparture] = useState({ "city": "Kolkata", "country": "India", "iata_code": "CCU", "name": "Netaji Subhas Chandra Bose International Airport" })
  const [departureTo, setDepartureTo] = useState({ "city": "Delhi", "country": "India", "iata_code": "DEL", "name": "Indira Gandhi International Airport" })
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const arrr = [0, 1, 2, 3, 4, 5, 6];
  const [date, setDate] = useState(new Date())
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [isButtonClicked, setISButtonClicked] = useState(false);
  const [adultselect,setadultselect]=useState("adultarget1")
  const [childselect,setachildselect]=useState("childtarget0")
  const [infantselect,setinfantselect]=useState("infanttarget0")


  function adultvaluechanger(item){
    setadultselect(`adultarget${item}`)

  }
  function childvaluechanger(item){
    setachildselect(`childtarget${item}`)
  }
  function infantvaluechanger(item){
    setinfantselect(`infanttarget${item}`)
  }

  const handleSwap =()=>{
    const temp = boxdatasearchdeparture.city;
    const temp1 = boxdatasearchdeparture.name;
    const temp2 = boxdatasearchdeparture.iata_code;
    setboxdatasearchdeparture({["city"] : departureTo.city, ["name"] : departureTo.name, ["iata_code"] : departureTo.iata_code});
    setDepartureTo({["city"] : temp , ["name"] : temp1 , ["iata_code"] : temp2});
  }

  const handleClick = () => {
    setISButtonClicked(true);
  }
  function popp(key) {
    setpop({});
    setpop((prev) => ({ ...prev, [key]: !pop[key] }));
  }
  useEffect(() => {
    Search(setdataa, inputvalue);
    Search(setdataa, inputvaluetwo);
  }, [inputvalue, inputvaluetwo])

  const navigate = useNavigate();

  function clickToSearch() {
    navigate(`/flights/results?source="${boxdatasearchdeparture.iata_code}"&destination="${departureTo.iata_code}"&date="${date}"&adult=${adultselect[adultselect.length-1]}&child=${childselect[childselect.length-1]}&infant=${infantselect[infantselect.length-1]}`)
  }
  return (
    <div className='flexa flexc'>
      <div className='flightsMainDiv flexa flexc'>
        <div className='tickets'>
          <div className='ticketType'>
            <label for="ways">
              <span className='oneWay'><input type='radio' name='ways' onClick={() => { setways("oneway") }} /> One Way</span>
              <span className='roundTrip'><input type='radio' name='ways' onClick={() => { setways("roundTrip") }} /> Round Trip</span>
              <span className='multiCity'><input type='radio' name='ways' onClick={() => { setways("multiCity") }} /> Multi City</span>
            </label>
            <p className='book'>Book International and Domestic Flights</p>
          </div>

          <div className='flight-search'>
            <div className='flight-from' onClick={() => { popp("departure") }}>
              <span>From</span>
              <h1>{boxdatasearchdeparture.city}</h1>
              <span className='text-wrapppp'>{boxdatasearchdeparture.iata_code},{boxdatasearchdeparture.name}</span>
              {pop["departure"] && <div className='departurePop'>
                <input type='text' placeholder='Search City' onClick={(e) => { e.stopPropagation(); }} value={inputvalue} onChange={(e) => { setinputvalue(e.target.value) }} />
                {dataa && dataa.map((item) => (<div className='flexa popupslide' onClick={() => { setboxdatasearchdeparture({ "city": item.city, "country": item.country, "iata_code": item.iata_code, "name": item.name }) }}>
                  <div className='flexja popupimg'><img class="icLocAlt appendRight8" src="https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/ic-flight-onward.png" alt="icon"></img></div>
                  <div className='flexj flexc popupslidecity'>
                    <div>{item.city}, {item.country}</div>
                    <div className='airname'>{item.name}</div>
                  </div>
                  <div className='flexja popcode'>{item.iata_code}</div>
                </div>))}
              </div>}
            </div>
            
            <span className='swap flexja' onClick={()=>{handleSwap()}}>
              <TbArrowsExchange className='swapp'  />
            </span>

            <div className='flight-to' onClick={() => { popp("to") }}>
              <span>To</span>
              <h1>{departureTo.city}</h1>
              <span>{departureTo.iata_code}, {departureTo.name}</span>
              {pop["to"] && <div className='toPop'>
                <input type='text' placeholder='Search City' onClick={(e) => { e.stopPropagation(); }} value={inputvaluetwo} onChange={(e) => { setInputvaluetwo(e.target.value) }} />
                {dataa && dataa.map((item) => (<div className='flexa popto' on onClick={() => { setDepartureTo({ "city": item.city, "country": item.country, "iata_code": item.iata_code, "name": item.name }) }}>
                  <div className='flexja popimg'><img className='icLocAlt' src='https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/ic-flight-onward.png' alt='icon'></img></div>
                  <div className='flexj flexc popcity'>
                    <div>{item.city}, {item.country}</div>
                    <div className='airname'>{item.name}</div>
                  </div>
                  <div className='flexja popcode'>{item.iata_code}</div>
                </div>))}
              </div>}
            </div>

            <div className='calander' onClick={() => { popp("cl") }}>

              <IoIosArrowDown className='arow' />{pop["cl"] && <Calendar className="calendarForGoing " minDate={new Date()} onChange={(date) => { setDate(date) }} value={date} />}
              <p>Departure</p>
              <span className='flexa g5 dateP'><h1>{date.getDate()}</h1><p className='fullYear'>{months[date.getMonth()]}'{date.getFullYear()}</p></span>
              <p className='datePP'>{daysOfWeek[date.getDay()]}</p>
            </div>


            <div className='return'><IoIosArrowDown className='arow' />
              <p>Return</p>
              <p className='tap'>Tap to add a return date for bigger discounts</p>

            </div>
            <div className='travellers' ><IoIosArrowDown className='arow' />
              <div onClick={() => { popp("traveller") }}>
                <p className='travellerss'>Travellers& Class</p>
                <div className='one  flex flexa'><h1>{(+adultselect[adultselect.length-1])+(+childselect[childselect.length-1])+(+infantselect[infantselect.length-1])}</h1><p className='tra'>Traveller</p></div>
                <p className='econo'>Economy/Premium Economy</p>
              </div>
              {pop["traveller"] &&
                <div className='popupdivtraveller flexc g10 cp'> 
                  <div className='g10 flexc'>
                    <div className='textadult'>ADULTS (12y+)</div>
                    <div className='textadultdown'>on the day of travel</div>
                    <div className='flex mapbox mapboxone' onClick={handleClick}>
                      {arr.map((item) => (<div className={`boxesAdult ${adultselect==`adultarget${item}`?"activeboxesadult":""} flexja`} onClick={()=>{adultvaluechanger(item);}}>{item}</div>))}
                    </div>
                  </div>
                  <div className='flex childInfant'>
                    <div className='g10 flexc'>
                      <div className='textchild'>CHILDREN (2y - 12y )</div>
                      <div className='textchilddown'>on the day of travel</div>
                      <div className='flex mapbox mapboxtwo'>
                        {arrr.map((item) => (<div className={`boxesAdult ${childselect==`childtarget${item}`?"activeboxesadult":""} flexja`} onClick={()=>{childvaluechanger(item);}}>{item}</div>))}
                      </div>
                    </div>
                    <div className='g10 flexc'>
                      <div className='textchild'>INFANTS (below 2y)</div>
                      <div className='textchilddown'>on the day of travel</div>
                      <div className='flex mapbox mapboxthree'>
                        {arrr.map((item) => (<div className={`boxesAdult ${infantselect==`infanttarget${item}`?"activeboxesadult":""} flexja`} onClick={()=>{infantvaluechanger(item);}}>{item}</div>))}
                      </div>
                    </div>
                  </div>
                  <button className='passengerbuttonsubmit' onClick={()=>{popp("traveller")}}>submit</button>
                </div>}
            </div>
          </div>

          <div className='fare-search'>
            <span className='fare-select'>Select A<br />Fare Type:</span>
            <label className='type' for="fares">
              <div className='fare flexja'><input type='radio' name='fares' value={fares} onClick={() => { setfares("regular") }} /><div>Regular<br />Fares</div></div>
              <div className='fare flexja'><input type='radio' name='fares' value={fares} onClick={() => { setfares("armed_force") }} /><div>Armed Forces <br />Fares</div></div>
              <div className='fare flexja'><input type='radio' name='fares' value={fares} onClick={() => { setfares("student") }} /><div>Student<br />Fares</div></div>
              <div className='fare flexja'><input type='radio' name='fares' value={fares} onClick={() => { setfares("senior_citizen") }} /><div>Senior Citizen<br />Fares</div></div>
              <div className='fare flexja'><input type='radio' name='fares' value={fares} onClick={() => { setfares("doctors&nurses") }} /><div>Doctors&Nurses<br />Fares</div></div>
              <div className='fare flexja'><input type='radio' name='fares' value={fares} onClick={() => { setfares("double_seat") }} /><div>Double Seat<br />Fares</div></div>
            </label>
          </div>
          <div className='search-button flexja' onClick={() => clickToSearch()}>
            SEARCH
          </div>
          <div className='chooseFrom flexja'>
            <div className='flexr bannerr'>
              <div className='bannerrr flex flexa g10'>
                <img src='https://promos.makemytrip.com/appfest/2x/icon-wheretogo-23062022.png' />
                <p className='where'>Where2Go</p>
              </div>
              <div className='bannerrr flex flexa g10'>
                <img src='https://promos.makemytrip.com/appfest/2x/trip-money-1.png' />
                <p className='where'>Explore International Flights <br /> Cheapest Flights to Paris, Bali, Tokoyo&more</p>
              </div>
              <div className='bannerrr flex flexa g10'>
                <img src='https://promos.makemytrip.com/Growth/Images/B2C/2x/dt_tert_flights.png' />
                <p className='where'>Insurance <br />For International Trips</p>
              </div>
              <div className='bannerrr flex flexa g10'>
                <img src='https://promos.makemytrip.com/images/myBiz/MICE/mice%20icon%20-%20square.png' />
                <p className='where'>MICE <br /> Offsites, Events&Meetings</p>
              </div>
              <div className='bannerrr flex flexa g10'>
                <img src='https://promos.makemytrip.com/appfest/2x/gift%20card%201.png' />
                <p className='where'>Gift Cards</p>
              </div>
            </div>

            <div className='sponsored'>
              <img src='https://platforms.makemytrip.com/contents/894b250d-94cd-4c5f-bb72-da4711d36708' alt='img' className='thai'></img>
              <p><img src='https://platforms.makemytrip.com/contents/8db292f3-fd5a-448c-9f2a-58c78e10f56c' className='s'></img></p>
            </div>
          </div>
        </div>
      </div>

       <OffersCarousel />
      <Bottom />
    </div>

  )
}

