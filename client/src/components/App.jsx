import React from "react";
import Overview from "./Overview/Overview.jsx";
import { RelatedItems } from './RelatedItems/RelatedItems.jsx'
import RatingsAndReviews from "./RatingsAndReviews/RatingsAndReviewsMain.jsx";
import QuestionsAndAnswers from "./QuestionsAndAnswers/QuestionsAndAnswers.jsx"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '65631'
    }
  }

  render() {
    return (
      <div id="app">
        {/* <h1> hello world </h1> */}
        <Overview id={this.state.id}/>
        <RelatedItems id={this.state.id}/>
        <QuestionsAndAnswers />
        <RatingsAndReviews id={this.state.id}/>
      </div>
    );
  }
}

export default App;
