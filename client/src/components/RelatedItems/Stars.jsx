import React, { useState, useEffect, useContext } from 'react';
import { Star } from 'react-feather';
import { DataContext } from './RelatedItems.jsx'

var Stars = (props) => {
  let width = 100 - Math.round(props.rating / 5 * 100);

  return (
    <div className="RIC-stars-container">
      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="RIC-star" />)}
      <div className="RIC-star-cover" style={{ width: `${width}%`}}></div>
    </div>
  )
}

export default Stars;