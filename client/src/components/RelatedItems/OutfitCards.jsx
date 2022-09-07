import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard.jsx';
import { RIOContext } from './MainRIO.jsx';
import { Plus } from 'react-feather'

const OutfitCards = (props) => {
  const { mainProduct, yourOutfits, setState } = useContext(RIOContext);

  const addToOutfitList = () => {
    if (yourOutfits.find(({id}) => id === mainProduct.id)) {
      return;
    }
    console.log('addToOutfitList clicked');
    let tempOutfits = yourOutfits.slice();
    tempOutfits.unshift(mainProduct);

    setState({yourOutfits: tempOutfits});
  }

  const deleteFromOutfitList = (id) => {
    let tempOutfits = yourOutfits.filter(function(item) { return item.id !== id; });
    setState({yourOutfits: tempOutfits});
  }

  return (
    <div className="RIC-cards" style={props.style}>
      <div className="RIC-product-card-div" id="RIC-add-card">
        <span id="RIC-add-card-span" onClick={() => addToOutfitList()}>
          <Plus id="RIC-add-btn" />
          <p id="RIC-add-text">Add to Outfit</p>
        </span>
      </div>
      {yourOutfits.map((product) =>
        <ProductCard key={`YO${product.id}`} delete={deleteFromOutfitList} product={product} mode={'outfits'} />
      )}
    </div>
  )
}

export default OutfitCards;