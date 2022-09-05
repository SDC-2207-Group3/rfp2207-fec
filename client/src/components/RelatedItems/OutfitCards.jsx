import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard.jsx';
import { RIOContext } from './MainRIO.jsx';

const OutfitCards = (props) => {
  const { yourOutfits } = useContext(RIOContext);

  return (
    <div className="RIC-cards" style={props.style}>
      {yourOutfits.map((product) =>
        <ProductCard key={`YO${product.id}`} product={product} mode={'outfits'} />
      )}
    </div>
  )
}

export default OutfitCards;