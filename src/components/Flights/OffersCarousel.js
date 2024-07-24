import React, { useState, useEffect } from 'react'
import "./OffersCarousel.css"

export default function OffersCarousel() {
  const [offerData, setOfferData] = useState([])
  const [visibleOffer, setVisibleOffer] = useState("")
  const [isClicked, setIsClicked] = useState({ "ALL": true })



  function clickedOfferNav(key) {
    setIsClicked({})
    setIsClicked((prev) => ({ ...prev, [key]: true }))
  }
  const handleSubmit = async (data) => {
    // console.log(offerData)
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
    handleSubmit("ALL");
  }, [])
  return (
    <>
      <div className='offer-container'>
        <div className='offers-tittle'>
          <h2>
            <font color="393939">Offers</font>
          </h2>
          <ul className='offer-list cp'>
            <li onClick={() => { setVisibleOffer("ALL"); clickedOfferNav("ALL"); handleSubmit("ALL") }}><a className={isClicked["ALL"] ? "colorOfferNav" : ""} >All Offers</a></li>
            <li onClick={() => { setVisibleOffer("FLIGHTS"); clickedOfferNav("FLIGHTS"); handleSubmit("FLIGHTS") }}><a className={isClicked["FLIGHTS"] ? "colorOfferNav" : ""} >Flights</a></li>
            <li onClick={() => { setVisibleOffer("HOTELS"); clickedOfferNav("HOTELS"); handleSubmit("HOTELS") }}><a className={isClicked["HOTELS"] ? "colorOfferNav" : ""} >Hotels</a></li>
            <li onClick={() => { setVisibleOffer("RAILS"); clickedOfferNav("RAILS"); handleSubmit("RAILS") }}><a className={isClicked["RAILS"] ? "colorOfferNav" : ""} >Train</a></li>
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
    </>

  )
}


















{/* {visibleOffer=="ALL"&& <div>{offerData?offerData.map(item=>(<div>{item}</div>)):"...Loading"}</div>} */ }

{/* <div className='createCarousel flex flexja'>
            <div className='backArrow flexja'><MdOutlineArrowBackIos onClick={() => { }} /></div>
            <div className='forwardArrow flexja'><MdOutlineArrowForwardIos /></div>
          </div> */}
