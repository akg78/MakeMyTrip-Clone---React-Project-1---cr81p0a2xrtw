import React, { useState, useEffect, useMemo } from 'react'
import "./HotelsResult.css";
import { UseNavigate, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import Calendar from 'react-calendar';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';


export default function HotelsResult() {

  const [fieldValue, setFieldValue] = useState('')
  const [HotelLocation, setHotelLocation] = useState('');
  const [inputSearch, setInputSearch] = useState("");
  const [hotels, setHotels] = useState([]);
  const [searchpop, setSearchPop] = useState({ hotelSearchPop: false });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let dplocation = searchParams.get("location");
  let dayOfWeek = searchParams.get("date");
  let guest = searchParams.get("guest")
  const dateObject = new Date(dayOfWeek);
  const [date, setDate] = useState(new Date());
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [ratingfilter, setratingfilter] = useState({ "excellent": true, "verygood": true, "average": true });
  const [pricefilter, setpricefilter] = useState({ "0-1000": true, "1000-2000": true, "2000-4500": true, "4500-8000": true, "8000-11500": true, "11500-15000": true, "15000-30000": true, "30000++": true });



  const navigate = useNavigate();
  function clickToSearch(hotelID) {

    navigate(`/hotels/results/details?hotelID=${hotelID}`)

  }
  function hotelSearchPop(key) {
    setSearchPop({ hotelSearch: key });
    setSearchPop((prev) => ({ ...prev, [key]: !searchpop[key] }));
  }

  function pricefilterchanger(key) {
    setpricefilter((prev) => ({ ...prev, [key]: !pricefilter[key] }));
  }
  function ratingfilterchanger(key) {
    setratingfilter((prev) => ({ ...prev, [key]: !ratingfilter[key] }));
  }
  function hotelperformance(val) {
    if (val >= 4) {
      return "Excellent"
    }
    if (val >= 2 && val < 4) {
      return "Very Good";
    }
    if (val < 2) {
      return "Average";
    }

  }
  const hotelSearch = useMemo(async (hotels) => {
    try {
      const response = await (await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${inputSearch}"}&limit=${"10"}&page=${currentPage}`,
        {
          method: "GET",
          headers: {
            projectId: "cr81p0a2xrtw",
            "content-type": "application/json",
          },
        }
      )).json();
      setHotels(response.data.hotels)
      console.log(response)
    } catch (error) {
      // alert(error);
    }
  }, [currentPage])

  useEffect(() => {
    hotelSearch;
  }, [])


  // function handlePrevPage() {
  //   if (prev > 1) {
  //     setPage(page - 1);
  //   }
  // };

  // function handleNextPage() {
  //   setPage(page + 1);
  // };

  const [activenav, setactivenav] = useState({ "flights": true });
  function activenavmaker(key) {
    setactivenav({});
    setactivenav((prev) => ({ ...prev, [key]: !activenav[key] }))
  }

  
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (event, value) => {
    setCurrentPage(value);
    // console.log(currentPage)
  };


  return (
    <div className='hotelsresult'>
      <div className='navouter flexja'>
        <nav className='flexa flexjsb'>
          <div className='navinner flex'>
            <a href='/'><img className='logoimg cp' src='/logo@2x.png' /></a>
            <div className='navleftmenu flex g20 cp'>
              <span className={activenav["flights"] ? "activecolor" : ""} onClick={() => { activenavmaker("flights") }}>{!activenav["flights"] ? <img src='/flights.png' /> : <img src='/flightsblue.png' />}<p className='flexja'><a href='/flights'>Flights</a></p></span>
              <span className={activenav["hotels"] ? "activecolor" : ""} onClick={() => { activenavmaker("hotels") }}>{!activenav["hotels"] ? <img src='/hotels.png' className='icons' /> : <img src='/hotelblue.png' />}<p className='flexja'><a href='/hotels'>Hotels</a></p></span>
              <span className={activenav["trains"] ? "activecolor" : ""} onClick={() => { activenavmaker("trains") }}>{!activenav["trains"] ? <img src='/trains.png' /> : <img src='/trainsblue.png' />}<p className='flexja'><a href='/trains'>Trains</a></p></span>
              <span className={activenav["bus"] ? "activecolor" : ""} onClick={() => { activenavmaker("bus") }}>{!activenav["bus"] ? <img src='/bus.png' /> : <img src='/busblue.png' />}<p className='flexja'><a href='/bus'>Buses</a></p></span>
            </div>
          </div>
          <div className='navrightmenu'>Login</div>
        </nav>
      </div>
      <div className='bodyouter flexa flexc'>
        <div className='bodyheader'>
          <div className='bodyheaderupper flexja '>
            <div className=''>
              <div className='headContainer flex flexr'>
                <div className='childContainer' onClick={() => { hotelSearchPop("cityandproperty") }}>
                  {searchpop["cityandproperty"] && <div className='cityAreaSearch'>
                    <input type='text' placeholder='Where you want to stay?' onClick={(e) => { e.stopPropagation(); }} value={inputSearch} onChange={(e) => { setInputSearch(e.target.value) }} />
                    {hotels && hotels.map((item, index) => (<div key={index} className='hotelCityProperty' >
                      <div><CiLocationOn /></div>
                      <div onClick={() => { (item.location.toString().match(/^([^,]+)/)[1]) }}>{(item.location.toString().match(/^([^,]+)/)[1])}</div>
                    </div>))}
                  </div>}
                  <span>CITY, AREA OR PROPERTY <IoIosArrowDown /></span>
                  <p>{dplocation}</p>
                </div>

                <div className='childContainer' onClick={() => { hotelSearchPop("checkin") }}>
                  {searchpop["checkin"] && <Calendar className="calendarForGoing" minDate={new Date()} onChange={(date) => { setDate(date) }} value={date} />}
                  <span>CHECK-IN <IoIosArrowDown /></span>
                  <div className='flex g5'>
                    <p>{dateObject.getDate()},</p> <p>{days[dateObject.getDay()]}</p> <p>{months[dateObject.getMonth()]}</p>
                  </div>
                </div >
                <div className='childContainer' onClick={() => { hotelSearchPop("checkout") }}>
                  {searchpop["checkout"] && <Calendar className="calendarForGoing" minDate={new Date()} onChange={(date) => { setDate(date) }} value={date} />}
                  <span>CHECK-OUT <IoIosArrowDown /></span>
                  <div className='flex g5'>
                    <p>{dateObject.getDate()},</p> <p>{days[dateObject.getDay()]}</p> <p>{months[dateObject.getMonth()]}</p>
                  </div>
                </div>
                <div className='childContainer flexc' onClick={() => { hotelSearchPop("roomContainer") }}>
                  {searchpop["roomContainer"] && <div className='roomandGuestPop'></div>}
                  <span>ROOMS & GUESTS</span>
                  <p>{guest}</p>
                </div>
                <button className='btn-nav-hotel'>SEARCH</button>
              </div>
            </div>
          </div>
          <div className='bodyheaderlower flexja b1'>
            <div className=''>
              <div className='flexr jsb sortingHotelNav '>
                <p>SORT BY:</p>
                <p>Popular</p>
                <p>User Rating</p>
                <p>Price</p>
                <p>Price</p>
                <input id='seachLocality' type='button' placeholder='Search for locality/ hotel name' />
              </div>
            </div>
          </div>
        </div>
        <div className='body'>
          <div className='bodyinner flex '>
            <div className='mainbody b'>
              <h4>Price per night</h4>
              <div className='flexc'>
                <label onClick={() => { pricefilterchanger("0-1000") }} className='flexa'>
                  <div><input type='checkbox' checked={pricefilter["0-1000"]} /></div>
                  <div> ₹4000 - ₹4500</div>
                </label>
                <label onClick={() => { pricefilterchanger("1000-2000") }} className='flexa'>
                  <div><input type='checkbox' checked={pricefilter["1000-2000"]} /></div>
                  <div> ₹4500 - ₹5000</div>
                </label>
                <label onClick={() => { pricefilterchanger("2000-4500") }} className='flexa'>
                  <div><input type='checkbox' checked={pricefilter["2000-4500"]} /></div>
                  <div>₹5000 - ₹5500</div>
                </label>
                <label onClick={() => { pricefilterchanger("4500-8000") }} className='flexa'>
                  <div><input type='checkbox' checked={pricefilter["4500-8000"]} /></div>
                  <div>₹5500 - ₹6000</div>
                </label>
                <label onClick={() => { pricefilterchanger("8000-11500") }} className='flexa'>
                  <div><input type='checkbox' checked={pricefilter["8000-11500"]} /></div>
                  <div>₹6000 - ₹6500</div>
                </label>
                <label onClick={() => { pricefilterchanger("11500-15000") }} className='flexa'>
                  <div><input type='checkbox' checked={pricefilter["11500-15000"]} /></div>
                  <div>₹6500 - ₹7000</div>
                </label>
                <label onClick={() => { pricefilterchanger("15000-30000") }} className='flexa'>
                  <div><input type='checkbox' checked={pricefilter["15000-30000"]} /></div>
                  <div>₹7000 - ₹7500</div>
                </label>
                <label onClick={() => { pricefilterchanger("30000++") }} className='flexa'>
                  <div><input type='checkbox' checked={pricefilter["30000++"]} /></div>
                  <div>₹7500++</div>
                </label>
              </div><br />

              <br />
              <h4>User Rating</h4>
              <label className='flexa' onClick={() => { ratingfilterchanger("excellent") }}>
                <div><input type='checkbox' checked={ratingfilter["excellent"]} />Excellent</div>
              </label>
              <label className='flexa' onClick={() => { ratingfilterchanger("verygood") }}>
                <div><input type='checkbox' checked={ratingfilter["verygood"]} />Very Good</div>
              </label>
              <label className='flexa' onClick={() => { ratingfilterchanger("average") }}>
                <div><input type='checkbox' checked={ratingfilter["average"]} />Good</div>
              </label>
            </div>
            <div className='MainBodyRender flex flexc' onClick={() => { }}>
              {hotels && hotels.map((item, index) => (((item.rating < 2 ? ratingfilter["average"] : true) && (item.rating >= 2 && item.rating < 4 ? ratingfilter["verygood"] : true) && (item.rating >= 4 ? ratingfilter["excellent"] : true)) && ((item.avgCostPerNight < 4500 && item.avgCostPerNight >= 4000 ? pricefilter["0-1000"] : true) && (item.avgCostPerNight < 5000 && item.avgCostPerNight >= 4500 ? pricefilter["1000-2000"] : true) && (item.avgCostPerNight < 5500 && item.avgCostPerNight >= 5000 ? pricefilter["2000-4500"] : true) && (item.avgCostPerNight < 6000 && item.avgCostPerNight >= 5500 ? pricefilter["4500-8000"] : true) && (item.avgCostPerNight < 6500 && item.avgCostPerNight >= 6000 ? pricefilter["8000-11500"] : true) && (item.avgCostPerNight < 7000 && item.avgCostPerNight >= 6500 ? pricefilter["11500-15000"] : true) && (item.avgCostPerNight < 75000 && item.avgCostPerNight >= 7000 ? pricefilter["15000-30000"] : true) && (item.avgCostPerNight > 75000 ? pricefilter["30000++"] : true)) &&
                (<div className='mainbodytwo flex' onClick={() => clickToSearch(item._id)}>

                  <div className='mainbodytwoLeft '>
                    <div className='flex'>
                      <div className='imgCardHotelP'><img src={item.images[0]} loading='lazy' /></div>
                      <div className='cardTextBox flex flexc g20'>
                        <div className='flex jsb'><h3>{item.name}</h3><h3 className='txtnw'>{item.amenities.length}-star hotel</h3></div>
                        <p>10% available discount</p>
                        <div className='flex jsb'><p>Free Cancellation till Check-in</p><div className='popamenitiesrelative'><span>i</span> <div className='popamenities flex flexc g5'>{item.amenities.map(item => <div>{item}</div>)}</div></div></div>
                      </div>
                    </div>


                    <div className='flex g20'>
                      <div className='imgCardHotel'><img src={item.images[1]} loading='lazy' /></div>
                      <div className='imgCardHotel'><img src={item.images[2]} loading='lazy' /></div>
                      <div className='imgCardHotel'><img src={item.images[3]} loading='lazy' /></div>
                    </div>

                  </div>

                  <div className='mainbodytwoRight'>

                    <div className='excellent flex jsb'>
                      <h2>{hotelperformance(item.rating)}</h2>
                      <p>{item.rating}/5 rating</p>
                    </div>

                    <div className='flexc flex ratings-and-price g20'>
                      <div className='flexa g5'><h2>₹{Math.floor(item.avgCostPerNight)} /</h2><p>per night</p></div>
                      <p>+₹ {Math.floor((item.avgCostPerNight * 12) / 100)} taxes & fees</p>
                    </div>
                  </div>
                </div>)))}


              <Stack spacing={2} justifyContent="center" alignItems="center" mt={3} padding={2} >
                <Pagination count={10}  onChange={onPageChange}/>
              </Stack>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
