import React from "react";
import {useState} from "react";

function ToggleSwitch({ label, darkMode, toggleDarkMode }) {

  return (
    <div className="dark-mode-container">
      {label}{" "}
      <div className="toggle-switch">
        <input type="checkbox"
          className= "checkbox"
          onChange={toggleDarkMode}
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