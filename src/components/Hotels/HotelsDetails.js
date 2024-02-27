import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./HotelsDetails.css";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import Calendar from 'react-calendar';
import { HiOutlineWifi } from "react-icons/hi";
import { CgGym } from "react-icons/cg";
import { MdLocalBar } from "react-icons/md";
import { FaSpa } from "react-icons/fa";
import { PiSwimmingPoolBold } from "react-icons/pi";
import { GiForkKnifeSpoon } from "react-icons/gi";
import Login from '../Auth/login';

export default function HotelsDetails() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const searchParams = new URLSearchParams(location.search);
    let hotel_id = searchParams.get("hotelID");
    let dayOfWeek = searchParams.get("date");
    let returnDate = searchParams.get("returndate");
    let dplocation = searchParams.get("location");
    const [inputSearch, setInputSearch] = useState('');
    const [dplocate, setdplocate] = useState(dplocation)
    const dateObject = new Date(dayOfWeek);
    const [date, setDate] = useState(dateObject);
    let dateObjReturnDate = new Date(returnDate)
    const [dateReturn, setDateReturn] = useState(dateObjReturnDate);
    const counting = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    const [searchpop, setSearchPop] = useState({ hotelSearchPop: false });
    const [activenav, setactivenav] = useState({ "flights": true });
    const [dataa, setdataa] = useState();
    const [guests, setguests] = useState({ "room": 1, "adults": 1, "children": 0 });
    const [guestspopcount, setguestspopcount] = useState({ "room": false, "adults": false, "children": false });
    const [guestss, setguestss] = useState(guests["adults"] + guests["children"])
    const [room, setroom] = useState(guests["room"]);
    const [hotels, setHotels] = useState([]);

    const navigate = useNavigate();
    function navigatetoform(val) {

        navigate(`/hotels/results/details/hotelBooking?hotel_id=${hotel_id}&number=${val}&date=${dateObject}&returndate=${dateReturn}&room=${guests["room"]}&guestss${guests["adults"] + guests["children"]}&name=${dataa.name}`)
    }

    function prevNavigation() {
    navigate(`/hotels/results?location=${dplocate}&date=${date}&returndate=${dateReturn}&room=${guests["room"]}&guestss${guests["adults"] + guests["children"]}`);
    }



    const hotelSearch = async (hotels) => {
        try {
            const response = await (await fetch(
                `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${inputSearch}"}`,
                {
                    method: "GET",
                    headers: {
                        projectId: "cr81p0a2xrtw",
                        "content-type": "application/json",
                    },
                }
            )).json();
            setHotels(response.data.hotels)
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        hotelSearch();

    }, [inputSearch])







    const hoteldetailsfetch = useMemo(async () => {
        try {
            const response = await (await fetch(
                `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${hotel_id}`,
                {
                    method: "GET",
                    headers: {
                        projectId: "cr81p0a2xrtw",
                        "content-type": "application/json",
                    },
                }
            )).json();
            setdataa(response.data)
        } catch (error) {
            alert(error);
        }
    }, [])

    useEffect(() => {
        hoteldetailsfetch;
    }, [])






    function activenavmaker(key) {
        setactivenav({});
        setactivenav((prev) => ({ ...prev, [key]: !activenav[key] }))
    }

    function hotelSearchPop(key) {
        setSearchPop({ hotelSearch: key });
        setSearchPop((prev) => ({ ...prev, [key]: !searchpop[key] }));
    }

    function guestscoutntpop(key) {
        setguestspopcount({})
        setguestspopcount((prev) => ({ ...prev, [key]: !guestspopcount[key] }))
    }

    function guestsmanage(key, value) {
        setguests((prev) => ({ ...prev, [key]: value }));
    }
    return (

        <>
            {dataa &&
                <div className='hotelsresult'>
                    <div className='navouter flexja'>
                        <nav className='flexa flexjsb'>
                            <div className='navinner flex'>
                                <div>
                                    <Link to={"/"}>
                                        <img className='logoimg cp' src="//imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/logo@2x.png" alt="MMT's LOGO" />
                                    </Link>
                                </div>
                                <div className='navleftmenu flex g20 cp'>
                                    <span className={activenav["flights"] ? "activecolor" : ""} onClick={() => { activenavmaker("flights") }}>{!activenav["flights"] ? <img src='/flights.png' /> : <img src='/flightsblue.png' />}<p className='flexja'><a href='/'>Flights</a></p></span>
                                    <span className={activenav["hotels"] ? "activecolor" : ""} onClick={() => { activenavmaker("hotels") }}>{!activenav["hotels"] ? <img src='/hotels.png' className='icons' /> : <img src='/hotelblue.png' />}<p className='flexja'><a href='/hotels'>Hotels</a></p></span>
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
                                                {hotels && hotels.map((item, index) => (<div key={index} className='hotelCityProperty' onClick={() => { setdplocate(item.location.toString().split(",")[0]) }} >
                                                    <div><CiLocationOn /></div>
                                                    <div >{item.location.toString().split(",")[0]}</div>
                                                </div>))}
                                            </div>}
                                            <span>CITY, AREA OR PROPERTY <IoIosArrowDown /></span>
                                            {dplocate}
                                        </div>

                                        <div className='childContainer cp' onClick={() => { hotelSearchPop("checkin") }}>
                                            {searchpop["checkin"] && <Calendar className="calendarForGoing" minDate={new Date()} onChange={(date) => { setDate(date) }} value={date} />}
                                            <span>CHECK-IN <IoIosArrowDown /></span>
                                            <div className='flex g5'>
                                                <p>{date.getDate()},</p> <p>{months[date.getMonth()]}</p> <p>{[date.getFullYear()]}</p>
                                            </div>
                                        </div >
                                        <div className='childContainer cp' onClick={() => { hotelSearchPop("checkout") }}>
                                            {searchpop["checkout"] && <Calendar className="calendarForGoing" minDate={date} onChange={(e) => { setDateReturn(e) }} value={dateReturn} />}
                                            <span>CHECK-OUT <IoIosArrowDown /></span>
                                            <div className='flex g5'>
                                                <p>{dateReturn.getDate()},</p><p>{months[dateReturn.getMonth()]}</p><p>{[dateReturn.getFullYear()]}</p>
                                            </div>
                                        </div>

                                        <div className='childContainer flexc' onClick={() => { hotelSearchPop("roomContainer") }}>
                                            <span>ROOMS & GUESTS</span>
                                            <p>{room} Rooms ,{guestss} Guests</p>
                                            {searchpop["roomContainer"] && <div className='roomandGuestsResults flex flexc g20'>
                                                <div className='flex flexjsb'>
                                                    <h3>Rooms</h3>
                                                    <span className='flexa flexjsb' onClick={(e) => { guestscoutntpop('room'); e.stopPropagation() }}>
                                                        <p>{guests["room"]}</p><IoIosArrowDown />
                                                        {guestspopcount["room"] && <div className='flex flexc popguests'>{counting.map((item) => (<div className='flexja' onClick={() => guestsmanage("room", item)}>{item}</div>))}</div>}
                                                    </span>
                                                </div>
                                                <div className='flex flexjsb'>
                                                    <h3>Adults</h3>
                                                    <span className='flexa flexjsb' onClick={(e) => { guestscoutntpop('adults'); e.stopPropagation() }}>
                                                        <p>{guests["adults"]}</p><IoIosArrowDown />
                                                        {guestspopcount["adults"] && <div className='flex flexc popguests'>{counting.map((item) => (<div className='flexja' onClick={() => guestsmanage("adults", item)}>{item}</div>))}</div>}
                                                    </span>
                                                </div>
                                                <div className='flex flexjsb g20'>
                                                    <h3>Children <p className='childResults'>0 - 17 Years Old</p></h3>

                                                    <span className='flexa flexjsb' onClick={(e) => { guestscoutntpop('children'); e.stopPropagation() }}>
                                                        <p>{guests["children"]}</p><IoIosArrowDown />
                                                        {guestspopcount["children"] && <div className='flex flexc popguests'>{counting.map((item) => (<div className='flexja' onClick={() => guestsmanage("children", item)}>{item}</div>))}</div>}
                                                    </span>
                                                </div>
                                                <p className='childResults'>Please provide right number of children along with their right age for best options and prices.</p>
                                                <button onClick={() => { hotelSearchPop("roomContainer"); setroom(guests["room"]); setguestss(guests["adults"] + guests["children"]) }}>APPLY</button>
                                            </div>}
                                        </div>
                                        <button className='btn-nav-hotel' onClick={() => { prevNavigation() }}>SEARCH</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mainbodydiv flexj'>
                            <div className='mainbodystaticsize'>
                                <div className='mainbodyinner flex flexc jsb '>
                                    <div className='mainviewportdiv flex jsb g20 '>
                                        <div className='mainviewportleft '>
                                            <div className='mainVPupper flex g20'>
                                                <div className='mainVPupperleft'><img src={dataa.images[0]} /></div>
                                                <div className='mainVPupperright flex flexc g10'>
                                                    <div className='mainVPupperrightupper'><img src={dataa.images[1]} /></div>
                                                    <div className='mainVPupperrightdown'><img src={dataa.images[2]} /></div>
                                                </div>
                                            </div>
                                            <div className='mainVPdown flexa jsb '>
                                                <h2>{dataa.name}, {dataa.location.split(",")[0]}</h2>
                                                <div className='flexa g5'><div className='flexja'>{dataa.rating}</div><p>/5</p></div>
                                            </div>
                                        </div>
                                        <div className='mainviewportright flexa flexc'>
                                            <div className='mainVPrightD1 flexj flexc g20'>
                                                <div className='flex jsb'><p>Room With Free Cancellation</p><del>₹{Math.floor(dataa.avgCostPerNight * 1.2)}</del></div>
                                                <div className='flex jsb'><p>Free Cancellation till check-in</p><h3>₹ {Math.floor(dataa.avgCostPerNight)}</h3></div>
                                                <div className='flex jsb'><p>Book with ₹0 Payment</p><p>+₹{Math.floor((dataa.avgCostPerNight * 12) / 100)} taxes & fees</p></div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='amenities flex flexc g20'>
                                        <h1 className='ameni cp'>Amenities</h1>
                                        <div className='amenitiesDetails '>
                                            <div className='flex flexja b1 amenitiesList g20'>
                                                <span className='flex g10'><p><CgGym /></p>Gym</span>
                                                <span className='flex g10'><p><HiOutlineWifi /></p>Free Wifi</span>
                                                <span className='flex g10'><p><MdLocalBar /></p>Bar</span>
                                                <span className='flex g10'> <p><PiSwimmingPoolBold /></p>Free Wifi</span>
                                                <span className='flex g10'><p><FaSpa /></p>Spa</span>
                                                <span className='flex g10'> <p><GiForkKnifeSpoon /></p>Resturant</span>
                                                <span className='flex g10'><p><PiSwimmingPoolBold /></p>Swimming Pool</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className='houserulesgriddiv'>
                                            <div className='animationrotation1 flex flexc g5'>
                                                <h3>Restrictions</h3>
                                                <div className='flex g5'><h4>petsAllowed:</h4><p>{dataa.houseRules.restrictions.petsAllowed.toString().toUpperCase()}</p></div>
                                                <div className='flex g5'><h4>smokingAllowed:</h4><p>{dataa.houseRules.restrictions.smokingAllowed.toString().toUpperCase()}</p></div>
                                            </div>
                                            <div className='animationrotation2 flex flexc g5'>
                                                <h3>GuestProfile</h3>
                                                <div className='flex g5'><h4>unmarriedCouplesAllowed:</h4><p>{dataa.houseRules.guestProfile.unmarriedCouplesAllowed.toString().toUpperCase()}</p></div>

                                            </div>
                                            <div className='animationrotation3 flex flexc g10'>
                                                <h3>IdProofRelated</h3>
                                                <div className='flex g20'><h4>IdProofsAccepted:</h4><ol>{dataa.houseRules.idProofRelated.idProofsAccepted.map((item, index) => (<li key={index}>{item}</li>))}</ol></div>
                                                <div className='flex g5'><h4>LocalIdsAllowed:</h4><p>{dataa.houseRules.idProofRelated.localIdsAllowed.toString().toUpperCase()}</p></div>
                                            </div>
                                            <div className='animationrotation4 flex flexc g5'>
                                                <h3>childAndExtraBedPolicy</h3>
                                                <div className='flex g5'><h4>extraBedProvidedForChild:</h4><p>{dataa.childAndExtraBedPolicy.extraBedProvidedForChild.toString().toUpperCase()}</p></div>
                                                <div className='flex g5'><h4>extraBedForAdditionalGuest:</h4><p>{dataa.childAndExtraBedPolicy.extraBedForAdditionalGuest.toString().toUpperCase()}</p></div>
                                                <div className='flex g5'><h4>extraBedCharge:</h4><p>{dataa.childAndExtraBedPolicy.extraBedCharge}</p></div>
                                                <div className='flex g5'><h4>additionalInfo:</h4><p>{dataa.childAndExtraBedPolicy.additionalInfo}</p></div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='hrLine'></hr>
                                    <div className='roomsdiv flex flexc g20'>
                                        <h1 className='cp'>Rooms</h1>
                                        {dataa.rooms.map((item, index) => (
                                            <div className='roomcard flexa'>
                                                <div className=''><img src={dataa.images[index % dataa.images.length]} /></div>
                                                <div className='cardroomcenterdiv flex flexc g10'>
                                                    <h3>{item.cancellationPolicy}</h3>
                                                    <p className='flexa'><img src="https://promos.makemytrip.com/Hotels_product/Inclusions/Icons/Food&amp;Beverage_WelcomeDrinkonArrival.png" alt="Free Welcome Drink on Arrival" /> &nbsp; Free Welcome Dring on Arrival</p>
                                                    <p className='flexa'><img src="https://promos.makemytrip.com/Hotels_product/Inclusions/Icons/Default_DefaultDot.png" alt="Book with ₹0 Payment" />&nbsp; Book with ₹0 Payment</p>
                                                    <p className='flexa'><img src="https://promos.makemytrip.com/Hotels_product/Inclusions/Icons/Inclusion_RedCross.png" alt="No meals included" />&nbsp; No meals included</p>
                                                    <p className='flexa'><img src="https://promos.makemytrip.com/Hotels_product/Inclusions/Icons/Earlycheckin&amp;Latecheckout_EarlyCheckin.png" alt="Free Early Check in" />&nbsp; Free Early Check in</p>
                                                    <p className='flexa'><img src="https://promos.makemytrip.com/Hotels_product/Inclusions/Icons/OtherServices_LinenChange.png" alt="Free Linen Change" />&nbsp; Free Linen Change</p>
                                                </div>
                                                <div className='cardroomrightdiv flex flexc g10'>
                                                    <div className='flex jsb'> <h2>{item.bedDetail}</h2><h2>₹{item.price}<br /><span>+₹{item.costDetails.taxesAndFees} taxes & fees</span></h2></div>
                                                    <h3>Room Type:<br /> <span>{item.roomType}</span></h3>
                                                    <h3>Room Size:<br /> <span>{item.roomSize}</span></h3>
                                                    <button onClick={() => { navigatetoform(item.roomNumber) }}>SELECT ROOM</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <hr className='hrLine'></hr>
                                    {/* <Login/> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
