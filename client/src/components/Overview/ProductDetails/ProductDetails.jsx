import React, { useState, useEffect } from 'react';

const ProductDetails = (props) => {

  const [test, setTest] = useState(true);
  const [testStyle, setTestStyle] = useState(true);
  const [testPosition, setTestPosition] = useState(0);

  const testStyle1 = testStyle ? {left: testPosition + '%', transition: '1s'} : {left: '50%', transition: '1s'};
  const test1 = test ? "overview-test1" : "overview-test2"
  // const test2 = test ? "overview-test2" : "overview-test1"

  function toggleTest () {
    setTest(!test)
  }

  function toggleTestStyle () {
    setTestStyle(!testStyle)
  }

  function incrementTestPosition () {
    setTestPosition(testPosition + 100)
  }

  return (
    <div id='test' className="overview-productDetails">
      Product Details
      <div className="overview-test" onClick={incrementTestPosition} style={testStyle1}>
        <div className={test1} >test1</div>
        {/* <div className={test2} onClick={() => setTest(!test)}>test2</div> */}
      </div>
    </div>
  )
}

export default ProductDetails