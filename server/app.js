require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
const REVIEWS_API= "URL_HERE";
const QA_API = "URL_HERE";
const PRODUCTS_API = "URL_HERE";
const header = { headers: { Authorization: process.env.KEY }}


//connect
const app = express();
app.use(express.static(path.join(__dirname, './client/dist')))//fix this
//add middleware
app.use(morgan('dev'));
app.use(express.json());

// =============== PRODUCTS API ROUTES ===============


// =============== QANDA API ROUTES ===============
app.get('qa/question/....', (req, res) => {
  const question_id = req.question_id;
  axios.get(`${QA_API}/qa/questions/${question_id}/answers`, header)
})

// =============== REVIEWS API ROUTES ===============



app.listen(process.env.PORT, () => {
  console.log(`FEC server listening on port ${process.env.PORT}`)
})