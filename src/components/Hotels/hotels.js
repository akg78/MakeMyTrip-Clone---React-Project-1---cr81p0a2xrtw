import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import OffersCarousel from '../Flights/OffersCarousel'
import "./hotels.css"
import { IoIosArrowDown } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import Calendar from 'react-calendar';

export default function () {
  const navigate = useNavigate();
  const [ways, setways] = useState("");
  const [searchCityPop, setSearchCityPop] = useState({ hotelPop: false });
  const [citySearch, setCitySearch] = useState({});
  const [inputvall, setInputVall] = useState("");
  const [dplocation, setdplocation] = useState("Kolkata");
  const [hotelData, setHotelData] = useState([]);
  const [date, setDate] = useState(new Date())
  const [guests, setguests] = useState({ "room": 1, "adults": 1, "children": 0 });
  const [guestspopcount, setguestspopcount] = useState({});
  const [room, setroom] = useState(guests["room"]);
  const [guestss, setguestss] = useState(guests["adults"] + guests["children"])
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
    navigate(`/hotels/results?location=${dplocation}&date=${date}&room=${guests["room"]}&adults=${guests["adults"]}&children=${guests["children"]}`);
  }

  const hotelSubmit = useMemo(async (data) => {
    console.log(hotelData)
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
          <label for="wayss">
            <span className='oneWays'><input type='radio' name='wayss' onClick={() => { setways("oneway") }} /> Upto 4 Rooms</span>
            <span className='roundTripp'><input type='radio' name='wayss' onClick={() => { setways("roundTrip") }} /> Group Deals</span>
          </label>
          <p className='bookk'>Book Domestic and International Property Online. To list your property <a href='https://www.makemytrip.com/hotels/hotelier-register.htm'>Click Here</a></p>
        </div>

        <div className='hotels-panel'>
          <div className='search-city' onClick={() => { hotelPop("hotelpop") }}>
            <span>City,Property Name Or Location</span>
            <h1>{dplocation}</h1>
            <span>India</span>
            {searchCityPop["hotelpop"] && <div className='hotelpopup'>
              <input type='text' placeholder='Where you want to stay?' onClick={(e) => { e.stopPropagation(); }} value={inputvall} onChange={(e) => { setInputVall(e.target.value) }} />
              {hotelData && hotelData.map((item, index) => (<div key={index} className='flexa hotelSlide g10' onClick={() => { setCitySearch({ "city": item.city }) }}>
                <div><CiLocationOn /></div>
                <div className={`hotelcity${index}`} onClick={() => { setdplocation(item.location.toString().match(/^([^,]+)/)[1]) }}>{item.location}</div>
              </div>))}
            </div>}
          </div>

          <div className='check-In' onClick={() => { hotelPop("check-Inn") }}><IoIosArrowDown className='arrow' />
            {searchCityPop["check-Inn"] && <Calendar className="calendarForCheckIn" minDate={new Date()} onChange={(date) => { setDate(date) }} value={date} />}
            <span>Check-In</span>
            <p className='flexa g20'><h1>{date.getDate()}</h1>{months[date.getMonth()]}'{date.getDate()}</p>
            <p>{daysOfWeek[date.getDay()]}</p>
          </div>

          <div className='check-Out' onClick={() => { hotelPop("check-Outt") }}>
            <div className='flex'><IoIosArrowDown className='arrow' /> {searchCityPop["check-Outt"] && <Calendar className="calendarForCheckOut" minDate={new Date()} onChange={(date) => { setDate(date) }} value={date} />}
              <span>Check-Out</span>
            </div>
            <p className='flexa g20'><h1>{date.getDate()}</h1>{months[date.getMonth()]}'{date.getDate()}</p>
            <p>{daysOfWeek[date.getDay()]}</p>
          </div>

          <div className='rooms-guest flexa' onClick={() => { hotelPop("room-guests") }}><IoIosArrowDown className='arrow' />
            {searchCityPop["room-guests"] && <div className='roomandGuests flex flexc g20'>
              <div className='flex flexjsb'>
                <h4>Rooms</h4>
                <span className='flexa flexjsb' onClick={(e) => { guestscoutntpop('room'); e.stopPropagation() }}>
                  <p>{guests["room"]}</p><IoIosArrowDown />
                  {guestspopcount["room"] && <div className='flex flexc popguests'>{counting.map((item) => (<div className='flexja' onClick={() => guestsmanage("room", item)}>{item}</div>))}</div>}
                </span>
              </div>
              <div className='flex flexjsb'>
                <h4>Adults</h4>
                <span className='flexa flexjsb' onClick={(e) => { guestscoutntpop('adults'); e.stopPropagation() }}>
                  <p>{guests["adults"]}</p><IoIosArrowDown />
                  {guestspopcount["adults"] && <div className='flex flexc popguests'>{counting.map((item) => (<div className='flexja' onClick={() => guestsmanage("adults", item)}>{item}</div>))}</div>}
                </span>
              </div>
              <div className='flex flexjsb'>
                <h4>Children</h4>
                <span className='flexa flexjsb' onClick={(e) => { guestscoutntpop('children'); e.stopPropagation() }}>
                  <p>{guests["children"]}</p><IoIosArrowDown />
                  {guestspopcount["children"] && <div className='flex flexc popguests'>{counting.map((item) => (<div className='flexja' onClick={() => guestsmanage("children", item)}>{item}</div>))}</div>}
                </span>
              </div>
              <button onClick={() => { setroom(guests["room"]); setguestss(guests["adults"] + guests["children"]) }}>APPLY</button>
            </div>}
            <span>Rooms & Guest</span>
            <p><h1>{room}</h1> Room</p>
            <p><h1>{guestss}</h1> Guests</p>
          </div>
        </div>
        <button className='search-button flexja' onClick={() => { navigatetonextpage() }}>
          SEARCH
        </button>
        <OffersCarousel  />
      </div>
    </div>
  )
}
