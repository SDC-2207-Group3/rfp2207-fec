import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from './../Overview.jsx';

const ProductDetails = (props) => {

  const { state, dispatch } = useContext(ProductContext);

  const statePD = state.productDetails;
  const statePS = state.productStyles;
  const stateSS = state.selectedStyle;

  // Product Details

// const category, description, features, name, slogan

const category = statePD.category ? statePD.category : "Product Category Unavailable";
const description = statePD.description ? statePD.description : "Product Description Unavailable";
const features = statePD.features ? statePD.features : [];
const name = statePD.name ? statePD.name : "Product name unavailable";
const slogan = statePD.slogan ? statePD.slogan : "Product slogan Unavailable"


// Product Styles

const styles = statePS.results ? statePS.results : [];

// Selected Styles

const styleName = stateSS.name ? stateSS.name : "No style"
const stylePrice = stateSS.original_price ? `$ ${stateSS.original_price}` : "Price Unavailable";


const styleSizes   = stateSS.skus ? Object.keys(stateSS.skus).map((sku) => stateSS.skus[sku].size) : null;
const styleSizeQty = stateSS.skus ? Object.keys(stateSS.skus).map((sku) => stateSS.skus[sku].quantity) : null;

// Rating



const Details = [category, name, slogan, description, stylePrice];

  return (
    <div className="overview-productDetails">
      {console.log(state)}

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
      {features.map((feature, index) =>
        <p key={index}>{feature.feature}: {feature.value}</p>
      )}

      {styleSizes ?
        <div>
          <p>
            Size: {" "}
            <select className="overview-size-select">
              <option default value="select-size">Select Size</option>
              {styleSizes.map((size, index) => <option key={index} value={size}>{size}</option>)}
            </select>
          </p>
          <p>
            Qty: {" "}
            <select className="overview-qty-select">
              <option default value="no-size">-</option>
              {styleSizes.map((size, index) => <option key={index} value={size}>{size}</option>)}
            </select>
          </p>
        </div> :
        null}
        <div className="CartButton">Add to Cart</div>
    </div>
  )
}

export default ProductDetails