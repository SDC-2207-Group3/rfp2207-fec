import React, { useState, useEffect, useContext } from 'react';
import CardCarousel from './CardCarousel.jsx';

const RelatedItems = (props) => {
  return (
    <div className="RIC-divs">
      <div className="RIC-header"><p>RELATED PRODUCTS</p></div>
      <CardCarousel mode={'related-items'}/>
    </div>
  )
}

export default RelatedItems;