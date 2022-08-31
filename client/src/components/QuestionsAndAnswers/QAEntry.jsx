import React from 'react';
import {useState} from "react";
import AnswerModal from "./AnswerModal.jsx";
import {qaDummyData} from "./qaDummyData.js";
import AnswerItem from "./AnswerItem.jsx";
import http from "./httpReqsForQA.js";


function QAEntry({product_id, question, onToggle, active, mainQA, setQA}) {
  // // state hook for displaying answer data from server get request
  // const [mainAnswer, setAnswer] = useState([]);

  // initializing state for  answer modals
  const [openAnswerModal, setOpenAnswerModal] = useState(false);

  // state hook for showing more answers
  const [answersCount, incrementAnswers] = useState(2)


  const markQuestionAsHelpful = (question_id, product_id) => {
    http.markQuestionAsHelpful(question_id, product_id)
      .then((res) => http.getQuestions(product_id))
      .then((res) => {setQA(res.data.results)})
      .catch((err) => {console.error(err)})
  }

  return(
    <li key={question.question_id} className={`qa-accordion-item ${active ? "active" : ""}`}>
      <div className="question-item-button" onClick={onToggle}>
        Q: {question.question_body}
        <small className="qa-ref-link qa-push">Helpful?</small>
        <small
          className="qa-ref-link qa-mark"
          onClick={() => markQuestionAsHelpful(question.question_id, product_id)}
        >
          Yes({question.question_helpfulness})
        </small>
        <small
          className="qa-ref-link add-answer-button"
          onClick={() => {setOpenAnswerModal(true)}}
        >
          Add Answer
        </small>
        {
          openAnswerModal
            &&
          <AnswerModal
            product_id={product_id}
            question_id={question.question_id}
            closeModal={setOpenAnswerModal}
            mainQA={mainQA}
            setQA={setQA}
            />
        }
        <span className="qa-ref-link question-item-control">{active ? "-" : "+"} </span>
      </div>
      <div className={`answer-wrapper ${active ? "open" : ""}`}>
        <div className="answer-item">
          {
            Object.keys(question.answers).slice(0, answersCount).map((answer_id, index) =>
              <AnswerItem key={index} answer={question.answers[answer_id]} /> // TODO: Figure out how to access question.question_id here!!
            )
          }
          {
            Object.keys(question.answers).slice(answersCount).length > 0
            &&
            <button className="qa-moreAnswers"
            onClick={() => incrementAnswers(answersCount + 2)}
            >
              Load More Answers
            </button>
          }

        </div>

      </div>

    </li>

  )

}

export default QAEntry;