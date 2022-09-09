import React from "react";
import {useState} from "react";

function ToggleSwitch({ label, darkMode, toggleDarkMode }) {

  // function crawler () {

  //   function helper(element) {
  //     element.classList.add("darkMode");
  //     if (element.children.length > 0) {
  //       for (let i = 0; i < element.children.length; i++) {
  //         helper(element.children[i]);
  //       }
  //     } else {
  //       return;
  //     }
  //   }

  //   helper(document.getElementById("app"));
  // }

  return (
    <div className="dark-mode-container">
      {label}{" "}
      <div className="toggle-switch">
        <input type="checkbox"
          className= "checkbox"
          onChange={toggleDarkMode}
          // onClick={crawler}
          name={label}
          id={label} />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;