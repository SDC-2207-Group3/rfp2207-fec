import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import outfitsDetails, {outfitIds} from './YourOutfitData.js';
import http from './HttpReqs.js';
import { ChevronLeft, ChevronRight } from 'react-feather';

var YourOutfits = (props) => {
  const [outfits, setOutfits] = useState(outfitIds);
  const [data, setData] = useState(outfitsDetails);
  const [scrollAmount, setScroll] = useState(0)
  const [index, setIndex] = useState(0);
  const displayLimit = 4;

  // useEffect(() => {
  //   var reqArr = [];
  //   outfits.map((id) => {
  //     console.log(id);
  //     let promises = Promise.all([
  //       http.productReq(id),
  //       http.styleReq(id),
  //       http.reviewReq(id)
  //     ])
  //     reqArr.push(promises);
  //   });
  //   axios.all(reqArr)
  //   .then(responses => {
  //     let newData = [];
  //     responses.forEach((res) => {
  //       newData.push(http.dataParser(res));
  //     })
  //     setData(newData);
  //   });
  // });

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

  console.log('--your outfits data--', data);

  return (
    <div id="RIC-your-outfits">
      <div id="RIC-outfits-header"><p>your outfits here</p></div>
      <div id="RIC-outfits-carousel">
        <div className="RIC-arrow-div">{index === 0 ? null : <span onClick={() => leftClick()} ><ChevronLeft id="RIC-left" size={30}/></span>}</div>
        <div id="RIC-outfits-view">
          <div id="RIC-outfits-cards">
            <div id="RIC-add-outfit">Add to Outfits</div>
            {data.map((product) => {
              return <ProductCard main={props.main} key={product.id} product={product} mode={'outfit'}/>
            })}
          </div>
        </div>
        <div className="RIC-arrow-div">{index <= data.length - displayLimit ? <span onClick={() => rightClick()} ><ChevronRight id="RIC-right" size={30} /></span> : null}</div>
      </div>
    </div>
  )
}

export default YourOutfits;