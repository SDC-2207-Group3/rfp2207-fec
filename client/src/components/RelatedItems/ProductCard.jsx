import React, { useState, useEffect, useContext } from 'react';
import Stars from './Stars.jsx';
import { DataContext } from './RelatedItems.jsx';
import { Star } from 'react-feather';


var ProductCard = (props) => {
  const [data, setData] = useState({});

  return (
    <div className="RIC-product-card-div">
      <div className="RIC-product-card-img">
        <Star size={20}/>
        <img></img>
      </div>
      <div className="RIC-product-card-detail">
        <p>category</p>
        <p>name</p>
        <p>price</p>
        <Stars />
      </div>

    </div>
  )
}

export default ProductCard;