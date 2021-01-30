import "./styles.css";

import React from "react";
const Trigger = ({ triggerText, buttonRef, showModal }) => {
  return (
    <button
      ref={buttonRef}
      onClick={showModal}
      className="custom-btn color-green"
    >
      {triggerText}
    </button>
  );
};

export default Trigger;
