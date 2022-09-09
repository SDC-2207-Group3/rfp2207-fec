import React, { useState, useEffect, useContext, useReducer, createContext } from 'react';
import axios from 'axios';
import Atelier from '../Utilities/Atelier.jsx';
import Helper from '../Utilities/Helper.jsx'
import RelatedItems from './RelatedItems.jsx';
import YourOutfits from './YourOutfits.jsx'
import * as _ from 'underscore';
import { ProductContext } from '../App.jsx';

export const RIOContext = createContext();

const RelatedItemsAndOutfits = (props) => {
  const { id, product_style, product_rating, product_parsed_data} = useContext(ProductContext);
  const [state, setState] = useReducer((state, newState) => ({...state, ...newState}),
  {mainProduct: {}, relatedItems: [], yourOutfits: []});

  useEffect(() => {
    let outfitCookie = document.cookie.split('outfit=')[1];
    if (outfitCookie) {
      setState({yourOutfits: JSON.parse(outfitCookie)})
    } else {
      setState({yourOutfits: []})
    }
  }, []);

  useEffect(() => {
    Atelier.getRelatedProductIds(id)
      .then(res => {
       let related = _.uniq(res.data);
       related.filter((relatedId) => relatedId !== id);
       let reqArr = [];
       related.map((id) => {
        let promises = Promise.all([
          Atelier.getProductInfo(id),
          Atelier.getProductStyle(id),
          Atelier.getReviewMetaData(id)
        ])
        reqArr.push(promises);
       });
      axios.all(reqArr)
        .then(responses => {
          let newData = [];
          responses.forEach((res) => {
            newData.push(Helper.dataParser(res));
          })
          setState({relatedItems: newData});
        });
    })
    .catch(err => console.error(err));
  }, [id]);

  useEffect(() => {
    setState({mainProduct: product_parsed_data});
  }, [product_parsed_data])

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
