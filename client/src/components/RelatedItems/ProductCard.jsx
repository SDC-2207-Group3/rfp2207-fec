import React, { useState, useEffect, useContext } from 'react';
import Stars from './Stars.jsx';
import { DataContext } from './RelatedItems.jsx';
import { Star, XCircle } from 'react-feather';


var ProductCard = (props) => {
  const [data, setData] = useState({});

  return (
    <div className="RIC-product-card-div">
      <div className="RIC-product-card-img">
        <div className="RIC-conditional-icon">{props.mode === 'related-item' ? <Star size={20}/> :  <XCircle size={20} />}</div>
        <img src={props.product.img} alt="product img"></img>
      </div>
      <div className="RIC-product-card-detail">
        <p>{props.product.category}</p>
        <h4>{props.product.name}</h4>
        <p>
          <span>$ {props.product.original_price}</span>
          <span>{props.product.sale_price ? props.product.sale_price : null }</span>
        </p>
        <Stars rating={props.product.ratings}/>
      </div>
    </div>
  )
}

export default ProductCard;