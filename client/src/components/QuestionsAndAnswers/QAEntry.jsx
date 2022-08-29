import React from 'react';
import {useState} from "react";
import QuestionModal from "./QuestionModal.jsx";
import {qaDummyData} from "./qaDummyData.js";
import AnswerItem from "./AnswerItem.jsx";

function QAEntry({key, product_id, question}) {
  // initializing state for question and answer modals
  const [openModal, setOpenModal] = useState(false);

  return(
    // <li className="qa-accordion-item">
    //   <button className="question-item-button">
    //     {question.question_body}
    //     <span className="question-item-control">-</span>
    //   </button>
    //   <div className="answer-wrapper">
    //     <div className="answer-item">
    //       {
    //         Object.keys(question.answers).forEach((question_id, index) => {
    //           <AnswerItem answer={question.answers[question_id]} />
    //         })
    //       }
    //     </div>
    //   </div>
    //   <button
    //     className="qa-newQuestionBtn"
    //     onClick= {() => {setOpenModal(true)}}
    //   >
    //     Add a question
    //   </button>
    //   {openModal && <QuestionModal closeModal={setOpenModal} />}
    // </li>




    <div>
      <h3>Q: Question text here</h3>
      <span>
        <p>Helpful?</p>
        <p>Replace with link for Yes(#)</p>
        <p>Replace with link for Add An Answer</p>
      </span>
      <button
        className="qa-newQuestionBtn"
        onClick= {() => {setOpenModal(true)}}
      >
        New Question
      </button>
      {openModal && <QuestionModal closeModal={setOpenModal} />}
    </div>
  )

}

export default QAEntry;