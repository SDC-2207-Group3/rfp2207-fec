import React, { useState, useEffect, useRef, useContext } from 'react';
import { ProductContext } from './../Overview.jsx';
import axios from 'axios';

import RatingStars from './RatingStars.jsx';

const truncatePrice = (price) => {
  console.log(price);
  return price.slice(price.length - 3, price.length) === '.00' ? price.slice(0, price.length - 3) : price
}

const AtelierPostSkuToCart = (sku) => {
  return axios({
    url: _AtelierAPI + "cart",
    method: "post",
    headers: { "Authorization": process.env.KEY },
    data: { "sku_id": sku }
  })
}

const ProductDetails = (props) => {

  const [size, setSize] = useState("select-size");
  const [qty, setQty] = useState("no-size");
  const [noSize, setNoSize] = useState(false);

  const qtyRef = useRef(null);
  const sizeRef = useRef(null);

  const { state, dispatch, _AtelierAPI } = useContext(ProductContext);

  const statePD = state.productDetails;
  const statePS = state.productStyles;
  const stateSS = state.selectedStyle;
  const statePR = state.productRating;

  // Product Details

// const category, name, slogan

  const name        = statePD.name        ? statePD.name        : "Product name unavailable";
  const slogan      = statePD.slogan      ? statePD.slogan      : "Product slogan Unavailable"
  const category    = statePD.category    ? statePD.category    : "Product Category Unavailable";

  // Product Styles

  const styles = statePS.results ? statePS.results : [];

  // Selected Style

  const styleName  = stateSS.name           ? stateSS.name                  : "No style"
  const stylePrice = stateSS.original_price ? `$ ${truncatePrice(stateSS.original_price)}` : "Price Unavailable";

  const styleSizes   = stateSS.skus ? Object.keys(stateSS.skus).map((sku) => stateSS.skus[sku].size)     : [];
  const styleSizeQty = stateSS.skus ? Object.keys(stateSS.skus).map((sku) => stateSS.skus[sku].quantity) : [];
  const styleSKUs    = stateSS.skus ? Object.keys(stateSS.skus).map((sku) => sku) : [];

  const sizeOptions = styleSizes.filter((size, index) => styleSizeQty[index] > 0).map((size, index) => <option key={index} value={size}>{size}</option>)

  let qtyDisplay;

  if (size === 'select-size') { qtyDisplay = [] } else {
    let sizeIndex = styleSizes.indexOf(size);
    let quantity = styleSizeQty[sizeIndex] <= 15 ? styleSizeQty[sizeIndex] : 15;
    let quantities = []
    for (let i = 0; i < quantity; i++) { quantities.push(i + 1) }
    qtyDisplay = quantities;
  }

  const quantityOptions = size === 'select-size' ?
    <option default value="no-size">-</option> :
    qtyDisplay.map((qty, index) => <option key={index} value={qty}>{qty}</option>)

  //Price Toggle

  function togglePrice () {
    return stateSS.sale_price ? "cancelled" : "";
  }

  function toggleSalePrice () {
    return stateSS.sale_price ?  (
    <>
     {" "}|<span className="alert"> ${stateSS.sale_price}</span>
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

  const productRating = isNaN(calcProductRating(statePR)) ? 0 : calcProductRating(statePR);

  // Size Select

  function sizeAlert() {
    return noSize ? <article className="alert notification">Please select a size</article> : null;
  }

  function changeSize (e) {
    setSize(sizeRef.current.value)
  }

  useEffect(() => {
    setNoSize(false);
  }, [size, state.selectedStyle])

  // Qty Select

  function changeQty (e) {
    setQty(qtyRef.current.value)
  }

  // Add to Cart

  function AddToCart () {
    if (size === 'select-size') { return setNoSize(true) }

    const index = styleSizes.indexOf(size);
    const sku = styleSKUs[index]
    const quantity = qty === 'no-size' ? 1 : qty;

    let skuQuantities = [];
    for (let i = 0; i < qty; i++) { skuQuantities.push(AtelierPostSkuToCart(sku)) }
    return axios.all(skuQuantities)
      .catch((err) => console.log(err));
  }

  return (
    <div className="overview-productDetails">
      <section className="overview-rating-section">
        <RatingStars rating={productRating} />
        <h6 className="section-link"> <a className="section-link" href="#section_rr">Read all reviews</a></h6>
      </section>

      <section className="overview-pd-section">
        <h4 className="product-category">{category}</h4>
        <h2>{name}</h2>
      </section>

      <section className="overview-pd-section">
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
      </section>


      {sizeOptions.length > 0 ?
        <section className="">
          <section className="overview-pd-section">
            {sizeAlert()}
            <select className="overview-select" ref={sizeRef} onChange={changeSize}>
              <option default value="select-size">Select Size</option>
              {sizeOptions}
            </select>
            <select className="overview-select" ref={qtyRef} onChange={changeQty} disabled={size === 'select-size'}>
              {quantityOptions}
            </select>
          </section>
          <h3>

          </h3>
          <div className="CartButton" onClick={AddToCart}>
            <div>
              <span className={togglePrice()}>{stylePrice}</span>{toggleSalePrice()}
            </div>
            -
            <div>
              Add to Cart
            </div>
          </div>
        </section>
        :
        <section>
          <span>OUT OF STOCK</span>
        </section>}
    </div>
  )
}

export default ProductDetails