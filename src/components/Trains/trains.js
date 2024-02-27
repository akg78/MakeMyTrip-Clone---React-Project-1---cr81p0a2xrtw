import React, { useState, useEffect, useMemo } from 'react'
import "./trains.css"
import { IoIosArrowDown } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import { TbArrowsExchange } from "react-icons/tb";




export default function trains() {
  const navigate = useNavigate();
  const [offerData, setOfferData] = useState([])
  const [visibleOffer, setVisibleOffer] = useState("")
  const [isClicked, setIsClicked] = useState({ "RAILS": true })

  function clickedOfferNav(key) {
    setIsClicked({})
    setIsClicked((prev) => ({ ...prev, [key]: true }))
  }

  const handleSubmit = async (data) => {
    console.log(offerData)
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
    handleSubmit("RAILS");
  }, [])


  // ----------------------------------------OfferCrousel Part Over---------------------------------------------------



  const [searchCityPop, setSearchCityPop] = useState({});
  const [date, setDate] = useState(new Date());
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [ways, setways] = useState("");
  const [inputvalue, setInputValue] = useState("");
  const [inputvalueTwo, setInputValueTwo] = useState("");
  const [trainData, setTrainData] = useState([]);
  const [source, setSource] = useState({ "city": "Delhi", "country": "India", "trainName": "Duronto Express" });
  const [destination, setDestination] = useState({ "city": "Kanpur", "country": "India", "name": "" });




  function trainPop(key) {
    setSearchCityPop({});
    setSearchCityPop((prev) => ({ ...prev, [key]: !searchCityPop[key] }));
  }

  const handleSwap = () => {
    const temp = source.city;
    setSource({ ["city"]: destination.city});
    setDestination({ ["city"]: temp});
  }

  function navigatetonextpage() {
    navigate(`/trains/results?source=${source.city }&destination=${destination.city}&date=${date} }`);
    // `/flights/results?source="${boxdatasearchdeparture.iata_code}"&destination="${departureTo.iata_code}"&date="${date}
  }


  const trainSubmit = async () => {
    try {
      const response = await (await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${inputvalue}"}`,
        {
          method: "GET",
          headers: {
            projectId: "cr81p0a2xrtw",
            "content-type": "application/json",
          },
        }
      )).json();
      setTrainData(response.data.airports)
      console.log(setTrainData)
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    trainSubmit(setTrainData, inputvalue)
    trainSubmit(setTrainData, inputvalueTwo)
    
  }, [inputvalue, inputvalueTwo])


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
            <h1>{source.city} Junction</h1>
            <span></span>
            {searchCityPop["trainpop"] && <div className='trainpopup'>
              <input type='text' placeholder='from' onClick={(e) => { e.stopPropagation(); }} value={inputvalue} onChange={(e) => { setInputValue(e.target.value) }} />
              {trainData && trainData.map((item, index) => (<div className='flexa trainSlide g10' onClick={() => { setSource({ "city": item.city }) }}>
                <div><CiLocationOn /></div>
                <div className='traincity'>{item.city} Junction</div>
              </div>))}
            </div>}
          </div>

          <span className='swapTrain flexja' onClick={() => { handleSwap() }}>
              <TbArrowsExchange className='swapp' />
            </span>

          <div className=' search-city searchCityTrain' onClick={() => { trainPop("trainpopp") }}>
            <span>To</span>
            <h1>{destination.city} Junction</h1>
            <span></span>
            {searchCityPop["trainpopp"] && <div className='toTrainPop cp'>
              <input type='text' placeholder='to' onClick={(e) => { e.stopPropagation(); }} value={inputvalueTwo} onChange={(e) => { setInputValueTwo(e.target.value) }} />
              {trainData && trainData.map((item, index) => (<div className='flexa traintoSlide g10 ' onClick={() => { setDestination({ "city": item.city }) }}>
                <div><CiLocationOn /></div>
                <div className='traincity'>{item.city} Junction</div>
              </div>))}
            </div>}
          </div>

          <div className='check-Out' onClick={() => { trainPop("check-Outt") }}>
            <div className='flex'> {searchCityPop["check-Outt"] && <Calendar className="calendarForCheckOut" minDate={date} onChange={(e) => { setDate(e) }} value={date} />}
              <span className='fw'>Travel Date</span><IoIosArrowDown className='arrow' />
            </div>
            <p className='flexa g20'><h1>{date.getDate()}</h1>{months[date.getMonth()]}'{date.getFullYear()}</p>
          </div>

        </div>
        <button className='search-button-train flexja' onClick={() => { navigatetonextpage() }}>
          SEARCH
        </button>
        <div className='vh'></div>

        {                                        /* Offers Carousel Part */                                        }


        <div className='offer-container'>
          <div className='offers-tittle'>
            <h2>
              <font color="393939">Offers</font>
            </h2>
            <ul className='offer-list cp'>
              <li onClick={() => { setVisibleOffer("RAILS"); clickedOfferNav("RAILS"); handleSubmit("RAILS") }}><a className={isClicked["RAILS"] ? "colorOfferNav" : ""} >Train</a></li>
              <li onClick={() => { setVisibleOffer("ALL"); clickedOfferNav("ALL"); handleSubmit("ALL") }}><a className={isClicked["ALL"] ? "colorOfferNav" : ""} >All Offers</a></li>
              <li onClick={() => { setVisibleOffer("FLIGHTS"); clickedOfferNav("FLIGHTS"); handleSubmit("FLIGHTS") }}><a className={isClicked["FLIGHTS"] ? "colorOfferNav" : ""} >Flights</a></li>
              <li onClick={() => { setVisibleOffer("HOTELS"); clickedOfferNav("HOTELS"); handleSubmit("HOTELS") }}><a className={isClicked["HOTELS"] ? "colorOfferNav" : ""} >Hotels</a></li>
            </ul>
          </div>

          <div className='offers-card'>
            {offerData ? (offerData.map((item, index) =>
            (<div className='cards-container'>
              <div className='card-img'>
                <img src={item.newHeroUrl} alt="image" />
                <p>T&C's Apply</p>
              </div>
              <div className='card-box'>
                <h5>INTL FLIGHTS</h5>
                <h4>Get up to 50% OFF* on<br />International Flights!</h4>
                <p>Grab & make all your dream trips come true.</p>
              </div>
            </div>
            ))) : "...Loading"}
          </div>
        </div>
      </div>
    </div>
  )
}
