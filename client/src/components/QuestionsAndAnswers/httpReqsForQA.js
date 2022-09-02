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
module.exports.postAnswer = (product_id, question_id, modalData) => axios.post(
  `${API}/qa/questions/${question_id}/answers`,
  modalData,
  {headers: {'Authorization': process.env.KEY}}
)
module.exports.markQuestionAsHelpful = (question_id, product_id) => axios.put(
  `${API}/qa/questions/${question_id}/helpful`,
  {question_id: question_id},
  {headers: {'Authorization': process.env.KEY}}
)
module.exports.markAnswerAsHelpful = (answer_id) => axios.put(
  `${API}/qa/answers/${answer_id}/helpful`,
  {answer_id: answer_id},
  {headers: {'Authorization': process.env.KEY}}
)
module.exports.getAnswer = (question_id) => axios.get(
  `${API}/qa/questions/${question_id}/answers`,
  {headers: {'Authorization': process.env.KEY}}
)
module.exports.reportAnswer = (answer_id) => axios.put(
  `${API}/qa/answers/${answer_id}/report`,
  {answer_id: answer_id},
  {headers: {'Authorization': process.env.KEY}}
)
module.exports.reportQuestion = (question_id) => axios.put(
  `${API}/qa/questions/${question_id}/report`,
  {question_id: question_id},
  {headers: {'Authorization': process.env.KEY}}
)
module.exports.getProductName = (product_id) => axios.get(
  `${API}/products/${product_id}`,
  {headers: {'Authorization': process.env.KEY}}
)