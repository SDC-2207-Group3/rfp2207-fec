import React from 'react';
import axios from 'axios';

import ImageGallery from './ImageGallery/ImageGallery.jsx';
import ProductDetails from './ProductDetails/ProductDetails.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return(
      <div>
        Overview
        <ImageGallery />
        <ProductDetails />
      </div>
    )
  }
}

export default Overview