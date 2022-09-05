import React, { useState, useEffect, useContext } from 'react';
import CardCarousel from './CardCarousel.jsx';

const RelatedItems = (props) => {
  return (
    <div id="RIC-related-items">
      <div id="RIC-related-header"><p>related products here</p></div>
      <CardCarousel mode={'related-items'}/>
    </div>
  )
}

export default RelatedItems;


// {props.data.map((product) => {
//   return <ProductCard main={props.main} key={product.id} product={product} mode={'related-item'}/>
//   })}