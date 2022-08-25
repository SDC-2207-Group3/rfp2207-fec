import React from "react";
import Overview from "./Overview/Overview.jsx";
import RatingsAndReviews from "./RatingsAndReviews/RatingsAndReviewsMain.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1> hello world </h1>
        <Overview />
        <div>
          <RatingsAndReviews />
        </div>
      </div>
    );
  }
}

export default App;
