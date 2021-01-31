import React, { useState, useEffect } from "react";

import axios from "axios";
import Auth from "../../services/AuthService";

import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import logoImg from "../../assets/images/login-logo.svg";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { Button, Form, Accordion } from "react-bootstrap/";
import CustomToggle from "../../components/CustomToggle/index";

/**
 * simple onclick-triggered function that shows an alert
 */
function ForgotPasswordAlert() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Deu M****!",
    footer: `<a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO'>Por que estou vendo isso?</a>`,
  });
}

export default function Login() {
  // Form Variables
  const [userName, setUserName] = useState(""); //  const [login, setLogin] --> notion
  const [password, setPassword] = useState("");

  // State Variables
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  /**
   * função que é executada no início do componente, para 
   * verificar se o usuário já não está logado, se estiver,
   *  redirecionamos para a página /user  (/private, no Notion)
   */
  useEffect(() => {
    const user = Auth.isLogged();
    if(user) setSuccess(true);
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();

    setError(false);
    setSuccess(false);

    const res = await Auth.logInUser(userName, password);

    console.log(res);

    if (!res) setError(true);
    else setSuccess(true);
  };

  return (
    <div id="login-page">
      <div className="content-wrapper">
        <div className="logo-portion">
          <img src={logoImg} alt="logo RGBWallet" />

          <p>Programmed with ♡ by @Muramatsu2602 and @benetche.</p>
        </div>
        <div className="form-portion">
          <h1>Login</h1>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="custom-lbl">Nome</Form.Label>
              <Form.Control
                className="custom-input"
                type="email"
                placeholder="Digite seu nome"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Accordion defaultActiveKey="0">
              <CustomToggle eventKey="1">Sou Admin</CustomToggle>

              <Accordion.Collapse eventKey="1">
                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="custom-lbl">Senha</Form.Label>
                  <Form.Control
                    className="custom-input"
                    type="password"
                    placeholder="Digite sua senha"
                  />
                </Form.Group>
              </Accordion.Collapse>
            </Accordion>

            <div className="form-buttons">
              {/* This will change soon  
                 - this button will redirect to either: User or Admin pages
              */}

              <Link to="/user" className="enter-app">
                <Button className="custom-btn" variant="primary" type="submit">
                  Entrar
                </Button>{" "}
              </Link>

              <a onClick={ForgotPasswordAlert}>Esqueci a senha...</a>
            </div>
          </Form>
          {/* TODO: Make this look appealing! */}
          {error && <span style={{ color: "red" }}>Erro ao logar !!</span>}

          {/* /private --> in Notion */}
          {success && <Redirect to="/user" />}
        </div>
      </div>
    </div>
  );
}
