import "./styles.css";

import CreateUserPic from "../../assets/images/cadastrar-usuario.svg";

import React from "react";
const Trigger = ({ triggerText, buttonRef, showModal }) => {
  return (
    <button
      ref={buttonRef}
      onClick={showModal}
      className="custom-btn"
      id="triggerButton"
    >
      {triggerText}
      <img src={CreateUserPic} alt="search arrow" />
    </button>
  );
};

export default Trigger;
