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
const stylePrice = stateSS.original_price ? `$ ${stateSS.original_price}` : "Price Unavailable"

// Rating



const Details = [category, name, slogan, description, stylePrice];

  return (
    <div className="overview-productDetails">
      {/* {console.log(state)} */}
      Product Details
      {Details.map((detail, index) =>
        <p key={index}>
          {detail}
        </p>
      )}
      <p>Styles:</p>
      <div className="styles-container">
        {styles.map((style, index) =>
          <div key={index} className="style-thumbnail">
            <div className="style-image-container" onClick={() => {dispatch({ type: 'selectStyle', selectStyle: style})}}>
              <img className="style-image" src={style.photos[0].thumbnail_url} alt="Style Thumbnail Unavailable"/>
            </div>
          </div>
        )}
      </div>

      <p>Features: </p>
      {features.map((feature, index) =>
        <p key={index}>{feature.feature}: {feature.value}</p>
      )}
    </div>
  )
}

export default ProductDetails