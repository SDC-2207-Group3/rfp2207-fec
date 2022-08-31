import React from 'react';

// "id": 5539374,
// "body": "jackky",
// "date": "2022-04-27T00:00:00.000Z",
// "answerer_name": "jackky",
// "helpfulness": 0,
// "photos": []

function AnswerItem({answer}) {
  const options = {year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(answer.date).toLocaleDateString('en-US', options);

  return (
    <div>
      <span className="answer-prefix">A:</span> {answer.body}
      <br></br>
      <small>
        by {answer.answerer_name} on {date}
      </small>
    </div>
  )
}


export default AnswerItem;