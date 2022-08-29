import React from 'react';
import {useState} from 'react';
import Header from "./QAHeader.jsx";
import {qaDummyData} from "./qaDummyData.js";
import QAEntry from "./QAEntry.jsx";
import QuestionModal from "./QuestionModal.jsx";
import AnswerModal from "./AnswerModal.jsx"

function QuestionsAndAnswers(props) {

  // hook for toggling accordion
  const [clicked, setClicked] = useState("0")

  // update state if a particular question is clicked
  const handleToggle = (index) => {
    if (clicked === index) {
      return setClicked("0");
    }
    setClicked(index);
  }


  return(
    <ul className="qa-accordion">
      <Header />
      {qaDummyData.map((question, index) => (
        <QAEntry
          product_id={props.id}
          question={question}
          onToggle={() => handleToggle(index)}
          active={clicked === index}
          />
      ))}
    </ul>


    // <div className="qa-container">
    //   <Header />
    //   <h2>To put in as accordion</h2>
    //   <QAEntry id={props.id}/>
    // </div>
  )

}

export default QuestionsAndAnswers