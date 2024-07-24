import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material';

export default function MyTrips() {

  const [bookings, setBookings] = useState([]);

  const fetchBooking = async () => {
    try {
      const response = await (await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/booking/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('authToken'))}`,
            projectID: "cr81p0a2xrtw",
            "Content-Type": "application/json",
          },
        }
      )).json();
      setBookings(response.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [])

  const [toggle, setToggle] = useState(true);


  const [logoflights, setlogoflights] = useState([
    "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/6E.svg", "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/SG.svg",
    "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/I5.svg", "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/UK.svg",
    "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/AI.svg", "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/QP.svg",
    "//fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/S5.svg"
  ])


  function logofinder(item) {
    if ((item.flightID[0] + item.flightID[1]) == "6E") { return logoflights[0]; }
    if ((item.flightID[0] + item.flightID[1]) == "SG") { return logoflights[1]; }
    if ((item.flightID[0] + item.flightID[1]) == "I5") { return logoflights[2]; }
    if ((item.flightID[0] + item.flightID[1]) == "UK") { return logoflights[3]; }
    if ((item.flightID[0] + item.flightID[1]) == "AI") { return logoflights[4]; }
    if ((item.flightID[0] + item.flightID[1]) == "QP") { return logoflights[5]; }
    if ((item.flightID[0] + item.flightID[1]) == "S5") { return logoflights[6]; }
    if ((item.flightID[0] + item.flightID[1]) == "G8") { return logoflights[6]; }
  }

  function airlineNamefinder(item) {
    if ((item.flightID[0] + item.flightID[1]) == "6E") { return "IndiGo"; }
    if ((item.flightID[0] + item.flightID[1]) == "SG") { return "SpiceJet"; }
    if ((item.flightID[0] + item.flightID[1]) == "I5") { return "Air India Express"; }
    if ((item.flightID[0] + item.flightID[1]) == "UK") { return "Vistara"; }
    if ((item.flightID[0] + item.flightID[1]) == "AI") { return "Air India"; }
    if ((item.flightID[0] + item.flightID[1]) == "QP") { return "Akasa Air"; }
    if ((item.flightID[0] + item.flightID[1]) == "S5") { return "Star Air"; }
    if ((item.flightID[0] + item.flightID[1]) == "G8") { return "Go Air"; }
  }
  return (
    <>
      <div className=''>
        <div className=' flexja flexc'>
          <h1 style={{ margin: "auto 0px" }}>My Trips</h1>
          <div className=' flex g10 '>
            <button onClick={() => { setToggle(true) }}>Flight</button>
            <button onClick={() => { setToggle(false) }}>Hotels</button>
          </div>

        </div>
        {toggle == true &&
          <Box>
            {bookings && (bookings.map((item, index) => (item.flight && (
              <div style={{ margin: "20px", paddingLeft: "10px", paddingRight: "10px", boxShadow: "0 0 5px #0005", borderRadius: "6px" }}>
                <div className='listingCardupper flexa'>
                  <div className='divListCard flexja g10'>
                    <img src={logofinder(item.flight)} alt='img' className='listingImg' />
                    <div className='flexa g5 flexc'>
                      <h4>{airlineNamefinder(item.flight)}</h4>
                      <p>{`${item.flight.flightID[0]}${item.flight.flightID[1]}-${item.flight.flightID[item.flight.flightID.length - 3] + item.flight.flightID[item.flight.flightID.length - 2] + item.flight.flightID[item.flight.flightID.length - 1]}`}</p>
                    </div>
                  </div>
                  <div className='deparTime '>
                    <h3>{item.flight.arrivalTime}</h3>
                    <p>{item.flight.source}</p>
                  </div>
                  <div className='timeduration flexc flexja'>
                    <h5>0{item.flight.duration} h 00 m</h5>
                    <p>{item.flight.stops} Stop</p>
                  </div>
                  <div className='arrivalTime flexc flexja'>
                    <h3>{item.flight.departureTime}</h3>
                    <p>{item.flight.destination}</p>
                  </div>
                  <div className='pricefortickets'>
                    <h3>₹{item.flight.ticketPrice}<br /></h3><p>per adult</p>
                  </div>
                </div>
              </div>
            ))))}
          </Box>
        }

{toggle == false &&
          <Box>
            {bookings && (bookings.map((item, index) => (item.hotel && (
              <div style={{ margin: "20px", paddingLeft: "10px", paddingRight: "10px", boxShadow: "0 0 5px #0005", borderRadius: "6px" }}>
                <div className='listingCardupper flexa'>
                  <div className='divListCard flexja g10'>
                    {/* <img src={logofinder(item.flight)} alt='img' className='listingImg' /> */}
                    <div className='flexa g5 flexc'>
                      {/* <h4>{airlineNamefinder(item.flight)}</h4> */}
                      {/* <p>{`${item.flight.flightID[0]}${item.flight.flightID[1]}-${item.flight.flightID[item.flight.flightID.length - 3] + item.flight.flightID[item.flight.flightID.length - 2] + item.flight.flightID[item.flight.flightID.length - 1]}`}</p> */}
                    </div>
                  </div>
                  <div className='deparTime '>
                    <h3>{item.hotel.name}</h3>
                    <p>{item.hotel.location}</p>
                  </div>
                  {/* <div className='timeduration flexc flexja'>
                    <h5>0{item.flight.} h 00 m</h5>
                    <p>{item.flight.} Stop</p>
                  </div>
                  <div className='arrivalTime flexc flexja'>
                    <h3>{item.flight.departureTime}</h3>
                    <p>{item.flight.destination}</p>
                  </div>
                  <div className='pricefortickets'>
                    <h3>₹{item.flight.ticketPrice}<br /></h3><p>per adult</p>
                  </div> */}
                </div>
              </div>
            ))))}
          </Box>
        }

      </div>

    </>
  );
}