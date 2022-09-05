import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard.jsx';
import { RIOContext } from './MainRIO.jsx';

const ItemCards = (props) => {
  const { relatedItems } = useContext(RIOContext);

  return (
    <div className="RIC-cards" style={props.style}>
      {relatedItems.map((product) =>
        <ProductCard key={`RI${product.id}`} product={product} mode={'related-item'} />
      )}
    </div>
  )
}

export default ItemCards;
