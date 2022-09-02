import React, {useState} from 'react';
import AnswerModal from "./AnswerModal.jsx";
import {qaDummyData} from "./qaDummyData.js";
import AnswerItem from "./AnswerItem.jsx";
import http from "./httpReqsForQA.js";



function QAEntry({product_id, question, onToggle, active, mainQA, setQA}) {

  // initializing state for  answer modals
  const [openAnswerModal, setOpenAnswerModal] = useState(false);

  // state hook for showing more answers
  const [answersCount, incrementAnswers] = useState(2)

  // hook for tracking whether question is marked helpful
  const [questionHelpful, setQuestionHelpful] = useState(false);

  const markQuestionAsHelpful = (question_id, product_id) => {
    setQuestionHelpful(true);
    http.markQuestionAsHelpful(question_id, product_id)
      .then((res) => http.getQuestions(product_id))
      .then((res) => {setQA(res.data.results)})
      .catch((err) => {console.error(err)})
  }

  // hook for tracking whether a question is reported
  const [reportQuestionClicked, setReportQuestionClicked] = useState(false);

  const reportQuestion = (question_id) => {
    setReportQuestionClicked(true);
    http.reportQuestion(question_id)
      .then((res) => {return;})
      .catch((err) => {console.error(err)})
  }

  return(
    <li key={question.question_id} className={`qa-accordion-item ${active ? "active" : ""}`}>
      <div className="question-item-button" onClick={onToggle}>
        Q: {question.question_body}
        <small className="q-helpful qa-push">Helpful?</small>
        <small
          className={`q-helpful qa-mark ${questionHelpful ? "noClick" : ""}`}
          onClick={() => markQuestionAsHelpful(question.question_id, product_id)}
        >
          Yes({question.question_helpfulness}) |
        </small>
        <small
          className={`q-helpful qa-mark ${reportQuestionClicked ? "qa-reported" : ""} ${reportQuestionClicked ? "noClick" : ""}`}
          onClick={() => reportQuestion(question.question_id)}
        >
        {`${reportQuestionClicked ? "Reported" : "Report"}`}
        </small>
        <small
          className="q-helpful add-answer-button"
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
              <AnswerItem key={index} answer={question.answers[answer_id]} question_id={question.question_id}/>
            )
          }
          {
            Object.keys(question.answers).slice(answersCount).length > 0
            &&
            // answersCount
            // &&
            <button className="qa-moreAnswers"
            onClick={
              () => {
                if (answersCount) {
                  incrementAnswers(undefined)
                } else {
                  incrementAnswers(2)
                }
              }
            }
            >
              {`${answersCount ? "Load More Answers" : "Collapse Answers"}`}
            </button>
          }
        </div>
      </div>
    </li>
  )
}

export default QAEntry;