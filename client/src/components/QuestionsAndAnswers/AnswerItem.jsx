import React, {useState} from 'react';
import http from "./httpReqsForQA.js";
// import {QuestionIDContext} from './QAEntry.jsx'

// "id": 5539374,
// "body": "jackky",
// "date": "2022-04-27T00:00:00.000Z",
// "answerer_name": "jackky",
// "helpfulness": 0,
// "photos": []

function AnswerItem({answer, question_id}) {
  const [yesCount, setYesCount] = useState(answer.helpfulness);
  const markAnswerAsHelpful = (answer_id, question_id) => {
    http.markAnswerAsHelpful(answer_id)
      .then((res) => http.getAnswer(question_id))
      .then((res) => {setYesCount(res.data.results.filter(i => i.answer_id === answer_id)[0].helpfulness)})
      .catch((err) => {console.error(err)})
  }

  // converting answer date stamp into Month DD, YYYY
  const options = {year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(answer.date).toLocaleDateString('en-US', options);

  return (
    <div className="answer-item-single-container">
      <div className="answer-item-single">
        <span className="answer-prefix">A: </span>
        <span className="answer-body">{answer.body}</span>
        <small className="qa-ref-link qa-push">Helpful?</small>
        <small
          className="qa-ref-link qa-mark"
          onClick={() => markAnswerAsHelpful(answer.id, question_id)}
        >
          Yes({yesCount})
        </small>
        <small className="qa-ref-link qa-mark">| Report</small>
      </div>
      <small>
        by {answer.answerer_name} on {date}
      </small>
    </div>
  )
}


export default AnswerItem;