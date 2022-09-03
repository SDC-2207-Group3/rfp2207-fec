import React, { useState, useEffect, useRef, useContext } from 'react';
import { ProductContext } from './../Overview.jsx';
import axios from 'axios';

import RatingStars from './RatingStars.jsx';

const ProductDetails = (props) => {

  const [size, setSize] = useState("select-size");

  const qtyRef = useRef(null);
  const sizeRef = useRef(null);

  const { state, dispatch } = useContext(ProductContext);

  const statePD = state.productDetails;
  const statePS = state.productStyles;
  const stateSS = state.selectedStyle;
  const statePR = state.productRating;

  // Product Details

// const category, description, features, name, slogan

  const name        = statePD.name        ? statePD.name        : "Product name unavailable";
  const slogan      = statePD.slogan      ? statePD.slogan      : "Product slogan Unavailable"
  const category    = statePD.category    ? statePD.category    : "Product Category Unavailable";
  const description = statePD.description ? statePD.description : "Product Description Unavailable";

  // Product Styles

  const styles = statePS.results ? statePS.results : [];

  // Selected Style

  const styleName  = stateSS.name           ? stateSS.name                  : "No style"
  const stylePrice = stateSS.original_price ? `$${stateSS.original_price}` : "Price Unavailable";

  const styleSizes   = stateSS.skus ? Object.keys(stateSS.skus).map((sku) => stateSS.skus[sku].size)     : [];
  const styleSizeQty = stateSS.skus ? Object.keys(stateSS.skus).map((sku) => stateSS.skus[sku].quantity) : [];

  let sizeDisplay = styleSizes.filter((size, index) => styleSizeQty[index] > 0)

  let qtyDisplay;

  if (size === 'select-size') { qtyDisplay = [] } else {
    let sizeIndex = styleSizes.indexOf(size);
    let quantity = styleSizeQty[sizeIndex] <= 15 ? styleSizeQty[sizeIndex] : 15;
    let quantities = []
    for (let i = 0; i < quantity; i++) { quantities.push(i + 1) }
    qtyDisplay = quantities;
  }

  //Price Toggle

  function togglePrice () {
    return stateSS.sale_price ? "overview-sale" : "";
  }

  function toggleSalePrice () {
    console.log(stateSS.sale_price);
    return stateSS.sale_price ?  (
    <>
     |<span className="overview-sale-price"> ${stateSS.sale_price}</span>
    </>
    ) : null
  }

  // Rating

  function calcProductRating(productRating) {
    if (typeof productRating !== 'object') { return }
    const ratings = Object.keys(productRating);
    const counts  = Object.values(productRating);
    const totalCount = counts.reduce((memo, count) => memo += parseInt(count), 0);
    const totalReviews = ratings.map((rating, index) => parseInt(rating) * parseInt(counts[index])).reduce((memo, rating) => memo += rating, 0);
    return (totalReviews/totalCount).toFixed(2);
  }

  const productRating = calcProductRating(statePR);

  // Size Select

  function changeSize (e) {
    setSize(sizeRef.current.value)
  }

  // Add to Cart

  function AddToCart () {
    return axios.post();
  }

  return (
    <div className="overview-productDetails">
      {console.log(stateSS)}
      <RatingStars rating={productRating} />

      <h6>{productRating} <span>Read all reviews</span></h6>
      <p></p>
      <h3>{category}</h3>
      <h2>{name}</h2>
      <h4>
        <span className={togglePrice()}>{stylePrice} </span> {toggleSalePrice()}
      </h4>
      <h5>
        Styles > {styleName}
      </h5>
      <div className="styles-container">
        {styles.map((style, index) =>
          <div key={index} className="style-thumbnail">
            <div
              className={"style-image-container" + (style === state.selectedStyle ? " style-selected" : "")}
              onClick={() => {dispatch({ type: 'selectStyle', selectStyle: style })}}
            >
              <img className="style-image" src={style.photos[0].thumbnail_url} alt="Style Thumbnail Unavailable"/>
            </div>
          </div>
        )}
      </div>

      {sizeDisplay.length > 0 ?
        <div>
          <p>
            Size: {" "}
            <select className="overview-size-select" ref={sizeRef} onChange={changeSize}>
              <option default value="select-size">Select Size</option>
              {sizeDisplay.map((size, index) =>
                <option key={index} value={size}>{size}</option>
              )}
            </select>
          </p>
          <p>
            Qty: {" "}
            <select className="overview-qty-select" ref={qtyRef}>
              <option default value="no-size">-</option>
              {qtyDisplay.map((qty, index) => <option key={index} value={qty}>{qty}</option>)}
            </select>
          </p>
          <div className="CartButton" onClick={AddToCart}>Add to Cart</div>
        </div> :
        <section>
          <span>OUT OF STOCK</span>
        </section>}
    </div>
  )
}

export default ProductDetails