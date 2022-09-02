import React, { useState, useEffect, useContext } from 'react';
import Stars from './Stars.jsx';
import { Star, XCircle } from 'react-feather';
import Comparison from './Comparison.jsx'
import { IdContext } from '../App.jsx'

var ProductCard = (props) => {
  const [data, setData] = useState({});
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const { changeId } = useContext(IdContext);

  return (
    <div className="RIC-product-card-div">
      {modal ? <Comparison close={closeModal} main={props.main} product={props.product}/> : null}
      <div className="RIC-card-icon-div"><span onClick={() => openModal()} className="RIC-conditional-icon">{props.mode === 'related-item' ? <Star size={20}/> :  <XCircle size={20} />}</span></div>
      <div className="RIC-product-card-img-div">
        <img className="RIC-product-card-img" src={props.product.img} alt="product img"></img>
      </div>
      <div className="RIC-product-card-detail">
        <p className="RIC" id="RIC-category">{props.product.category}</p>
        <p className="RIC" id="RIC-name">{props.product.name}</p>
        <p className="RIC">
          <span id={`RIC-original-price${props.product.sale_price ? '-sale' : ''}`}>$ {props.product.original_price}</span>
          <span id="RIC-sale-price">{" "} {props.product.sale_price ? '$' + props.product.sale_price : null }</span>
        </p>
        <Stars rating={props.product.ratings}/>
      </div>
    </div>
  )
}

export default ProductCard;