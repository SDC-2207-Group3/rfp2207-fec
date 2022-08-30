import React, { useState, useEffect, useContext } from 'react';
import * as _ from 'underscore';
import { Check, XCircle } from 'react-feather';

var Comparison = (props) => {
  const main = props.main.features;
  const related = props.product.features;
  console.log('--features--', main, related)
  let combinedFeatures = new Set();
  main.forEach((feature) => combinedFeatures.add(feature.feature));
  related.forEach((feature) => combinedFeatures.add(feature.feature));

  let mainValue, relatedValue;

  return (
    <div>
      <div className="RIC-comparison-header">
        <p>Comparing</p>
        <span onClick={() => props.close()}><XCircle /></span>
      </div>
      <div className="RIC-product-names">
        <p>{props.main.name}</p>
        <p>{props.product.name}</p>
      </div>
      <table className="RIC-comparison-table">
        <tbody>
        {Array.from(combinedFeatures).map((target) => {
          mainValue = main.find(({feature}) => feature === target) ? main.find(({feature}) => feature === target).value : null;
          relatedValue = related.find(({feature}) => feature === target) ? related.find(({feature}) => feature === target).value : null;

          return (
            <tr>
              <td>{mainValue === true ? <Check /> : mainValue}</td>
              <td>{target}</td>
              <td>{relatedValue === true ? <Check /> : relatedValue}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default Comparison;