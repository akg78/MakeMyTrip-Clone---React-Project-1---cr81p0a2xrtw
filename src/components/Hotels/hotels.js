import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import "./hotels.css"
import { IoIosArrowDown } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import Calendar from 'react-calendar';
import OffersCarousel from '../Flights/OffersCarousel';
import Bottom from '../Bottoms/Bottom';

export default function () {
  const navigate = useNavigate();

  const [offerData, setOfferData] = useState([])
  const [visibleOffer, setVisibleOffer] = useState("")
  const [isClicked, setIsClicked] = useState({ "hotels": true })

  function clickedOfferNav(key) {
    setIsClicked({})
    setIsClicked((prev) => ({ ...prev, [key]: true }))
  }
  const handleSubmit = async (data) => {
    // console.log(offerData)
    try {
      const response = await (await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"${data}"}&limit=50`,
        {
          method: "GET",
          headers: {
            projectID: "cr81p0a2xrtw",
            "Content-Type": "application/json",
          },
        }
      )).json();
      setOfferData(response.data.offers)
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    handleSubmit("HOTELS");
  }, [])


  // ----------------------------------------OfferCrousel Part Over---------------------------------------------------


  const [ways, setways] = useState("");
  const [searchCityPop, setSearchCityPop] = useState({ hotelPop: false });
  const [citySearch, setCitySearch] = useState({});
  const [inputvall, setInputVall] = useState("");
  const [dplocation, setdplocation] = useState("Kolkata");
  const [hotelData, setHotelData] = useState([]);
  const [date, setDate] = useState(new Date())
  const [dateReturn, setDateReturn] = useState(new Date())
  const [guests, setguests] = useState({ "room": 1, "adults": 1, "children": 0 });
  const [guestspopcount, setguestspopcount] = useState({});
  const [room, setroom] = useState(guests["room"]);
  const [guestss, setguestss] = useState(guests["adults"] + guests["children"]);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const counting = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

  function guestscoutntpop(key) {
    setguestspopcount({});
    setguestspopcount((prev) => ({ ...prev, [key]: !guestspopcount[key] }))
  }
  function guestsmanage(key, value) {
    setguests((prev) => ({ ...prev, [key]: value }));
  }
  function hotelPop(key) {
    setSearchCityPop({ hotelPop: key });
    setSearchCityPop((prev) => ({ ...prev, [key]: !searchCityPop[key] }));
  }

  function navigatetonextpage() {
    navigate(`/hotels/results?location=${dplocation}&date=${date}&returndate=${dateReturn}&room=${guests["room"]}&adults=${guests["adults"]}&children=${guests["children"]}`);
  }

  const hotelSubmit = useMemo(async (data) => {
    try {
      const response = await (await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${inputvall}"}`,
        {
          method: "GET",
          headers: {
            projectId: "cr81p0a2xrtw",
            "content-type": "application/json",
          },
        }
      )).json();
      setHotelData(response.data.hotels)
    } catch (error) {
      alert(error);
    }
  }, [inputvall])

  useEffect(() => {
    hotelSubmit;
  }, [])


  return (
    <div className='hotelsMainDiv flexj'>
      <div className='hotelBookingPanel'>
        <div className='upto'>
          <p className='bookk'>Book Domestic and International Property Online. To list your property <a href='https://www.makemytrip.com/hotels/hotelier-register.htm'>Click Here</a></p>
        </div>

        <div className='hotels-panel'>
          <div className='search-city' onClick={() => { hotelPop("hotelpop") }}>
            <span>City, Property Name, or Location</span>
            <h1>{dplocation}</h1>
            <span>India</span>
            {searchCityPop["hotelpop"] && (
              <div className='hotelpopup'>
                <input
                  type='text'
                  placeholder='Where do you want to stay?'
                  onClick={(e) => { e.stopPropagation(); }}
                  value={inputvall}
                  onChange={(e) => { setInputVall(e.target.value) }}
                />
                {/* Filter out duplicate search names */}
                {hotelData && [...new Set(hotelData.map(item => item.location.split(',')[0]))].map((location, index) => (
                  <div key={index} className='flexa hotelSlide g10' onClick={() => { setCitySearch({ "city": location }) }}>
                    <div><CiLocationOn /></div>
                    <div className={`hotelcity${index}`} onClick={() => { setdplocation(location) }}>{location}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className='check-In' onClick={() => { hotelPop("check-Inn") }}>
            {searchCityPop["check-Inn"] && <Calendar className="calendarForCheckIn" minDate={new Date()} onChange={(date) => { setDate(date) }} value={date} />}
            <span className='fw'>Check-In</span><IoIosArrowDown className='arrow' />
            <p className='flexa g20'><h1>{date.getDate()}</h1>{months[date.getMonth()]}'{date.getFullYear()}</p>
            <p className='dayyy'>{daysOfWeek[date.getDay()]}</p>
          </div>

          <div className='check-Out' onClick={() => { hotelPop("check-Outt") }}>
            <div className='flex'> {searchCityPop["check-Outt"] && <Calendar className="calendarForCheckOut" minDate={date} onChange={(e) => { setDateReturn(e) }} value={dateReturn} />}
              <span className='fw'>Check-Out</span><IoIosArrowDown className='arrow' />
            </div>
            <p className='flexa g20'><h1>{dateReturn.getDate()}</h1>{months[dateReturn.getMonth()]}'{dateReturn.getFullYear()}</p>
            <p className='dayyy'>{daysOfWeek[dateReturn.getDay()]}</p>
          </div>

          <div className='rooms-guest flexa' onClick={() => { hotelPop("room-guests") }}>
            {searchCityPop["room-guests"] && <div className='roomandGuests flex flexc g20'>
              <div className='flex flexjsb'>
                <h4>Rooms</h4>
                <span className='flexa flexjsb' onClick={(e) => { guestscoutntpop('room'); e.stopPropagation() }}>
                  <p>{guests["room"]}</p>
                  {guestspopcount["room"] && <div className='flex flexc popguests'>{counting.map((item) => (<div className='flexja' onClick={() => guestsmanage("room", item)}>{item}</div>))}</div>}
                </span>
              </div>
              <div className='flex flexjsb'>
                <h4>Adults</h4>
                <span className='flexa flexjsb' onClick={(e) => { guestscoutntpop('adults'); e.stopPropagation() }}>
                  <p>{guests["adults"]}</p>
                  {guestspopcount["adults"] && <div className='flex flexc popguests'>{counting.map((item) => (<div className='flexja' onClick={() => guestsmanage("adults", item)}>{item}</div>))}</div>}
                </span>
              </div>
              <div className='flex flexjsb'>
                <h4>Children</h4>
                <span className='flexa flexjsb' onClick={(e) => { guestscoutntpop('children'); e.stopPropagation() }}>
                  <p>{guests["children"]}</p>
                  {guestspopcount["children"] && <div className='flex flexc popguests'>{counting.map((item) => (<div className='flexja' onClick={() => guestsmanage("children", item)}>{item}</div>))}</div>}
                </span>
              </div>
              <button onClick={() => { setroom(guests["room"]); setguestss(guests["adults"] + guests["children"]) }}>APPLY</button>
            </div>}
            <div className='flexc wraprg g10'>
              <div className='roost'>Rooms & Guest<IoIosArrowDown className='arroww' />
                <div className='flex flexa rhotel g10'>
                  <span className='flex j'><h1 className='flex'>{room}</h1>Room</span>
                  <span className='flex j'><h1 className='flex'>{guestss}</h1> Guests</span>
                </div>

              </div>
            </div>
          </div>
        </div>
        <button className='search-button flexja' onClick={() => { navigatetonextpage() }}>
          SEARCH
        </button>
        <div className='vh'></div>

        {                                        /* Offers Carousel Part */}

      <OffersCarousel/>
      </div>
    </div>
  )
}
