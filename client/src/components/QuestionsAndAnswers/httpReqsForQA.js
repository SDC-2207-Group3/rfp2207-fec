const axios = require('axios');

API = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp';

module.exports.getQuestions = (id) => axios.get(
  `${API}/qa/questions/?product_id=${id}&count=10`,
  {headers: {'Authorization': process.env.KEY}}
  );
module.exports.getAnswers = (question_id) => axios.get(
  `${API}/qa/questions/${question_id}/answers`,
  {headers: {'Authorization': process.env.KEY}}
  )
module.exports.postQuestion = (product_id, modalData) => axios.post(
  `${API}/qa/questions`,
  modalData,
  {headers: {'Authorization': process.env.KEY}}
)

