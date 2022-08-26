const axios = require('axios');

API = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp';

module.exports.relatedReq = (id) => axios.get(`${API}/products/${id}/related`, {headers: {'Authorization': process.env.KEY}});

module.exports.productReq = (id) => axios.get(`${API}/products/${id}`, {headers: {'Authorization': process.env.KEY}});

module.exports.styleReq = (id) => axios.get(`${API}/products/${id}/styles`, {headers: {'Authorization': process.env.KEY}});

module.exports.reviewReq = (id) => axios.get(`${API}/reviews/meta?product_id=${id}`, {headers: {'Authorization': process.env.KEY}});

module.exports.dataParser = (raw) => {
  let { results } = raw[1].data;
  let curr = results.find((style) => style["default?"]);
  curr ? null : curr = results[0];
  let { ratings } = raw[2].data;

  let count = Object.values(ratings).reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0);
  let product = 0;
  for (const key in ratings) {
    product += key * ratings[key];
  }
  let percent = (product / count).toFixed(1);

  let parsed = {
    id: raw[0].data.id,
    name: raw[0].data.name,
    category: raw[0].data.category,
    features: raw[0].data.features,
    img: curr.photos[0].thumbnail_url,
    original_price: curr.original_price,
    sale_price: curr.sale_price,
    ratings: percent
  };

  return parsed;
}

