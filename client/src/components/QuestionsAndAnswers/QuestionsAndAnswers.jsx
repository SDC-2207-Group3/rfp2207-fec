import React from 'react';
import QAEntry from "./QAEntry.jsx";
import QuestionModal from "./QuestionModal.jsx";
import AnswerModal from "./AnswerModal.jsx"

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <h2>Questions And Answers</h2>
        <QAEntry />
      </div>
    )
  }
}

export default QuestionsAndAnswers