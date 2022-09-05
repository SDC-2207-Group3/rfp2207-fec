import React, { useState, useEffect, useContext } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

var CardCarousel = (props) => {
  const [scrollAmount, setScroll] = useState(0)
  const [index, setIndex] = useState(0);
  const displayLimit = 4;

  const leftClick = () => {
    setIndex(index - 1);
    if (index  === (props.data.length - displayLimit + 1)) {
      setScroll(scrollAmount + (7.25 * window.innerWidth / 100))
    } else {
      setScroll(scrollAmount + (13.5 * window.innerWidth / 100))
    }
  }

  const rightClick = () => {
    setIndex(index + 1);
    if (index  === (props.data.length - displayLimit)) {
      setScroll(scrollAmount - (7.25 * window.innerWidth / 100))
    } else {
      setScroll(scrollAmount - (13.5 * window.innerWidth / 100))
    }
  }

  const scrollCSS = {
    transform: `translateX(${scrollAmount}px)`
  }

  return (
    <div className="RIC-card-carousel">
      <div className="RIC-arrow-div">{index === 0 ? null : <span onClick={() => leftClick()} ><ChevronLeft className="RIC-left" size={30}/></span>}</div>
      <div className="RIC-carousel-view">
        <div className="RIC-cards" style={scrollCSS}>
          {/*  conditionally plug in a set of cards to render  */}
          {props.cards}
        </div>
      </div>
      <div className="RIC-arrow-div">{index <= props.data.length - displayLimit ? <span onClick={() => rightClick()} ><ChevronRight className="RIC-right" size={30} /></span> : null}</div>
    </div>
  )
}

export default CardCarousel;