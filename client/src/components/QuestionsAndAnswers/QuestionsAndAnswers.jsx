import React from 'react';
import {useState, useEffect} from 'react';
import Header from "./QAHeader.jsx";
import {qaDummyData} from "./qaDummyData.js";
import QAEntry from "./QAEntry.jsx";
import QuestionModal from "./QuestionModal.jsx";
import AnswerModal from "./AnswerModal.jsx"
import http from "./httpReqsForQA.js";
import Search from "./QASearch.jsx";

function QuestionsAndAnswers({id}) {
  // state hook for displaying question data from server get request
  const [mainQA, setQA] = useState([]);

  // initial get request to get all questions for a specified product id
  useEffect(() => {
    http.getQuestions(id)
      .then((res) => {setQA(res.data.results)})
      .catch((err) => {console.error(err)})
  }, [id])

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
  // increment by 2 every time you click the "more answered questions" button
  const [questionsCount, incrementQuestions] = useState(4)

  return (
    <div>
      <Search mainQA={mainQA} setQA={setQA} id={id}/>
      <Header />
      <ul className="qa-accordion">
        {mainQA.slice(0, questionsCount).map((question, index) => (
          <QAEntry
            key = {question.question_id}
            product_id={id}
            question={question}
            onToggle={() => handleToggle(index)}
            active={clicked === index}
            mainQA={mainQA}
            setQA={setQA}
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
        {openModal && <QuestionModal product_id={id} closeModal={setOpenModal} mainQA={mainQA} setQA={setQA}/>}
    </div>
  )

}

export default QuestionsAndAnswers