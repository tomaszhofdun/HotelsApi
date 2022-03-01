import { Carousel } from './Carousel';
import React from 'react'


export const Hotels = ({ hotel }) => {

  const { id, name, address1, postcode, images, starRating, rooms } = hotel;

  return (
    <div className="card mb-3 col-md-4">
      <div className="row g-0 d-flex ">
        <div className="col-md-4">
          {/* Hotels slides */}
          <div id={id} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {images.map((image, index) => <Carousel image={image} index={index} />)}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target={"#" + id} data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={"#" + id} data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">Address: {address1} {postcode}</p>
            <p className="card-text"> Rating: {starRating}</p>
          </div>
        </div>

        <div style={{ display: "block", height: "1px", backgroundColor: "#cecece" }}></div>

        {/* Rooms */}
        {rooms ? rooms.map(room =>
          <>
            <div className="card-body">
              <h5 className="card-title">{room.name}</h5>
              <p className="card-text">Adults: {room.occupancy.maxAdults}</p>
              <p className="card-text">Children: {room.occupancy.maxChildren}</p>
              <p className="card-text">{room.longDescription}</p>
            </div>
            <div style={{ display: "block", height: "1px", backgroundColor: "#cecece" }}></div>
          </>
        ) : ""}

      </div>
    </div>
  )
}