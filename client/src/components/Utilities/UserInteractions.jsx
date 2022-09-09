import React from 'react';

const Atelier = require('./Atelier.jsx');

const UserInteractions = (props) => {

  const recordUserClick = (element, widget) => (
    Atelier.postUserClick(element, widget)
    .catch((err) => console.log(err))
  )

  return (
    <>
      {props.children.map((child, index) =>
        <div key={index} onClick={(e) =>  recordUserClick(e.target.outerHTML, child.type.name)}>
          {child}
        </div>
      )}
    </>

  )
}

export default UserInteractions;