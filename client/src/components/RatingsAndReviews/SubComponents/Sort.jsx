import React from "react";
import { useState } from "react";
// class Sort extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div id="RR_sort">
//         <p>Currently Sorted By {this.props.sortMethod}</p>
//       </div>
//     );
//   }
// }

//props = sortMethod, id
let Sort = ({ sortMethod }) => {
  const [sortBy, setSortBy] = useState("newest");

  return (
    <div id="RR_sort">
      <p>Currently Sorted By {sortMethod}</p>
    </div>
  );
};

export default Sort;
