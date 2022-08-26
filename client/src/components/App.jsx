import React from "react";
import Overview from "./Overview/Overview.jsx";
import { RelatedItems } from './RelatedItems/RelatedItems.jsx'
import RatingsAndReviews from "./RatingsAndReviews/RatingsAndReviewsMain.jsx";
import QuestionsAndAnswers from "./QuestionsAndAnswers/QuestionsAndAnswers.jsx"
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1> hello world </h1>
        <Overview />
        <QuestionsAndAnswers />
        <RelatedItems />
        <RatingsAndReviews />
      </div>
    );
  }
}

export default App;
