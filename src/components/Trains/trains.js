import React, { useState, useEffect, useMemo } from 'react'
import "./trains.css"
import { IoIosArrowDown } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import Calendar from 'react-calendar';
import OffersCarousel from '../Flights/OffersCarousel';
import { useNavigate } from 'react-router-dom';



export default function trains() {
  const navigate = useNavigate();

  const [searchCityPop, setSearchCityPop] = useState({});
  const [date, setDate] = useState(new Date());
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [ways, setways] = useState("");
  const [inputvall, setInputVall] = useState("");
  const [inputvallTwo, setInputVallTwo] = useState("");
  const [trainData, setTrainData] = useState([]);
  const [source, setSource] = useState({ "city": "Delhi", "country": "India", "trainName": "Duronto Express" })
  const [destination, setDestination] = useState({ "city": "Kanpur", "country": "India", "name": "" })




  function trainPop(key) {
    setSearchCityPop({});
    setSearchCityPop((prev) => ({ ...prev, [key]: !searchCityPop[key] }));
  }


  function navigatetonextpage() {
    navigate(`/trains/results? }`);
  }


  // const trainSubmit = useMemo(async () => {
  //   try {
  //     const response = await (await fetch(
  //       `https://academics.newtonschool.co/api/v1/bookingportals/train?search={"source":"${""}","destination":"${""}"&day=${""}}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           projectId: "cr81p0a2xrtw",
  //           "content-type": "application/json",
  //         },
  //       }
  //     )).json();
  //     setTrainData(response.data.trains)
  //     console.log(setTrainData)
  //   } catch (error) {
  //     alert(error);
  //   }
  // }, [])

  // useEffect(() => {
  //   trainSubmit;
  // }, [inputvall, inputvallTwo])




  return (
    <div className='hotelsMainDiv flexj'>
      <div className='trainBookingPanel'>
        <div className='booksTrainTickets flex jsb'>
          <label for="wayss">
            <span className='oneWays'><input type='radio' name='wayss' onClick={() => { setways("oneway") }} /> Book Train Tickets</span>
          </label>
          <div className='wrapHeader'>
            <h4>Train Ticket Booking</h4>
            <p>IRCTC Authorized e-ticketing</p>
          </div>

        </div>

        <div className='hotels-panel'>
          <div className='search-city trainCityFrom' onClick={() => { trainPop("trainpop") }}>
            <span>From</span>
            <h1>{source.city}</h1>
            <span></span>
            {searchCityPop["trainpop"] && <div className='trainpopup'>
              <input type='text' placeholder='from' onClick={(e) => { e.stopPropagation(); }} value={inputvall} onChange={(e) => { setInputVall(e.target.value) }} />
              {trainData && trainData.map((item, index) => (<div key={index} className='flexa trainSlide g10' onClick={() => { setCitySearch({ "city": item.source }) }}>
                <div><CiLocationOn /></div>
                {/* <div className={`traincity${index}`} onClick={() => { setdplocation(item.location.toString().match(/^([^,]+)/)[1]) }}>{item.location}</div> */}
              </div>))}
            </div>}
          </div>

          <div className='searchCityTrain' onClick={() => { trainPop("trainpopp") }}>
            <span>To</span>
            <h1>{destination.city}</h1>
            <span></span>
            {searchCityPop["trainpopp"] && <div className='toTrainPop'>
              <input type='text' placeholder='to' onClick={(e) => { e.stopPropagation(); }} value={inputvallTwo} onChange={(e) => { setInputVallTwo(e.target.value) }} />
              {trainData && trainData.map((item, index) => (<div key={index} className='flexa trainToSlide g10' onClick={() => { setCitySearch({ "city": item.destination }) }}>
                <div><CiLocationOn /></div>
                {/* <div className={`trainTocity${index}`} onClick={() => { setdplocation(item.location.toString().match(/^([^,]+)/)[1]) }}>{item.location}</div> */}
              </div>))}
            </div>}
          </div>

          <div className='check-Out' onClick={() => { trainPop("check-Outt") }}>
            <div className='flex'> {searchCityPop["check-Outt"] && <Calendar className="calendarForCheckOut" minDate={date} onChange={(e) => { setDate(e) }} value={date} />}
              <span className='fw'>Travel Date</span><IoIosArrowDown className='arrow' />
            </div>
            <p className='flexa g20'><h1>{date.getDate()}</h1>{months[date.getMonth()]}'{date.getFullYear()}</p>
            <p className='dayyy'>{daysOfWeek[date.getDay()]}</p>
          </div>

        </div>
        <button className='search-button-train flexja' onClick={() => { navigatetonextpage() }}>
          SEARCH
        </button>
        <div className='vh'></div>
        <OffersCarousel />
      </div>
    </div>
  )
}
