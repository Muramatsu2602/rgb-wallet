import "./styles.css";
import React from "react";

export const Form = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="cad-form-container">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input className="form-control" id="name" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
        />
      </div>
      <div className="form-group-btn">
        <button className="form-custom-btn" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default Form;
