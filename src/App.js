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
import BookingConfirmationPage from "./components/BookingPage/BookingConfirmationPage";
import Homestay from "./components/underConstruction/Homestay";
import SearchFlights from "./components/Flights/SearchFlights";
import PaymentDetails from "./components/BookingPage/PaymentDetails";
import HotelsResult from "./components/Hotels/HotelsResult";
import HotelsDetails from "./components/Hotels/HotelsDetails";
import BookingHotels from "./components/BookingPage/BookingHotels";
import TrainSearch from "./components/Trains/TrainSearch";
import BookingPageTrain from "./components/BookingPage/BookingPageTrain";
import OffersCarousel from "./components/Flights/OffersCarousel";
import Login from "./components/Auth/login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route index element={<Flights />} />
            <Route path='/flights' element={<Flights />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/homestay" element={<Homestay />} />
            <Route path="/holidays" element={<Holiday />} />
            <Route path="/trains" element={<Trains />} />
            <Route path="/buses" element={<Bus />} />
            <Route path="/cabs" element={<Cabs />} />
            <Route path="/offers" element={<OffersCarousel/>}></Route>
          </Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/flights/results/flightBooking/:PaymentDetails" element={<PaymentDetails />}></Route>
          <Route path="/flights/results/:flightBooking" element={<BookingConfirmationPage />} />
          <Route path="/hotels/results/details/:hotelBooking" element={<BookingHotels/>} />
          <Route path="/flights/:results" element={<SearchFlights />} />
          <Route path="/hotels/:results" element={<HotelsResult />} />
          <Route path="/hotels/results/:details" element={<HotelsDetails />}></Route>
          <Route path="/trains/:results" element={<TrainSearch/>}></Route>
          <Route path="/trains/results/:trainBooking" element={<BookingPageTrain/>}></Route>
        </Routes>
      </Router>

    </>
  )
}

export default App;
