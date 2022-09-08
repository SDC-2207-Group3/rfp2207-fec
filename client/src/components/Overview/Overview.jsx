import React, { useReducer, useEffect, useContext, useState } from 'react';
import axios from 'axios';

import { ProductContext } from './../App.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import ProductDetails from './ProductDetails/ProductDetails.jsx';

function FindDefaultStyle (styles) {
  let defaultStyle = styles.filter((style) => style['default?'] === true);
  return defaultStyle.length === 1 ? defaultStyle[0] : styles[0];
}

const Overview = (props) => {

  const [style, setStyle] = useState({});

  const { product_info, product_style } = useContext(ProductContext);

  useEffect(() => {
    product_style.results? setStyle(FindDefaultStyle(product_style.results)) : null
  }, [product_info])

  const slogan = product_info.slogan ? product_info.slogan : "Product Slogan Unavailable";
  const description = product_info.description ? product_info.description : "Product Description Unavailable"
  const features    = product_info.features    ? product_info.features    : []


  return (
    <div className="overview">
      <div className = "overview-left">
        <ImageGallery productStyle = {style} />
        <div className="overview-description">
          <section className="overview-slogan">
            <h4 className="overview-h4">{slogan}</h4>
            <p>{description}</p>
          </section>
        </div>
      </div>
      <div className="overview-right">
        <ProductDetails selectedStyle={style} setStyle={setStyle}/>
      </div>
    </div>
  )
}

export default Overview