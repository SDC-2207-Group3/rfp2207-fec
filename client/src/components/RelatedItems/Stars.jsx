import React, { useState, useEffect, useContext } from 'react';
import { Star } from 'react-feather';

var Stars = (props) => {
  let width = 100 - Math.round(props.rating / 5 * 100);

  return (
    <div className="RIC-stars-container">
      {[...Array(5)].map(i => <Star key={i} className="RIC-star" />)}
      <div className="RIC-star-cover" style={{ width: `${width}%`}}></div>
    </div>
  )
}

export default Stars;