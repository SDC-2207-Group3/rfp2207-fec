import React, { useState, useEffect, useContext, useReducer, createContext } from 'react';
import axios from 'axios';
import http from './HttpReqs.js';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfits from './YourOutfits.jsx'
import Stars from './Stars.jsx';
import * as _ from 'underscore';
import { IdContext } from '../App.jsx';
import CardCarousel from './CardCarousel.jsx'
import outfitDetails from './YourOutfitData.js'

export const RIOContext = createContext();

const RelatedItemsAndOutfits = (props) => {
  const { id } = useContext(IdContext);
  const [state, setState] = useReducer((state, newState) => ({...state, ...newState}),
  {main: {}, relatedItems: [], yourOutfits: []});

  useEffect(() => {
  http.productReq(id)
    .then(res => setState({main: res.data}));

  http.relatedReq(id)
    .then(res => {
      let related = _.uniq(res.data);
      let reqArr = [];
      related.map((id) => {
        let promises = Promise.all([
          http.productReq(id),
          http.styleReq(id),
          http.reviewReq(id)
        ])
        reqArr.push(promises);
      });
      axios.all(reqArr)
        .then(responses => {
          let newData = [];
          responses.forEach((res) => {
            newData.push(http.dataParser(res));
          })
          setState({relatedItems: newData});
        });
    })
    .catch(err => console.error(err));
  }, [id])

  console.log('--current state--', state);

  return (
    <section id="RIC-section">
      <RIOContext.Provider value={{...state}}>
        <CardCarousel data={outfitDetails}/>
        {/* <RelatedProducts main={mainProductDetail} data={data}/> */}
        {/* <YourOutfits main={mainProductDetail}/> */}
      </RIOContext.Provider>
    </section>
  )
}

export default RelatedItemsAndOutfits;
