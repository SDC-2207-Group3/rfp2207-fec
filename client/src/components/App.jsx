import React, { useState, useEffect, createContext } from 'react';
import Overview from "./Overview/Overview.jsx";
import RelatedItems from "./RelatedItems/RelatedItems.jsx";
import RatingsAndReviews from "./RatingsAndReviews/RatingsAndReviewsMain.jsx";
import QuestionsAndAnswers from "./QuestionsAndAnswers/QuestionsAndAnswers.jsx";

export const IdContext = createContext();

const App = (props) => {
  const [id, setId] = useState(65638);

  const changeId = (newId) => {
    setId(newId);
  }

  console.log('main app.jsx id', id);

  return (
    <div id="app">
      <IdContext.Provider value={{id, changeId}}>
        <Overview id={id} />
        <RelatedItems id={id} />
        <QuestionsAndAnswers id={id} />
        <RatingsAndReviews id={id} />
      </IdContext.Provider>
    </div>
  );
};

export default App;
