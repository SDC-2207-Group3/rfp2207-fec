import React from "react";
import { useState } from "react";

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
