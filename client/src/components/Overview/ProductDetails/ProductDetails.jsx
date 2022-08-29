import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from './../Overview.jsx';

const ProductDetails = (props) => {

  const { state } = useContext(ProductContext);

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

const Details = [category, name, slogan, description];

// Product Styles

const styles = statePS.results ? statePS.results : [];

// Selected Styles

const styleName = stateSS.name ? stateSS.name : "No style"

// Rating

  return (
    <div className="overview-productDetails">
      {console.log(state)}
      Product Details
      {Details.map((detail) =>
        <div>{detail}</div>
      )}
    </div>
  )
}

export default ProductDetails