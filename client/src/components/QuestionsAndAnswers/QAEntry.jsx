import React from 'react';
import {useState} from "react";
import QuestionModal from "./QuestionModal.jsx";
import {qaDummyData} from "./qaDummyData.js";
import AnswerItem from "./AnswerItem.jsx";

function QAEntry({question, onToggle, active}) {
  // // initializing state for question and answer modals
  // const [openModal, setOpenModal] = useState(false);

  // state hook for showing more answers
  const [answersCount, incrementAnswers] = useState(2)

  return(
    <li className={`qa-accordion-item ${active ? "active" : ""}`}>
      <button className="question-item-button" onClick={onToggle}>
        Q: {question.question_body}
        <small className="qa-ref-link qa-push">Helpful?</small>
        <small className="qa-ref-link">Yes(#)</small>
        <button className="qa-ref-link add-answer-button">Add Answer</button>
        <span className="question-item-control">{active ? "-" : "+"} </span>
      </button>
      <div className={`answer-wrapper ${active ? "open" : ""}`}>
        <div className="answer-item">
          {
            Object.keys(question.answers).slice(0, answersCount).map((answer_id, index) =>
              <AnswerItem answer={question.answers[answer_id]} />
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