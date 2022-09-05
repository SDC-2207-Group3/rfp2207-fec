import React, { useState, useEffect, useContext } from 'react';
import CardCarousel from './CardCarousel.jsx';

const YourOutfits = (props) => {
  return (
    <div id="RIC-your-outfits">
      <div id="RIC-outfits-header"><p>Your Outfits Here</p></div>
      <CardCarousel mode={'your-outfits'}/>
    </div>
  )
}

export default YourOutfits;