import React from 'react';
import Stars from './Stars.jsx';

var ProductCard = (props) => {
  // const rating = React.useContext(DataContext);
  // console.log('--use context--', rating);
  return (
    <div>
      <p>this is a product card</p>
      <Stars />
    </div>
  )
}

export default ProductCard;