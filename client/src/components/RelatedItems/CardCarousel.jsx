import React, { useState, useEffect, useContext } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { RIOContext } from './MainRIO.jsx';
import ItemCards from './ItemCards.jsx';
import OutfitCards from './OutfitCards.jsx';

var CardCarousel = (props) => {
  const [scrollAmount, setScroll] = useState(0)
  const [index, setIndex] = useState(0);
  const displayLimit = 4;
  const state = useContext(RIOContext);
  const dataLength = props.mode === 'related-items' ? state.relatedItems.length : state.yourOutfits.length;

  console.log(props.mode, dataLength);

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

  console.log('--RIO Context--', state)

  return (
    <div className="RIC-card-carousel">
      <div className="RIC-arrow-div">{index === 0 ? null : <span onClick={() => leftClick()} ><ChevronLeft className="RIC-left" size={30}/></span>}</div>
      <div className="RIC-carousel-view">
        {props.mode === 'related-items' ?
          <ItemCards style={scrollCSS} /> :
          <OutfitCards style={scrollCSS}/>}
      </div>
      <div className="RIC-arrow-div">{index <= dataLength - displayLimit ? <span onClick={() => rightClick()} ><ChevronRight className="RIC-right" size={30} /></span> : null}</div>
    </div>
  )
}

export default CardCarousel;