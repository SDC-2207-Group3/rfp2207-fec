import React, { useState, useEffect, useContext } from 'react';
import * as _ from 'underscore';
import { Check, XCircle } from 'react-feather';
import { RIOContext } from './MainRIO.jsx';

var Comparison = (props) => {
  const { mainProduct } = useContext(RIOContext);
  const main = mainProduct.features;
  const related = props.product.features;
  console.log('--features--', main, related)
  let combinedFeatures = new Set();
  main.forEach((feature) => combinedFeatures.add(feature.feature));
  related.forEach((feature) => combinedFeatures.add(feature.feature));

  let mainValue, relatedValue;

  return (
    <div className="RIC-comparison-modal">
      <div className="RIC-comparison-header">
        <p>Comparing</p>
        <span onClick={() => props.close()}><XCircle /></span>
      </div>
      <table className="RIC-comparison-table">
        <tbody>
          <tr>
            <th>{mainProduct.name}</th>
            <th></th>
            <th>{props.product.name}</th>
           </tr>
        {Array.from(combinedFeatures).map((target) => {
          mainValue = main.find(({feature}) => feature === target) ? main.find(({feature}) => feature === target).value : null;
          relatedValue = related.find(({feature}) => feature === target) ? related.find(({feature}) => feature === target).value : null;

          return (
            <tr key="target">
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