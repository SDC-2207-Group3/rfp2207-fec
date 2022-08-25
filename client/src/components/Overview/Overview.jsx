import React from 'react';
import axios from 'axios';
import key from './AUTH.js';

import ImageGallery from './ImageGallery/ImageGallery.jsx';
import ProductDetails from './ProductDetails/ProductDetails.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prodStyles: {},
      prodID: '65631',
      prodDetails: {},
      selectedStyle: {},
    }
    this.GetProductData = this.GetProductData.bind(this);
    this.AtelierGetEndpoint = this.AtelierGetEndpoint.bind(this);
    this._AtelierAPI = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/';
  }

  AtelierGetEndpoint(endpoint = '') {
    // console.log(process.env.REACT_APP_KEY)
    return axios({
      url: this._AtelierAPI + endpoint,
      method: 'get',
      headers: {"Authorization": key}
    })
  }

  GetProductData(productID) {
    return axios.all([
      this.AtelierGetEndpoint(productID),
      this.AtelierGetEndpoint(productID + '/styles')
    ])
    .then(axios.spread((...responses) => {
      this.setState({
        prodDetails: responses[0].data,
        prodStyles: responses[1].data
      })
    }))
    .catch((err) => console.log(err));
  }

  componentDidMount () {
    this.GetProductData(this.state.prodID)
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