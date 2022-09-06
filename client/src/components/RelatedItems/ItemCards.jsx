import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard.jsx';
import { RIOContext } from './MainRIO.jsx';

const ItemCards = (props) => {
  const { relatedItems } = useContext(RIOContext);
  const { mainProduct } = useContext(RIOContext);
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
      {relatedItems.map((product) =>
        <ProductCard key={`RI${product.id}`} open={props.open} product={product} mode={'related-item'} />
      )}
    </div>
  )
}

export default ItemCards;
