import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard.jsx';
import { RIOContext } from './MainRIO.jsx';

const ItemCards = (props) => {
  const { relatedItems, mainProduct } = useContext(RIOContext);
  let featureCollection = [];
  for (let index in mainProduct.features) {
    let featureInput = {};
    let item = mainProduct.features[index]
    featureInput.name = item.feature;
    item.value ? featureInput.main = item.value : featureInput.main = true;
    featureCollection.push(featureInput);
  }

  return (
    <div className="RIC-cards" style={props.style}>
      {relatedItems.length ? relatedItems.map((product) =>
        <ProductCard key={`RI${product.id}`} open={props.open} product={product} mode={'related-item'} />
      )
      : <div id="RIC-no-related-items"><p>No related products ...</p></div>}
    </div>
  )
}

export default ItemCards;
