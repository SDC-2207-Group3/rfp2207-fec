import React, { useState, useEffect, useContext } from 'react';
import { Star, XCircle } from 'react-feather';
import Comparison from './Comparison.jsx';
import { ProductContext } from '../App.jsx';
import RatingStars from '../Utilities/RatingStars.jsx';
import Helper from '../Utilities/Helper.jsx';

var ProductCard = (props) => {
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const { changeId, placeholder } = useContext(ProductContext);

  return (
    <div className="RIC-product-card-div">
      <div className="RIC-card-icon-div">
        {props.mode === 'related-item' ? <i className="fa-regular fa-star open" onClick={() => props.open(props.product)}></i> :  <XCircle className="RIC-xcircle" size={20} onClick={() => props.delete(props.product.id)} />}
      </div>
      <div onClick={() => changeId(props.product.id)} className="RIC-product-card-img-div">
        <img className="RIC-product-card-img" src={props.product.img ? props.product.img : placeholder} alt="product img"></img>
      </div>
      <div onClick={() => changeId(props.product.id)} className="RIC-product-card-detail">
        <p className="RIC" id="RIC-category">{props.product.category}</p>
        <div className="RIC-name-wrapper-div"><p className="RIC" id="RIC-name">{props.product.name}</p></div>
        <p className="RIC">
          <span id={`RIC-original-price${props.product.sale_price ? '-sale' : ''}`}>$ {props.product.original_price}</span>
          <span id="RIC-sale-price">{" "} {props.product.sale_price ? '$' + props.product.sale_price : null }</span>
        </p>
        <RatingStars rating={props.product.ratings} />
      </div>
    </div>
  )
}

export default ProductCard;
