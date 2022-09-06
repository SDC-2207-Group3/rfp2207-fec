import React, { useState, useEffect, useContext } from 'react';
import CardCarousel from './CardCarousel.jsx';

const YourOutfits = (props) => {
  return (
    <div className="RIC-divs">
      <div className="RIC-header"><p>YOUR OUTFIT</p></div>
      <CardCarousel mode={'your-outfits'}/>
    </div>
  )
}

export default YourOutfits;