import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./trainSearch.css"
import { IoIosArrowDown } from "react-icons/io";
import Calendar from 'react-calendar';
import { TbArrowsExchange } from "react-icons/tb";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';




export default function TrainSearch() {
  const navigate = useNavigate();
  const [activenav, setactivenav] = useState({ "flights": true });
  const [searchpop, setSearchPop] = useState({});
  const [date, setDate] = useState(new Date())
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [inputSearch, setInputSearch] = useState('');
  const [searchTrain, setSearchTrain] = useState("")
  const [rangeprice, setrangeprice] = useState(3000);




  function activenavmaker(key) {
    setactivenav({});
    setactivenav((prev) => ({ ...prev, [key]: !activenav[key] }))
  }



  function TrainSearchPop(key) {
    setSearchPop((prev) => ({ ...prev, [key]: !searchpop[key] }));
  }

  function selfNavigate() {
    // hotelSearch()
    // navigate(`/hotels/results?location=${dplocations}&date=${date}&returndate=${dateReturn}&room=${guests["room"]}&guestss${guests["adults"] + guests["children"]}`);
  }

  return (
    <div className='hotelsresult'>
      <div className='navouter flexja'>
        <nav className='flexa flexjsb'>
          <div className='navinner flex'>
            <a href='/'><img className='logoimg cp' src='/logo@2x.png' /></a>
            <div className='navleftmenu flex g20 cp'>
              <span className={activenav["flights"] ? "activecolorHotel" : ""} onClick={() => { activenavmaker("flights") }}>{!activenav["flights"] ? <img src='/flights.png' /> : <img src='/flightsblue.png' />}<p className='flexja'><a href='/flights'>Flights</a></p></span>
              <span className={activenav["hotels"] ? "activecolorHotel" : ""} onClick={() => { activenavmaker("hotels") }}>{!activenav["hotels"] ? <img src='/hotels.png' className='icons' /> : <img src='/hotelblue.png' />}<p className='flexja'><a href='/hotels'>Hotels</a></p></span>
            </div>
          </div>
          {/* <div className='navrightmenu'>Login</div> */}
        </nav>
      </div>
      <div className='bodyouter flexa flexc'>
        <div className='bodyheader'>
          <div className='bodyheaderupper flexja '>
            <div className=''>
              <div className='headContainer flex flexr'>
                <div className='childContainer' onClick={() => { TrainSearchPop("cityandproperty") }}>
                  {searchpop["cityandproperty"] && <div className='cityAreaSearch'>
                    <input type='text' placeholder='From' onClick={(e) => { e.stopPropagation(); }} value={inputSearch} onChange={(e) => { setInputSearch(e.target.value) }} />
                    {searchTrain && searchTrain.map((item, index) => (<div key={index} className='hotelCityProperty' onClick={() => { setdplocations(item.location.toString().split(",")[0]) }} >
                      <div><CiLocationOn /></div>
                      <div >{item.location.toString().split(",")[0]}</div>
                    </div>))}
                  </div>}
                  <span> FROM CITY <IoIosArrowDown /></span>
                  <p>{ }</p>
                </div>

                <div>
                  <TbArrowsExchange className='swapp cp' />
                </div>

                <div className='childContainer' onClick={() => { TrainSearchPop("cityandproperty") }}>
                  {searchpop["cityandproperty"] && <div className='cityAreaSearch'>
                    <input type='text' placeholder='From' onClick={(e) => { e.stopPropagation(); }} value={inputSearch} onChange={(e) => { setInputSearch(e.target.value) }} />
                    {searchTrain && searchTrain.map((item, index) => (<div key={index} className='hotelCityProperty' onClick={() => { setdplocations(item.location.toString().split(",")[0]) }} >
                      <div><CiLocationOn /></div>
                      <div >{item.location.toString().split(",")[0]}</div>
                    </div>))}
                  </div>}
                  <span> FROM CITY <IoIosArrowDown /></span>
                  <p>{ }</p>
                </div>


                <div className='childContainer cp' onClick={() => { TrainSearchPop("checkin") }}>
                  {searchpop["checkin"] && <Calendar className="calendarForGoing" minDate={new Date()} onChange={(date) => { setDate(date) }} value={date} />}
                  <span>CHECK-IN <IoIosArrowDown /></span>
                  <div className='flex g5'>
                    <p>{date.getDate()},</p> <p>{months[date.getMonth()]}</p> <p>{[date.getFullYear()]}</p>
                  </div>
                </div >



                <button className='btn-nav-hotel' onClick={() => selfNavigate()}>SEARCH</button>
              </div>
            </div>
          </div>

          <div className='sortbarContainer'>
            <div className='flex flexa sortbarContainerText g10'>
              Sorted By: <p onClick={() => { TrainSearchPop("sortbar") }}> Availability(Default) <IoIosArrowDown /></p>
              {searchpop["sortbar"] && <div className='sortbarContainerPop '>
                <ul>
                  <li>Availability(Default)</li>
                  <li>Train Name</li>
                  <li>Departure</li>
                  <li>Travel Time</li>
                  <li>Arrival</li>
                </ul>
              </div>}
            </div>
          </div>
        </div>
          <div className='trainContainer flex g20'>
            <div className='trainLeftSide b1'>
              <div>
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
              </div>

            </div>
            <div className='trainRightSide b1'></div>
            <div></div>
          </div>
      </div>
    </div>
  )
}
