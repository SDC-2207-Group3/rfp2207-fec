import React from 'react';
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import http from './HttpReqs.js';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfits from './YourOutfits.jsx'
import Stars from './Stars.jsx'

export const DataContext = createContext();

export const RelatedItems = (props) => {
  const [mainProductId, setId] = useState(props.id || 65631);
  const [data, setData] = useState([]);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    http.relatedReq(mainProductId)
    .then(res => setRelated(res.data))
    .catch(err => console.error(err));
  }, [mainProductId])

  useEffect(() => {
    var reqArr = [];
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
      setData(newData);
    });
  }, [related])

    console.log('--this.state.data--', data, '--this.state.related--', related);

  return (
    <DataContext.Provider value={data}>
      <h4>Related Items and Comparison Here =D</h4>
      <RelatedProducts />
      <YourOutfits />
    </DataContext.Provider>
  )
}

