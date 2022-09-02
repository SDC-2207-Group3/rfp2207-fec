import React, { useState, useEffect, useRef, useContext } from 'react';
import { ProductContext } from './../Overview.jsx';

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
  const features    = statePD.features    ? statePD.features    : [];
  const description = statePD.description ? statePD.description : "Product Description Unavailable";

  // Product Styles

  const styles = statePS.results ? statePS.results : [];

  // Selected Style

  const styleName  = stateSS.name           ? stateSS.name                  : "No style"
  const stylePrice = stateSS.original_price ? `$ ${stateSS.original_price}` : "Price Unavailable";

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

  let ratingStars = [0, 0, 0, 0, 0]
  ratingStars = ratingStars.map((star, index) => {
    const pos = (index * 19.5) + '%';
    const starPosition = { left: pos }
    return (
      <div key={index} className="star-container" style={starPosition}>
        <i className="fa-solid fa-star star-fill"></i>
        <i className="fa-regular fa-star star-empty"></i>
      </div>
  )})

  const percentageFill = (1 - (productRating/5)) * 100 + '%';
  const fill = { width: percentageFill };

  // Size Select

  function changeSize (e) {
    setSize(sizeRef.current.value)
  }

  return (
    <div className="overview-productDetails">
      {console.log(state)}

      <div className="overview-rating">
        {ratingStars}
        <div className="rating-slider" style={fill}></div>
      </div>
      <h6>{productRating}</h6>
      <p><span>Read all reviews</span></p>
      <h3>{category}</h3>
      <h2>{name}</h2>
      <h4>{stylePrice}</h4>
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

      <h5>Features: </h5>
      <ul>
        {features.map((feature, index) =>
          <li key={index}>{feature.feature}: {feature.value}</li>
        )}
      </ul>

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
        </div> :
        <section>
          <span>OUT OF STOCK</span>
        </section>}
        <div className="CartButton">Add to Cart</div>
    </div>
  )
}

export default ProductDetails