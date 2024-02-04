// import "../styles/App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navigation from "./components/HomePage/Navigation";
import Flights from "./components/Flights/Flights";
import Hotels from "./components/Hotels/hotels";
import Trains from "./components/Trains/trains";
import Holiday from "./components/underConstruction/Holiday";
import Cabs from "./components/underConstruction/Cabs";
import Bus from "./components/underConstruction/Bus";
import Login from "./components/Auth/login";
import Register from "./components/Auth/register";
import BookingConfirmationPage from "./components/BookingPage/BookingConfirmationPage";
import Bottom from "./components/Bottoms/Bottom";
import Homestay from "./components/underConstruction/Homestay";
import Offers from "./components/Flights/OffersCarousel";
import SearchFlights from "./components/Flights/SearchFlights";
import PaymentDetails from "./components/BookingPage/PaymentDetails";
import HotelsResult from "./components/Hotels/HotelsResult";
import HotelsDetails from "./components/Hotels/HotelsDetails";
import BookingHotels from "./components/BookingPage/BookingHotels";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navigation/>}>
            <Route index element={<Flights />}/>
            <Route path="bottom" element={<Bottom />}/>
            <Route path="offers" element={<Offers/>}/>
            <Route path='/flights' element={<Flights />}/>
            <Route path="/hotels" element={<Hotels/>} />
            <Route path="/homestay" element={<Homestay/>}/>
            <Route path="/holidays" element={<Holiday/>}/>
            <Route path="/trains" element={<Trains/>}/>
            <Route path="/buses" element={<Bus/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/cabs" element={<Cabs/>}/>
            <Route path="/login" element={<Login/>} />
          </Route>
            <Route path="/flights/results/flightBooking/:PaymentDetails" element={<PaymentDetails/>}></Route>
            <Route path="/flights/results/:flightBooking" element={<BookingConfirmationPage/>}/>
            <Route path="/hotels/results/details/:hotelBooking" element={<BookingHotels/>}/>
            <Route path="/flights/:results" element={<SearchFlights/>}/>
            <Route path="/hotels/:results" element={<HotelsResult/>}/>
            <Route path="/hotels/results/:details" element={<HotelsDetails/>}></Route>
        </Routes>
      </Router>

    </>
  )
}

export default App;
