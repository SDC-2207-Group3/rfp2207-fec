import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard.jsx';
import { DataContext } from './RelatedItems.jsx';

var RelatedProducts = (props) => {
  let data = useContext(DataContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data.slice(0, 4))
  }, [data])

  console.log('--data--', data, '--currProducts--', products)

  return (
    <div id="RIC-related-items">
      <p>related products here</p>
      <div id="RIC-ri-card-container">
        {products.map((product) =>
          <ProductCard key={product.id} product={product} mode="related-item" />
        )}
      </div>
    </div>
  )
}

export default RelatedProducts;