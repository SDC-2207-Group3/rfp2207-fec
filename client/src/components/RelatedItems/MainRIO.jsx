import React, { useState, useEffect, useContext, useReducer, createContext } from 'react';
import axios from 'axios';
import http from './HttpReqs.js';
import RelatedItems from './RelatedItems.jsx';
import YourOutfits from './YourOutfits.jsx'
import Stars from './Stars.jsx';
import * as _ from 'underscore';
import { ProductContext } from '../App.jsx';
import outfitDetails from './YourOutfitData.js'

export const RIOContext = createContext();

const RelatedItemsAndOutfits = (props) => {
  const { id } = useContext(ProductContext);
  const [state, setState] = useReducer((state, newState) => ({...state, ...newState}),
  {mainProduct: {}, relatedItems: [], yourOutfits: []});

  useEffect(() => {
    setState({yourOutfits: outfitDetails})
  }, []);

  useEffect(() => {
    http.productReq(id)
      .then(res => setState({mainProduct: res.data}));

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
  }, [id]);

  console.log('--current state--', state);

  return (
    <section id="RIC-section">
      <RIOContext.Provider value={{...state, setState}}>
         <RelatedItems />
         <YourOutfits />
      </RIOContext.Provider>
    </section>
  )
}

export default RelatedItemsAndOutfits;
