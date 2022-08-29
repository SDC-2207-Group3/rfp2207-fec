import React from 'react';

// "id": 5539374,
// "body": "jackky",
// "date": "2022-04-27T00:00:00.000Z",
// "answerer_name": "jackky",
// "helpfulness": 0,
// "photos": []

function AnswerItem({answer}) {

  return (
    <div>
      <p>{answer.body}</p>
      <p>{answer.date}</p>
      <p>{answer.answerer_name}</p>
    </div>
  )
}



export default AnswerItem;