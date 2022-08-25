import React from "react";
import RelatedItems from './RelatedItems/RelatedItems.jsx'
import RatingsAndReviews from "./RatingsAndReviews/RatingsAndReviewsMain.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1> hello world </h1>
        <RelatedItems />
        <div>
          <RatingsAndReviews />
        </div>
      </div>
    );
  }
}

export default App;
