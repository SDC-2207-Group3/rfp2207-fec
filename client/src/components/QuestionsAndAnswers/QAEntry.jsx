import React from 'react';
import {useState} from "react";
import QuestionModal from "./QuestionModal.jsx";
import {qaDummyData} from "./qaDummyData.js";
import AnswerItem from "./AnswerItem.jsx";

function QAEntry({question, onToggle, active}) {
  // initializing state for question and answer modals
  const [openModal, setOpenModal] = useState(false);

  return(
    <li className={`qa-accordion-item ${active ? "active" : ""}`}>
      <button className="question-item-button" onClick={onToggle}>
        Q: {question.question_body}
        <span className="question-item-control">{active ? "-" : "+"} </span>
      </button>
      <div className={`answer-wrapper ${active ? "open" : ""}`}>
        <div className="answer-item">
          {
            Object.keys(question.answers).slice(0,2).map((answer_id, index) =>
              <AnswerItem answer={question.answers[answer_id]} />
            )
          }
        </div>
        <button
        className="qa-newQuestionBtn"
        onClick= {() => {setOpenModal(true)}}
        >
          Add a question
        </button>
        {openModal && <QuestionModal closeModal={setOpenModal} />}
      </div>

    </li>




    // <div>
    //   <h3>Q: Question text here</h3>
    //   <span>
    //     <p>Helpful?</p>
    //     <p>Replace with link for Yes(#)</p>
    //     <p>Replace with link for Add An Answer</p>
    //   </span>
    //   <button
    //     className="qa-newQuestionBtn"
    //     onClick= {() => {setOpenModal(true)}}
    //   >
    //     New Question
    //   </button>
    //   {openModal && <QuestionModal closeModal={setOpenModal} />}
    // </div>
  )

}

export default QAEntry;