import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard.jsx';
import http from './HttpReqs';
import { IdContext } from '../App.jsx'
import { ChevronLeft, ChevronRight } from 'react-feather';

var RelatedProducts = (props) => {
  const [mainProductDetail, setDetail] = useState({});
  const [scrollAmount, setScroll] = useState(0)
  const [index, setIndex] = useState(0);
  const displayLimit = 4;
  let { id }  = useContext(IdContext);

  useEffect(() => {
    http.productReq(id)
      .then((res) => {setDetail(res.data);});
  }, [])

  const calculateScroll = () => {
    return
  }

  const leftClick = () => {
    setIndex(index - 1);
    // if (index === 1) {
    //   setScroll(0);
    // } else {
    //   setScroll(scrollAmount + 100/props.data.length);
    // }
    setScroll(scrollAmount + (13.5 * window.innerWidth / 100))
  }

  const rightClick = () => {
    setIndex(index + 1);
    // if (index === (props.data.length - displayLimit)) {
    //   setScroll(scrollAmount - (100/props.data.length/2) - 2);
    // } else {
    //   setScroll(scrollAmount - 100/props.data.length);
    // }

    setScroll(scrollAmount - (13.5 * window.innerWidth / 100))
  }

  const scrollCSS = {
    transform: `translateX(${scrollAmount}px)`
  }

  return (
    <div id="RIC-related-items">
      <div id="RIC-related-header"><p>related products here</p></div>
      <div id="RIC-ri-carousel">
        <div className="RIC-arrow-div">{index === 0 ? null : <span onClick={() => leftClick()} ><ChevronLeft id="RIC-left" size={30}/></span>}</div>
        <div id="RIC-ri-view">
          <div id="RIC-ri-cards" style={scrollCSS}>
            {props.data.map((product) => {
            return <ProductCard main={mainProductDetail} key={product.id} product={product} mode={'related-item'}/>
            })}
          </div>
        </div>
        <div className="RIC-arrow-div">{index <= props.data.length - displayLimit ? <span onClick={() => rightClick()} ><ChevronRight id="RIC-right" size={30} /></span> : null}</div>

      </div>
    </div>
  )
}

export default RelatedProducts;