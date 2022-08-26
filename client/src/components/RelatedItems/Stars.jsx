import React from 'react';
import { Star } from 'react-feather';
import { useState, useEffect, useContext } from 'react';
import { DataContext } from './RelatedItems.jsx'

var Stars = (props) => {
  const [rating, setRating] = useState(2.2);

  var percent = Math.round(rating / 5 * 100);
  return (
    <div className="RIC-stars-container">
      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="RIC-star" />)}
      <div className="RIC-star-cover" style={{ width: `${100 - percent}%`}}></div>
    </div>
  )
}

export default Stars;