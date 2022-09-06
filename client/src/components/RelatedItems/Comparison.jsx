import React, { useState, useEffect, useContext } from 'react';
import * as _ from 'underscore';
import { Check, XCircle } from 'react-feather';
import { RIOContext } from './MainRIO.jsx';

const Comparison = (props) => {
  const { mainProduct } = useContext(RIOContext);
  let featureCollection = props.features.slice();
  let currFeatures = props.product.features;

  for (let i in currFeatures) {
    let featureObj = currFeatures[i];
    let featureFound = featureCollection.find(({ name }) => name === featureObj.feature);
    if (featureFound) {
      featureFound.curr = featureObj.value ? JSON.parse(featureObj.value) : true
    } else {
      featureCollection.push({name: featureObj.feature,
        main: null,
        curr: featureObj.value ? JSON.parse(featureObj.value) : true})
    }
  }

  console.log('comparison data', featureCollection);

  return (
    <div className="RIC-comparison-modal">
      <div className="RIC-comparison-header">
        <p>Comparing</p>
        <span onClick={() => props.close()}><XCircle /></span>
      </div>
      <div className="RIC-comparison-table-div">
        <table className="RIC-comparison">
          <tbody className="RIC-comparison">
            <tr className="RIC-modal-names">
              <th className="RIC-comparison">{mainProduct.name}</th>
              <th className="RIC-comparison"></th>
              <th className="RIC-comparison">{props.product.name}</th>
            </tr>
            {featureCollection.map((feature) =>
              <tr className="RIC-comparison" key={`${mainProduct.name} vs ${props.product.name} on ${feature.name}`} className="RIC-modal-row">
                <td className="RIC-comparison">{feature.main === true ? <Check /> : feature.main ? feature.main : null}</td>
                <td className="RIC-comparison">{feature.name}</td>
                <td className="RIC-comparison">{feature.curr === true ? <Check /> : feature.curr ? feature.curr : null}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comparison;