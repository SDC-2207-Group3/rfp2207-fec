import React from 'react';
import Header from "./QAHeader.jsx";
import {qaDummyData} from "./qaDummyData.js";
import QAEntry from "./QAEntry.jsx";
import QuestionModal from "./QuestionModal.jsx";
import AnswerModal from "./AnswerModal.jsx"

function QuestionsAndAnswers(props) {
  return(
    // <ul className="qa-accordion">
    //   <Header />
    //   {qaDummyData.map((question, index) => (
    //     <QAEntry key={index} product_id={props.id} question={question} />
    //   ))}
    // </ul>
    <div className="qa-container">
      <Header />
      <h2>To put in as accordion</h2>
      <QAEntry id={props.id}/>
    </div>
  )

}

export default QuestionsAndAnswers