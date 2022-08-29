import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from './../Overview.jsx';

const ProductDetails = (props) => {

  const { state } = useContext(ProductContext);

  const statePD = state.productDetails;
  const statePS = state.productStyles;
  const stateSS = state.selelctedStyles;

// Product Details

// const category, description, features, name, slogan

const category = statePD.category ? statePD.category : "Product Category Unavailable";
const description = statePD.description ? statePD.description : "Product Description Unavailable";
const features = statePD.features ? statePD.features : [];
const name = statePD.name ? statePD.name : "Product name unavailable";
const slogan = statePD.slogan ? statePD.slogan : "Product slogan Unavailable"

// Product Styles



// Selected Styles



// Rating

  return (
    <div id='test' className="overview-productDetails">
      {console.log(state)}
      Product Details
    </div>
  )
}

export default ProductDetails