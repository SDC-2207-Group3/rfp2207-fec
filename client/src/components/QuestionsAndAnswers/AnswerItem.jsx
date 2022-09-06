import React, {useState} from 'react';
import http from "../Utilities/Atelier.jsx";


function AnswerItem({answer, question_id}) {

  // hook for tracking whether or not an answer is marked helpful
  const [helpfulClicked, setHelpfulClicked] = useState(false);

  // hook for tracking answer helpfulness
  const [yesCount, setYesCount] = useState(answer.helpfulness);

  const markAnswerAsHelpful = (answer_id, question_id) => {
    // disable additional clicks
    setHelpfulClicked(true);
    // make http requests and update helpfulness count
    http.markAnswerAsHelpful(answer_id)
      .then((res) => http.getAnswer(question_id))
      .then((res) => {setYesCount(res.data.results.filter(i => i.answer_id === answer_id)[0].helpfulness)})
      .catch((err) => {console.error(err)})
  }

  // hook for tracking whether an answer is reported
  const [reportClicked, setReportClicked] = useState(false);

  const reportAnswer = (answer_id) => {
    setReportClicked(true);
    http.reportAnswer(answer_id)
      .then((res) => {return;})
      .catch((err) => {console.error(err)})
  }

  // converting answer date stamp into Month DD, YYYY
  const options = {year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(answer.date).toLocaleDateString(undefined, options);


  return (
    <div className="answer-item-single-container">
      <div className="answer-item-single">
        <span className="answer-prefix">A: </span>
        <div className="answer-body">
          {answer.body}
          <div className="answer-body answer-image">
          {answer.photos.length > 0
          &&
          answer.photos.map((image, index) => <img key={index} className="answer-image-file" src={image}/> )
          }
          </div>
        </div>
        <small className="align-small qa-ref-link qa-push">Helpful?</small>
        <small
          className={`align-small qa-ref-link qa-mark helpful-hover ${helpfulClicked ? "noClick" : ""}`}
          onClick={() => markAnswerAsHelpful(answer.id, question_id)}
        >
          Yes({yesCount})
        </small>
        <small
          className={`qa-ref-link q-separator qa-mark`}
        >
          |
        </small>
        <small
          className={`align-small qa-ref-link qa-mark report-hover ${reportClicked ? "qa-reported" : ""} ${reportClicked ? "noClick" : ""}`}
          onClick={() => reportAnswer(answer.id)}
        >
          {`${reportClicked ? "Reported" : "Report"}`}
        </small>
      </div>
      <small>
        by {answer.answerer_name} on {date}
      </small>
    </div>
  )
}


export default AnswerItem;