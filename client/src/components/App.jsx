import React from "react";
import Overview from "./Overview/Overview.jsx";
import RelatedItems from './RelatedItems/RelatedItems.jsx'
import RatingsAndReviews from "./RatingsAndReviews/RatingsAndReviewsMain.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '65631'
    }
  }

  render() {
    return (
      <div>
        <h1> hello world </h1>
        <Overview id={this.state.id}/>
        <RelatedItems id={this.state.id}/>
        <div>
          <RatingsAndReviews id={this.state.id}/>
        </div>
      </div>
    );
  }
}

export default App;
