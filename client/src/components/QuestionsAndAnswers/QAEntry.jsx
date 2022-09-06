import React, {useState} from 'react';
import AnswerModal from "./AnswerModal.jsx";
import {qaDummyData} from "./qaDummyData.js";
import AnswerItem from "./AnswerItem.jsx";
import http from "../Utilities/Atelier.jsx";



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
      <div className="question-item-button" >
        <div className="question-item-button-text" onClick={onToggle}>
          Q: {question.question_body}
        </div>
        <small className="q-helpful qa-push align-small">Helpful?</small>
        <small
          id="qa-helpful" className={`q-helpful qa-mark helpful-hover align-small ${questionHelpful ? "noClick" : ""}`}
          onClick={() => markQuestionAsHelpful(question.question_id, product_id)}
        >
          Yes({question.question_helpfulness})
        </small>
        <small
          className={`q-separator qa-mark`}
        >
          |
        </small>
        <small
          className={`q-helpful qa-mark report-hover align-small ${reportQuestionClicked ? "qa-reported" : ""} ${reportQuestionClicked ? "noClick" : ""}`}
          onClick={() => reportQuestion(question.question_id)}
        >
        {`${reportQuestionClicked ? "Reported" : "Report"}`}
        </small>
        <small
          className="q-helpful align small add-answer-button"
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
        <span onClick={onToggle} className="qa-ref-link question-item-control">{active ? "-" : "+"} </span>

      </div>
      <div className={`answer-wrapper ${active ? "open" : ""}`}>
        <div className="answer-item">
          {
            Object.keys(question.answers)
              .sort((a, b) => b.helpfulness - a.helpfulness)
              .slice(0, answersCount)
              .map((answer_id, index) =>
                <AnswerItem key={index} answer={question.answers[answer_id]} question_id={question.question_id}/>
            )
          }

          {
            Object.keys(question.answers).slice(answersCount).length > 0
            &&
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