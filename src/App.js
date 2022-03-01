
import './App.css';
import 'bootstrap';
import { useEffect, useState } from 'react';
import { Hotels } from './Hotels'

const axios = require('axios');


function App() {

  const [hotels, setHotels] = useState()
  const [filteredHotels, setFilteredHotels] = useState()

  useEffect(() => {

    async function initialHotels() {
      const hotels = await getHotels()
      const moreInfo = await getAdditionalInformation(hotels)
      setFilteredHotels(moreInfo)
      setHotels(moreInfo)
    }

    initialHotels()


    async function getHotels() {
      const response = await axios.get('https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG')
      return response.data
    }

    // Fetch additional details for each hotel
    async function getAdditionalInformation(hotels) {

      let data = hotels
      let additionalInfo = [];

      for (const element of data) {
        const resp = await axios.get('https://obmng.dbm.guestline.net/api/roomRates/OBMNG/' + element.id)
        const combinedInfo = { ...element, ...resp.data }
        additionalInfo.push(combinedInfo);
      }

      return additionalInfo;
    }
  }, [])


  const handleFilter = (e) => {
    e.preventDefault()

    const rating = document.querySelector('#rating');
    const adults = document.querySelector('#adults');
    const children = document.querySelector('#children');

    var filtered = []

    //Rate filter
    const rate = rating.value
    if (rate !== "0") {
      const newArray = hotels.filter(hotel => hotel.starRating >= rate)
      filtered = newArray
    }
    else {
      filtered = hotels
    }

    //Adults max filter
    const adult = adults.value
    if (adult !== "0") {
      if (filtered) {
        const newArray = filtered.filter(hotel => {
          let ok
          hotel.rooms.forEach(element => {
            if (element.occupancy.maxAdults >= adult) {
              ok = true
            }
          })

          return ok
        })

        filtered = newArray
      }}

    // Children max filter 
    const child = children.value
    if (child !== "0") {
      if (filtered) {
        const newArray = filtered.filter(hotel => {
          let ok
          hotel.rooms.forEach(element => {
            if (element.occupancy.maxChildren >= child) {
              ok = true
            }})
          return ok
        })
        filtered = newArray
      }}

    // Overall max people filter
    const overall = parseInt(children.value) + parseInt(adults.value)
    if (overall !== 0) {
      if (filtered) {
        const newArray = filtered.filter(hotel => {
          let occupancy
          hotel.rooms.forEach(element => {
            if (element.occupancy.maxOverall >= overall) {
              occupancy = true
            }})
          return occupancy
        })

        filtered = newArray
      }}
    

    setFilteredHotels(filtered)
  }

  return (
    <div className="App container">
      <header className="App-header d-flex justify-content-center mt-5">

        <div className="row col-md-6">
          <form className="d-flex justify-content-center">
            <select id="rating" className="form-select" aria-label="Default select example">
              <option value="0" selected>Rating</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="4">Four</option>
              <option value="5">Five</option>
            </select>
            <select id="adults" className="form-select" aria-label="Default select example">
              <option value="0" selected>Adults</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <select id="children" className="form-select" aria-label="Default select example">
              <option value="0" selected>Children</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <button onClick={(event) => handleFilter(event)} type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>

      </header>

      <div className="App-content row mt-5">
        {filteredHotels ? filteredHotels.map(hotel => <Hotels key={hotel.id} hotel={hotel} />) : ""}
      </div>

    </div>
  );
}

export default App;