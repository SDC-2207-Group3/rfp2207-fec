import React from 'react';
import {useState} from "react";
import QuestionModal from "./QuestionModal.jsx";

function QAEntry() {

  const [openModal, setOpenModal] = useState(false);

  return(
    <div>
      <h2>QA Entry here</h2>
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