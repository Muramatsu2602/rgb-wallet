import "./styles.css";
import React from "react";
import { ToggleButton } from "../ToggleButton";

export const Form = ({ onSubmit }) => {
 
  return (
    <div className="cad-form-container">
      <h1>Cadastrar Usuário</h1>
      <form onSubmit={onSubmit}>
        {/* Nome Completo */}
        <div className="form-group">
          <label htmlFor="name">Nome Completo</label>
          <input required className="form-control" id="name" />
        </div>
        {/* Nome de Usuário */}
        <div className="form-group">
          <label htmlFor="userName">Nome de Usuário</label>
          <input required className="form-control" id="userName" />
        </div>
        {/* Vendeu algum projeto esse mês? */}
        <div className="form-group">
          <label htmlFor="didSellProj">Vendeu algum projeto esse mês?</label>
          {/* <ToggleButton id="didSellProj" /> */}
          <input id="didSellProj" className="custom-checkbox" type="checkbox"/>

        </div>
        {/* Está executando algum projeto? */}
        <div className="form-group">
          <label htmlFor="isExecutingProj">
            Está executando algum projeto?
          </label>
          {/* <ToggleButton id="isExecutingProj" /> */}
          <input id="isExecutingProj" className="custom-checkbox" type="checkbox"/>

        </div>
        {/* Quantas semanas cumpriu as 10 horas semanais? */}
        <div className="form-group">
          <label htmlFor="weeklyHours">
            Quantas semanas cumpriu as 10 horas semanais?
          </label>
          <input
            required
            type="number"
            className="form-control"
            id="weeklyHours"
          />
        </div>

        {/* Salvar Cadastro */}
        <div className="form-group-btn">
          <button className="form-custom-btn" type="submit">
            Salvar Cadastro
          </button>
        </div>
      </form>
    </div>
  );
};
export default Form;
