import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import http from './HttpReqs.js';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfits from './YourOutfits.jsx'
import Stars from './Stars.jsx';
import * as _ from 'underscore';
import { IdContext } from '../App.jsx';
import CardCarousel from './CardCarousel.jsx'
import outfitDetails from './YourOutfitData.js'

const RelatedItems = (props) => {
  const { id } = useContext(IdContext);
  const [data, setData] = useState([]);
  const [related, setRelated] = useState([]);
  const [mainProductDetail, setMainProductDetail] = useState({});

  useEffect(() => {
    http.productReq(id)
      .then((res) => {setMainProductDetail(res.data);});
    http.relatedReq(id)
    .then(res => setRelated(_.uniq(res.data)))
    .catch(err => console.error(err));
  }, [id])

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

  console.log('--related ids--', related, 'main', mainProductDetail);

  return (
    <section id="RIC-section">
      <CardCarousel data={outfitDetails}/>
      {/* <RelatedProducts main={mainProductDetail} data={data}/> */}
      {/* <YourOutfits main={mainProductDetail}/> */}
    </section>
  )
}

export default RelatedItems;
