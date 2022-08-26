import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

import ImageGallery from './ImageGallery/ImageGallery.jsx';
import ProductDetails from './ProductDetails/ProductDetails.jsx';

const _AtelierAPI = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/';
const initialeState = { productStyles: [], productDetails: {}, selectedStyle: {} }

const AtelierGetEndpoint = (endpoint = '') => {
  return axios({
    url: _AtelierAPI + endpoint,
    method: 'get',
    headers: {"Authorization": process.env.KEY}
  })
}

function FindDefaultStyle (styles) {
  let defaultStyle = styles.filter((style) => style['default?'] === true);
  return defaultStyle.length === 1 ? defaultStyle[0] : styles[0];
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'setStyles':
      return { ...state, productStyles: action.setStyles }
    case 'setDetails':
      return { ...state, productDetails: action.setDetails }
    case 'selectStyle':
      return { ...state, selectedStyle: action.selectStyle }
    case 'setAll':
      return {
        selectedStyle: action.selectedStyle,
        productDetails: action.setDetails,
        productStyles: action.setStyles }
    default:
      return { state }
  }
}

const Overview = (props) => {

  const [state, dispatch] = useReducer(reducer, initialeState)

  const GetProductData = (productID) => {
    return axios.all([
      AtelierGetEndpoint(productID),
      AtelierGetEndpoint(productID + '/styles')
    ])
    .then((responses) => {
      dispatch({
        type: 'setAll',
        setDetails: responses[0].data,
        setStyles: responses[1].data,
        selectedStyle: FindDefaultStyle(responses[1].data.results)
      })
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    GetProductData(props.id)
  }, [])

  return (
    <div>
      Overview
      <ImageGallery productStyle = {state.selectedStyle}/>
      {state.productDetails.name}
      {state.selectedStyle.name}
      <ProductDetails productDetails = {state.productDetails}/>
    </div>
  )
}

export default Overview