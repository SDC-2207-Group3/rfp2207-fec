import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard.jsx';
import http from './HttpReqs';
import { IdContext } from '../App.jsx'
import { ChevronLeft, ChevronRight } from 'react-feather';

var RelatedProducts = (props) => {
  const [mainProductDetail, setDetail] = useState({});
  const [currDisplay, setDisplay] = useState([]);
  const [index, setIndex] = useState([0, 4]);
  let id = useContext(IdContext);

  useEffect(() => {
    setDisplay(props.data.slice(...index))
  }, [props.data])
  useEffect(() => {
    http.productReq(id)
      .then((res) => {setDetail(res.data)})
  }, [])

  const leftClick = () => {
    let copy = index.slice()
    setIndex([copy[0] + 1, copy[1] + 1])
  }

  const rightClick = () => {
    let copy = index.slice()
    setIndex([copy[0] - 1, copy[1] - 1])
  }

  return (
    <div id="RIC-related-items">
      <div id="RIC-related-header"><p>related products here</p></div>
      <div id="RIC-ri-card-container">
        {index[0] === 0 ? null : <span onClick={() => leftClick()} id="RIC-left"><ChevronLeft size={30}/></span>}
        {currDisplay.map((product) => {
          return <ProductCard main={mainProductDetail} key={product.id} product={product} mode={'related-item'}/>
        })}
        {index[1] === props.data.length ? <span onClick={() => rightClick()} id="RIC-right"><ChevronRight size={30} /></span> : null}
      </div>
      <div id="RIC-fade-div"></div>
    </div>
  )
}

export default RelatedProducts;