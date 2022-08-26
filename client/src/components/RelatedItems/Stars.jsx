import React, { useState, useEffect, useContext } from 'react';
import { Star } from 'react-feather';
import { DataContext } from './RelatedItems.jsx'

var Stars = (props) => {
  const [rating, setRating] = useState(0);
  const [width, setWidth] = useState(100);
  let data = useContext(DataContext);

  useEffect(() => {
    if (data.length) {
      setRating(data[3].ratings)
    }
  }, [data]);

  useEffect(() => {
    if (data.length) {
      setWidth(100 - Math.round(rating / 5 * 100));
    }
  }, [rating]);

  return (
    <div className="RIC-stars-container">
      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="RIC-star" />)}
      <div className="RIC-star-cover" style={{ width: `${width}%`}}></div>
    </div>
  )
}

export default Stars;