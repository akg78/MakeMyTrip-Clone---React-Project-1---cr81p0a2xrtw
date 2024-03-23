'use client'
import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import "./trainSearch.css"
import { IoIosArrowDown } from "react-icons/io";
import Calendar from 'react-calendar';
import { TbArrowsExchange } from "react-icons/tb";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { CiLocationOn } from "react-icons/ci";
import { NavLink } from 'react-router-dom';
import Login from '../Auth/login';
import Register from '../Auth/register';


export default function TrainSearch() {
    const navigate = useNavigate();

    const [activenav, setactivenav] = useState({ "trains": true });
    const [searchpop, setSearchPop] = useState({});
    const [inputSearch, setInputSearch] = useState('');
    const [searchTrain, setSearchTrain] = useState([]);
    const [rangeprice, setrangeprice] = useState(3000);
    const searchParams = new URLSearchParams(location.search);
    let trainName = searchParams.get("source");
    const [trainFrom, setTrainFrom] = useState(trainName);
    let trainNameTo = searchParams.get("destination");
    const [trainTo, setTrainTo] = useState(trainNameTo);
    let dayOfWeek = searchParams.get("date");
    const dateOfObject = new Date(dayOfWeek);
    const [date, setDate] = useState(new Date());
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [destination, setDestination] = useState({ "city": "Kanpur", "country": "India", "name": "" });
    const [source, setSource] = useState({ "city": "Delhi", "country": "India", "trainName": "Duronto Express" });
    const [isTrainSearch, setIsTrainSearch] = useState();
    const [filtercoach, setfiltercoach] = useState({ "CC": true, "1A": true, "2A": true, "3A": true, "3E": true, "2S": true, "EA": true })
    const [sortcard, setsortcard] = useState("");

    function filtercoachtype(key) {
        setfiltercoach((prev) => ({ ...prev, [key]: !filtercoach[key] }));
    }

    const trainCitySearch = async () => {
        try {
            const response = await (await fetch(
                `https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${inputSearch}"}`,
                {
                    method: "GET",
                    headers: {
                        projectId: "cr81p0a2xrtw",
                        "content-type": "application/json",
                    },
                }
            )).json();
            setIsTrainSearch(response.data.airports);
            // console.log(response.data.airports);
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        trainCitySearch();
    }, [inputSearch]);



    function pushtonext(trainNamee, trainNumberr, sourcee, travelDurationn, destinationn, arrivalTimee, departureTimee, faree, coachTypee, numberOfSeatss) {
        if(token){
            navigate("/trains/results/booking", {
                state: {
                    trainNamee,
                    trainNumberr,
                    sourcee,
                    destinationn,
                    arrivalTimee,
                    departureTimee,
                    faree,
                    coachTypee,
                    numberOfSeatss,
                    travelDurationn
                }
            });
        }else{
            setShowSignUp(true);
        }
        
    };


    function sortfun(data) {
        if (sortcard !== "") {
            return data.sort((a, b) => {
                if (a[sortcard] < b[sortcard]) return -1;
                if (a[sortcard] > b[sortcard]) return 1;
                return 0;
            });
        } else {
            return data;
        }
    }

    const trainMap = async () => {
        try {
            const response = await (await fetch(
                `https://academics.newtonschool.co/api/v1/bookingportals/train?search={"source":"${trainName}","destination":"${trainNameTo}"}&day=Mon&filter={"fare":{"$lte":${rangeprice}}} `,
                {
                    method: "GET",
                    headers: {
                        projectId: "cr81p0a2xrtw",
                        "content-type": "application/json",
                    },
                }
            )).json();
            const result = sortfun(response.data.trains);
            setSearchTrain(result);
            // console.log(response.data.trains);
        } catch (error) {
            // alert(error)
        }
    }

    useEffect(() => {
        trainMap();
    }, [sortcard, rangeprice]);


    const handleSwap = () => {
        const temp = source.city;
        setSource({ ["city"]: destination.city });
        setDestination({ ["city"]: temp });
    }

    function activenavmaker(key) {
        setactivenav({});
        setactivenav((prev) => ({ ...prev, [key]: !activenav[key] }))
    }



    function TrainSearchPop(key) {
        setSearchPop((prev) => ({ ...prev, [key]: !searchpop[key] }));
    }

    function selfNavigate() {
        trainMap();
        navigate(`/trains/results?source=${trainFrom}&destination=${trainTo}&date=${date}}`);
    }

    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("authToken"));

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

    return (
        <div className='hotelsresult'>
            <div className='hello'>{showSignUp && <Login token={token} setToken={setToken} showSignUp={showSignUp} setShowSignUp={setShowSignUp} />}</div>
            <div>{showSignIn && <Register token={token} setToken={setToken} showSignIn={showSignIn} setShowSignIn={setShowSignIn} />}</div>
            {showSignUp && <div className='popLogin'></div>}
            <div className='navouter flexja'>
                <nav className='flexa flexjsb'>
                    <div className='navinner flex'>
                        <a href='/'><img className='logoimg cp' src='/logo@2x.png' /></a>
                        <div className='navleftmenu flex g20 cp'>
                            <NavLink to="/"><span className={`${activenav["flights"] ? "activecolor" : ""} flexja flexc`} onClick={() => { activenavmaker("flights") }}>{!activenav["flights"] ? <img src='/flights.png' /> : <img src='/flightsblue.png' />}<p className='flexja'><a>Flights</a></p></span></NavLink>
                            <NavLink to="/hotels"><span className={`${activenav["hotels"] ? "activecolor" : ""} flexja flexc`} onClick={() => { activenavmaker("hotels") }}>{!activenav["hotels"] ? <img src='/hotels.png' className='icons' /> : <img src='/hotelblue.png' />}<p className='flexja'><a>Hotels</a></p></span></NavLink>
                            <NavLink to="/trains"><span className={`${activenav["trains"] ? "activecolor" : ""} flexja flexc`} onClick={() => { activenavmaker("trains") }}>{!activenav["trains"] ? <img src='/trains.png' className='icons' /> : <img src='/trainsblue.png' />}<p className='flexja'><a>Trains</a></p></span></NavLink>

                        </div>
                    </div>
                    <div className='my-login cp g10' onClick={() => { handleUser() }} style={{ backgroundImage: !token ? "linear-gradient(93deg, #53b2fe, #065af3)" : "none", color: "black" }}>
                        <p>{localStorage.getItem("name") ? `Hi ${JSON.parse(localStorage.getItem("name"))}` : "Login or Create Account"} </p> <IoIosArrowDown />
                    </div>
                </nav>
            </div>
            <div className='bodyouter flexa flexc'>
                <div className='bodyheader'>
                    <div className='bodyheaderupper flexja '>
                        <div className=''>
                            <div className='headContainer trainheardersection flex flexr'>
                                <div className='childContainer trainheaderSearch' onClick={() => { TrainSearchPop("cityandtrain") }}>
                                    {searchpop["cityandtrain"] && <div className='cityTrainSearch'>
                                        <input type='text' placeholder='From' onClick={(e) => { e.stopPropagation(); }} value={inputSearch} onChange={(e) => { setInputSearch(e.target.value) }} />
                                        {isTrainSearch && isTrainSearch.map((item, index) => (<div key={index} className=' flex g10 trainCity' onClick={() => { setTrainFrom(item.city) }} >
                                            <div><CiLocationOn /></div>
                                            <p>{item.city} Junction</p>
                                        </div>))}
                                    </div>}
                                    <span>FROM CITY <IoIosArrowDown /></span>
                                    <p>{trainFrom} Junction</p>
                                </div>
                                <span className='flexja trainSwap flex' onClick={() => { handleSwap() }}>
                                    <TbArrowsExchange className='swapp' />
                                </span>

                                <div className='childContainer trainheaderSearchh' onClick={() => { TrainSearchPop("citytrain") }}>
                                    {searchpop["citytrain"] && <div className='cityTrainSearchh'>
                                        <input type='text' placeholder='To' onClick={(e) => { e.stopPropagation(); }} value={inputSearch} onChange={(e) => { setInputSearch(e.target.value) }} />
                                        {isTrainSearch && isTrainSearch.map((item, index) => (<div key={index} className=' flexa g10 trainCityy' onClick={() => { setTrainTo(item.city) }} >
                                            <div><CiLocationOn /></div>
                                            <p>{item.city} Junction</p>
                                        </div>))}
                                    </div>}
                                    <span>TO CITY <IoIosArrowDown /></span>
                                    <p>{trainTo} Junction</p>
                                </div>

                                <div className='childContainer cp' onClick={() => { TrainSearchPop("checkin") }}>
                                    {searchpop["checkin"] && <Calendar className="calendarForGoing" minDate={new Date()} onChange={(e) => { setDate(e) }} value={date} />}
                                    <span>TRAVEL DATE <IoIosArrowDown /></span>
                                    <div className='flex g5'>
                                        <p>{date.getDate()},</p> <p>{months[date.getMonth()]}</p> <p>{[date.getFullYear()]}</p>
                                    </div>
                                </div>
                                <button className='btn-nav-hotel' onClick={() => selfNavigate()}>SEARCH</button>
                            </div>
                        </div>
                    </div>
                    <div className='sortbarContainer'>
                        <div className='flex flexa sortbarContainerText g10'>
                            Sorted By: <p className='sortedDefault' onClick={() => { TrainSearchPop("sortbar") }}> Availability (Default) <IoIosArrowDown /></p>
                            {searchpop["sortbar"] && <div className='sortbarContainerPop '>
                                <ul>
                                    <li className={`crsrpntr`} onClick={() => { setsortcard("") }}>Availability(Default)</li>
                                    <li className={`crsrpntr`} onClick={() => { setsortcard("trainName") }}>Train Name</li>
                                    <li className={`crsrpntr`} onClick={() => { setsortcard("departureTime") }}>Departure</li>
                                    <li className={`crsrpntr`} onClick={() => { setsortcard("travelDuration") }}>Travel Time</li>
                                    <li className={`crsrpntr`} onClick={() => { setsortcard("arrivalTime") }}>Arrival</li>
                                </ul>
                            </div>}
                        </div>
                    </div>
                </div>
                <div className='trainContainer flex g20'>
                    <div className='trainLeftSide'>
                        <div className='priceSlider flexc '>
                            <h4>One Way Price</h4>
                            <Box sx={{ width: 250 }}>
                                <Slider
                                    size="large"
                                    value={rangeprice}
                                    aria-label="Small"
                                    min={100}
                                    max={3000}
                                    valueLabelDisplay="auto"
                                    onChange={(e) => { setrangeprice(e.target.value) }}
                                />
                            </Box>
                            <div className='flexr flex wayPrice '>
                                <p>₹100</p>
                                <p>₹3,000</p>
                            </div>
                        </div>
                        <div className='coachType flecx'>
                            <h4>Coach Type</h4>
                            <label className='flexa g20 coachName' onClick={() => { filtercoachtype("CC") }}>
                                <div className='flex g10'><input type='checkbox' checked={filtercoach["CC"]} /> AC Chair Car -<p>{"CC"}</p></div>
                            </label>
                            <label className='flexa g20 coachName' onClick={() => { filtercoachtype("1A") }}>
                                <div className='flex g10'><input type='checkbox' checked={filtercoach["1A"]} /> 1st Class AC -<p>{"1A"}</p></div>
                            </label>
                            <label className='flexa g20 coachName' onClick={() => { filtercoachtype("2A") }}>
                                <div className='flex g10'><input type='checkbox' checked={filtercoach["2A"]} /> 2 Tier AC -<p>{"2A"}</p></div>
                            </label>
                            <label className='flexa g20 coachName' onClick={() => { filtercoachtype("3A") }}>
                                <div className='flex g10'><input type='checkbox' checked={filtercoach["3A"]} />3 Tier AC -<p>{"3A"}</p></div>
                            </label>
                            <label className='flexa g20 coachName' onClick={() => { filtercoachtype("3E") }}>
                                <div className='flex g10'><input type='checkbox' checked={filtercoach["3E"]} />AC three tier(economy)-<p>{"3E"}</p></div>
                            </label>
                            <label className='flexa g20 coachName' onClick={() => { filtercoachtype("2S") }}>
                                <div className='flex g10'><input type='checkbox' checked={filtercoach["2S"]} /> Second Sitting -<p>{"2S"}</p></div>
                            </label>
                            <label className='flexa g20 coachName' onClick={() => { filtercoachtype("EA") }}>
                                <div className='flex g10'><input type='checkbox' checked={filtercoach["EA"]} /> Executive Anubhuti -<p>{"EA"}</p></div>
                            </label>

                        </div>
                    </div>
                    <div className='trainRightSide'>
                        {searchTrain.length == 0 && <div className='flex flexja'>Trains are not available for this route!</div>}
                        {searchTrain && searchTrain.map((item) => (
                            <div className='trainReuseable flexc'>
                                <div className='flex headertrainComp'>
                                    <div>
                                        <h2>{item.trainName}</h2>
                                        <div className='flex g10 shortDetails'><p className='trainNum'>#{item.trainNumber}</p>|<p className='depart'>Departs on :  S  M  T  W  T  F  S  </p></div>
                                    </div>
                                    <div className='flex wrapTimeandDuration'>
                                        <div>
                                            <h3>{item.departureTime}</h3>
                                            <p>{item.source}</p>
                                        </div>
                                        <div className='trainDuration'>- {item.travelDuration} -</div>
                                        <div>
                                            <h3>{item.arrivalTime}</h3>
                                            <p>{item.destination}</p>
                                        </div>

                                    </div>

                                </div>
                                <div className='flex wraptrainOptions'>
                                    {item.coaches.map((itemm) => (filtercoach[`${itemm.coachType}`] && (
                                        <div className='flex cp' onClick={(e) => { pushtonext(item.trainName, item.trainNumber, item.travelDuration, item.source, item.destination, item.arrivalTime, item.departureTime, item.fare, itemm.coachType, itemm.numberOfSeats) }}>
                                            <div className='flexc trainOptions'>
                                                <div className='flex jsb'>
                                                    <h4>{itemm.coachType}</h4>
                                                    <h5>₹ {item.fare}</h5>
                                                </div>
                                                <div className='avail'>AVAILABLE {itemm.numberOfSeats}</div>
                                                <div className='freeCans'>Free Cancellation</div>
                                            </div>
                                        </div>
                                    )))}
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
