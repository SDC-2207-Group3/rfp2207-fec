import React, { useState, useEffect, useRef, useContext } from 'react';
import { ProductContext } from './../../App.jsx';
import axios from 'axios';

import RatingStars from './../../Utilities/RatingStars.jsx';
import SocialMediaSharing from './SocialMediaSharing.jsx';
import Atelier from "./../../Utilities/Atelier.jsx";

const truncatePrice = (price) => {
  return price.slice(price.length - 3, price.length) === '.00' ? price.slice(0, price.length - 3) : price
}

const ProductDetails = (props) => {

  const [size, setSize] = useState("select-size");
  const [qty, setQty] = useState("no-size");
  const [noSize, setNoSize] = useState(false);

  const qtyRef = useRef(null);
  const sizeRef = useRef(null);

  const { product_info, product_style, product_rating, placeholder } = useContext(ProductContext);

  const statePD = product_info;
  const statePS = product_style;
  const stateSS = props.selectedStyle;
  const statePR = product_rating.ratings ? product_rating.ratings : 0;

  // Product Details

// const category, name, features

  const name     = statePD.name     ? statePD.name     : "Product name unavailable";
  const category = statePD.category ? statePD.category : "Product Category Unavailable";
  const features = statePD.features ? statePD.features : [];

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
  const totalReviews = Object.values(statePR).reduce((memo, count) => memo + Number(count), 0);

  // Size Select

  function sizeAlert() {
    return noSize ? <article className="alert notification">Please select a size</article> : null;
  }

  function changeSize (e) {
    setSize(sizeRef.current.value)
  }

  useEffect(() => {
    setNoSize(false);
  }, [size, props.selectedStyle])

  useEffect(() => {
    setSize("select-size");
    sizeRef.current ? sizeRef.current.value = "select-size" : null;
  }, [props.selectedStyle])

  // Qty Select

  function changeQty (e) {
    setQty(qtyRef.current.value)
  }

  // Add to Cart

  function AddToCart () {
    if (size === 'select-size') {
      setNoSize(true);
      return;
    }

    const index = styleSizes.indexOf(size);
    const sku = styleSKUs[index]
    const quantity = qty === 'no-size' ? 1 : qty;

    let skuQuantities = [];
    for (let i = 0; i < qty; i++) { skuQuantities.push(Atelier.postItemtoCart(sku)) }
    return axios.all(skuQuantities)
      .catch((err) => console.log(err));
  }

  return (
    <div className="overview-productDetails">
      {totalReviews > 0 ? <section className="overview-rating-section">
        <RatingStars rating={productRating} />
        <h6 className="section-link"> <a className="section-link" href="#section_rr">Read all {totalReviews} reviews</a></h6>
      </section> : null}

      <section className="overview-pd-section">
        <h4 id="product-category">{category}</h4>
        <h2 className="product-title">{name}</h2>
      </section>

      <section className="overview-pd-section">
        <h5>
          Styles > {styleName}
        </h5>
        <div className="styles-container">
          {styles.map((style, index) =>
            <div key={index} className="style-thumbnail">
              <div
                className={"style-image-container" + (style === props.selectedStyle ? " style-selected" : "")}
                onClick={() => {props.setStyle(style)}}
              >
                <img className="style-image" src={style.photos[0].thumbnail_url ? style.photos[0].thumbnail_url : placeholder} alt="Style Thumbnail Unavailable"/>
              </div>
            </div>
          )}
        </div>
      </section>

      {features.length > 0 ?
      <section className="overview-pd-container">
        <h4 className="overview-h4">Features: </h4>
        <table className="overview-features-table">
          <tbody >
            {features.sort((a, b) => a.value === null ? 1 : -1).map((feature, index) =>{
              return feature.value ? (
                <tr key={index}>
                  <td className="overview-features">{feature.feature}: </td>
                  <td>{feature.value}</td>
                </tr>
              ) : (
                <tr key={index}>
                  <td>{feature.feature}</td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>
      </section> : null}

      {sizeOptions.length > 0 ?
        <section className="overview-pd-section">
          <section>
            {sizeAlert()}
            <select
              className="overview-select overview-size-select"
              ref={sizeRef}
              onChange={changeSize}
            >
              <option default value="select-size">Select Size</option>
              {sizeOptions}
            </select>
            <select className="overview-select overview-qty-select" ref={qtyRef} onChange={changeQty} disabled={size === 'select-size'}>
              {quantityOptions}
            </select>
          </section>
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
        <section className="overview-pd-section">
          <span className="alert">OUT OF STOCK</span>
        </section>}
        <SocialMediaSharing />
    </div>
  )
}

export default ProductDetails