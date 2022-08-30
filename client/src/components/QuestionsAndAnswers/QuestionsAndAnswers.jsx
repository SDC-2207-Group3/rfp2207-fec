import React from 'react';
import {useState, useEffect} from 'react';
import Header from "./QAHeader.jsx";
import {qaDummyData} from "./qaDummyData.js";
import QAEntry from "./QAEntry.jsx";
import QuestionModal from "./QuestionModal.jsx";
import AnswerModal from "./AnswerModal.jsx"

function QuestionsAndAnswers(props) {
  // hook for toggling question modal
  const [openModal, setOpenModal] = useState(false);

  // hook for toggling accordion
  const [clicked, setClicked] = useState("0")
  // update state if a particular question is clicked
  const handleToggle = (index) => {
    if (clicked === index) {
      return setClicked("0");
    }
    setClicked(index);
  }


  // state hook for showing more questions
  const [questionsCount, incrementQuestions] = useState(2)
  // increment by 2 every time you click the "more answered questions" button


  return (
    <div>

      <ul className="qa-accordion">
        <Header />
        {qaDummyData.slice(0, questionsCount).map((question, index) => (
          <QAEntry
            product_id={props.id}
            question={question}
            onToggle={() => handleToggle(index)}
            active={clicked === index}
            />
        ))}

      </ul>
      {qaDummyData.slice(questionsCount).length > 0
        &&
        <button className="qa-moreQuestions"
          onClick={() => incrementQuestions(questionsCount + 2)}
        >
          More Answered Questions
        </button>
        }
        <button
        className="qa-newQuestionBtn"
        onClick= {() => {setOpenModal(true)}}
        >
        Add a question
        </button>
        {openModal && <QuestionModal closeModal={setOpenModal} />}
    </div>
  )

}

export default QuestionsAndAnswers