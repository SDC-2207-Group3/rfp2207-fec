import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard.jsx';
import { DataContext } from './RelatedItems.jsx';

var RelatedProducts = (props) => {
  let data = useContext(DataContext);

  return (
    <div id="RIC-related-items">
      <p>related products here</p>
      <div id="RIC-ri-card-container">
        {/* {data.map((product) => {
          return <ProductCard product={product} mode={'related item'}/>
        })} */}
      </div>
    </div>
  )
}

export default RelatedProducts;