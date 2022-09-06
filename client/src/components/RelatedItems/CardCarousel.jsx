import React, { useState, useEffect, useContext } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { RIOContext } from './MainRIO.jsx';
import ItemCards from './ItemCards.jsx';
import OutfitCards from './OutfitCards.jsx';
import Comparison from './Comparison.jsx';

const CardCarousel = (props) => {
  const [scrollAmount, setScroll] = useState(0)
  const [index, setIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const [product, setProduct] = useState({});
  const displayLimit = 4;
  const { mainProduct, relatedItems, yourOutfits} = useContext(RIOContext);
  const dataLength = props.mode === 'related-items' ? relatedItems.length : yourOutfits.length+1;

  useEffect(() => {
    setScroll(0);
    setIndex(0);
  }, [mainProduct])

  const leftClick = () => {
    setIndex(index - 1);
    if (index  === (dataLength - displayLimit + 1)) {
      setScroll(scrollAmount + (7.25 * window.innerWidth / 100))
    } else {
      setScroll(scrollAmount + (13.5 * window.innerWidth / 100))
    }
  }

  const rightClick = () => {
    setIndex(index + 1);
    if (index  === (dataLength - displayLimit)) {
      setScroll(scrollAmount - (7.25 * window.innerWidth / 100))
    } else {
      setScroll(scrollAmount - (13.5 * window.innerWidth / 100))
    }
  }

  const scrollCSS = {
    transform: `translateX(${scrollAmount}px)`
  }

  let featureCollection = [];
  for (let index in mainProduct.features) {
    let featureInput = {};
    let item = mainProduct.features[index]
    featureInput.name = item.feature;
    item.value ? featureInput.main = item.value : featureInput.main = true;
    featureCollection.push(featureInput);
  }

  const openModal = (product) => {
    setModal(true);
    setProduct(product);
  };
  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="RIC-card-carousel">
      {modal ? <Comparison key={product.id} close={closeModal} features={featureCollection} product={product}/> : null}
      <div className="RIC-arrow-div">{index === 0 ? null : <span onClick={() => leftClick()} ><ChevronLeft className="RIC-left" size={30}/></span>}</div>
      <div className="RIC-carousel-view">
        {props.mode === 'related-items' ?
          <ItemCards open={openModal} style={scrollCSS} /> :
          <OutfitCards style={scrollCSS}/>}
      </div>
      <div className="RIC-arrow-div">{index <= dataLength - displayLimit ? <span onClick={() => rightClick()} ><ChevronRight className="RIC-right" size={30} /></span> : null}</div>
    </div>
  )
}

export default CardCarousel;