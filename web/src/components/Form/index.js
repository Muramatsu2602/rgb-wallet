import "./styles.css";
import React from "react";
// import { ToggleButton } from "../ToggleButton";

export const Form = ({ onSubmit }) => {
  return (
    <div className="cad-form-container">
      <h1>Cadastrar Usuário</h1>
      <form onSubmit={onSubmit}>
        {/* Nome Completo */}
        <div className="form-group">
          <label htmlFor="name">Nome Completo</label>
          <input
            required
            className="form-control"
            id="name"
            placeholder="Fulano da Silva"
          />
        </div>
        {/* Nome de Usuário */}
        <div className="form-group">
          <label htmlFor="userName">E-mail</label>
          <input
            required
            className="form-control"
            type="email"
            id="userName"
            placeholder="fulano@usp.br"
          />
        </div>

        {/* Vendeu algum projeto esse mês? */}
        {/* <ToggleButton id="didSellProj" /> */}
        <div className="form-group">
          <label htmlFor="didSellProj"> Vendeu algum projeto esse mês?</label>
          <div className="switch">
            <input id="didSellProj" type="checkbox" className="switch-input" />
            <label htmlFor="didSellProj" className="switch-label">
              Switch
            </label>
          </div>
        </div>

        {/* Está executando algum projeto? */}
        {/* <ToggleButton id="isExecutingProj" /> */}
        <div className="form-group">
          <label htmlFor="isExecutingProj">
            Está executando algum projeto?
          </label>
          <div className="switch">
            <input
              id="isExecutingProj"
              type="checkbox"
              className="switch-input"
            />
            <label htmlFor="isExecutingProj" className="switch-label">
              Switch
            </label>
          </div>
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
            placeholder="10"
          />
        </div>

        {/* Insira a url para imagem de perfil */}
        <div className="form-group">
          <label htmlFor="imgUrl">Insira a url para imagem de perfil</label>
          <input
            required
            // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url
            type="url"
            className="form-control"
            id="imgUrl"
            placeholder="https://avatars.githubusercontent.com/u/43243342"
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
