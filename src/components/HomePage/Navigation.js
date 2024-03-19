import React, { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, json } from 'react-router-dom'
import './Navigation.css'
import { IoIosArrowDown } from "react-icons/io";
import Login from '../Auth/login';
import Register from '../Auth/register';

export default function Navigation() {
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const [activenav, setactivenav] = useState({ "flights": true });

    function activenavmaker(key) {
        setactivenav({});
        setactivenav((prev) => ({ ...prev, [key]: !activenav[key] }))
    }

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
        <div className='navcomp'>
            <div className='hello'>{showSignUp && <Login token={token} setToken={setToken} showSignUp={showSignUp} setShowSignUp={setShowSignUp} />}</div>
            <div>{showSignIn && <Register token={token} setToken={setToken} showSignIn={showSignIn} setShowSignIn={setShowSignIn} />}</div>
            {showSignUp && <div className='popLogin'></div>}
            <div className='full-bg'>
                <div className='background'>
                    <nav className='logo flex'>
                        <a href='/' ><img src='./Assets/logo.png' className='navlogoimg' /></a>

                        <div className='trip-container flexa'>
                            <img src='./Assets/triplogo.png' height={"45px"} />
                            <div className='my-trips cp'>
                                <Link to={"/"} className='linktrip'>
                                <p className='p1'>My Trips</p>
                                <br />
                                <p className='p2'> Manage your bookings</p></Link>
                            </div>
                            <div className='my-login cp g10' onClick={() => { handleUser() }} style={{ backgroundImage: !token ? "linear-gradient(93deg, #53b2fe, #065af3)" : "none" }}>

                                <p>{token ? "hi" : "Login or Create Account"} </p>
                                 <p> <IoIosArrowDown /></p>
                            </div>
                        </div>

                        <div className='data'>
                            <div className='navbar flex'>
                                <NavLink to={`/`}>
                                    <NavLink to={`/flights`}> <span className={activenav["flights"] ? "activecolor" : ""} onClick={() => { activenavmaker("flights") }}>{!activenav["flights"] ? <img src='flights.png' /> : <img src='flightsblue.png' />}<p>Flights</p></span> </NavLink>
                                </NavLink>
                                <NavLink to="/hotels"><span className={activenav["hotels"] ? "activecolor" : ""} onClick={() => { activenavmaker("hotels") }}>{!activenav["hotels"] ? <img src='hotels.png' className='icons' /> : <img src='hotelblue.png' />}<p>Hotels</p></span></NavLink>
                                <NavLink to="/trains"><span className={activenav["trains"] ? "activecolor" : ""} onClick={() => { activenavmaker("trains") }}>{!activenav["trains"] ? <img src='trains.png' /> : <img src='trainsblue.png' />}<p>Trains</p></span></NavLink>
                                <NavLink to="/buses"><span className={activenav["bus"] ? "activecolor" : ""} onClick={() => { activenavmaker("bus") }}>{!activenav["bus"] ? <img src='bus.png' /> : <img src='busblue.png' />}<p>Buses</p></span></NavLink>
                                <NavLink to='homestay'><span className={activenav["homestays"] ? "activecolor" : ""} onClick={() => { activenavmaker("homestays") }}>{!activenav["homestays"] ? <img src='homestays.png' className='homestays' /> : <img src='homestaysblue.png' />}<p className='stays'>Homestays<br />& Villas</p></span></NavLink>
                                <NavLink to="/holidays"><span className={activenav["holidays"] ? "activecolor" : ""} onClick={() => { activenavmaker("holidays") }}>{!activenav["holidays"] ? <img src='holidays.png' /> : <img src='holidayblue.png' />}<p className='package'>Holiday<br />Packages</p></span></NavLink>
                                <NavLink to="/cabs"><span className={activenav["cabs"] ? "activecolor" : ""} onClick={() => { activenavmaker("cabs") }}>{!activenav["cabs"] ? <img src='cabs.png' /> : <img src='cabsblue.png' />}<p>Cabs</p></span></NavLink>
                            </div>
                        </div>
                    </nav>
                </div>
                <Outlet />
            </div>
        </div>
    )
}
