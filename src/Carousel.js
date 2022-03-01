import React from 'react'


export const Carousel = ({ image, index }) => {

  const { url } = image;

  return (
    <>
      <div className={index ? "carousel-item" : "carousel-item active"} >
        <img src={url} className="d-block w-100" alt="hotel"/>
      </div>
    </>
  )
}