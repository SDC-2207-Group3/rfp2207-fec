import React, {createContext} from "react";
import Overview from "./Overview/Overview.jsx";
import RelatedItems from './RelatedItems/RelatedItems.jsx'
import RatingsAndReviews from "./RatingsAndReviews/RatingsAndReviewsMain.jsx";
import QuestionsAndAnswers from "./QuestionsAndAnswers/QuestionsAndAnswers.jsx";

export const IdContext = createContext();

const App = (props) => {
  let id = '65635';

  return (
    <div id="app">
      <IdContext.Provider value={id}>
        <Overview id={id}/>
        <RelatedItems id={id}/>
        <QuestionsAndAnswers id={id}/>
        <RatingsAndReviews/>
      </IdContext.Provider>
    </div>
  );
}

export default App;