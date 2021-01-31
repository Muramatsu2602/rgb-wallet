import "./styles.css";
import React from "react";

export const Form = ({ onSubmit }) => {
  return (
    <div className="cad-form-container">
      <h1>Cadastrar Usuário</h1>
      <form onSubmit={onSubmit}>
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
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};
export default Form;
