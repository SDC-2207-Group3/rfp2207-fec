import React from 'react';
import {useState} from "react";
import AnswerModal from "./AnswerModal.jsx";
import {qaDummyData} from "./qaDummyData.js";
import AnswerItem from "./AnswerItem.jsx";


function QAEntry({question, onToggle, active}) {
  // initializing state for  answer modals
  const [openAnswerModal, setOpenAnswerModal] = useState(false);

  // state hook for showing more answers
  const [answersCount, incrementAnswers] = useState(2)


  return(
    <li key={question.question_id} className={`qa-accordion-item ${active ? "active" : ""}`}>
      <div className="question-item-button" onClick={onToggle}>
        Q: {question.question_body}
        <small className="qa-ref-link qa-push">Helpful?</small>
        <small className="qa-ref-link">Yes(#)</small>
        <button
          className="qa-ref-link add-answer-button"
          onClick={() => {setOpenAnswerModal(true)}}
        >
          Add Answer
        </button>
        {openAnswerModal && <AnswerModal question_id={question.question_id} closeModal={setOpenAnswerModal} />}
        <span className="question-item-control">{active ? "-" : "+"} </span>
      </div>
      <div className={`answer-wrapper ${active ? "open" : ""}`}>
        <div className="answer-item">
          {
            Object.keys(question.answers).slice(0, answersCount).map((answer_id, index) =>
              <AnswerItem key={index} answer={question.answers[answer_id]} />
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