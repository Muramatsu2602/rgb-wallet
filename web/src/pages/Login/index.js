import React, { useState, useEffect } from "react";
import Auth from "../../services/AuthService";
import { Redirect } from "react-router-dom";

import logoImg2 from "../../assets/images/logo-login-top.svg";

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
    footer: `<a target='_blank'href='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO'>Por que estou vendo isso?</a>`,
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
    if (user) setSuccess(true);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    setError(false);
    setSuccess(false);

    // this will determine whether we go to /admin or /user page
    let isAdmin = false;
    if (password) isAdmin = true;

    const res = await Auth.logInUser(userName, password, isAdmin);

    console.log(res);

    if (!res) setError(true);
    else setSuccess(true);
  };

  return (
    <div id="login-page">
      <div className="content-wrapper">
        <div className="logo-portion">
          <img src={logoImg2} alt="logo RGBWallet" />

          <p>Programmed with ♡ by @Muramatsu2602 and @benetche.</p>
        </div>
        <div className="form-portion">
          <h1>Login</h1>
          <div className="login-status">
            {error && <span style={{ color: "red" }}>Erro ao logar !!</span>}
            {success &&
              // Redireciona pro admin se deu certo E TEM SENHA
              (password ? <Redirect to="/admin" /> : <Redirect to="/user" />)}
          </div>

          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="custom-lbl">E-mail</Form.Label>
              <Form.Control
                onChange={(e) => setUserName(e.target.value)}
                required
                className="custom-input"
                placeholder="Digite seu e-mail"
                type="email"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Accordion defaultActiveKey="0">
              <CustomToggle eventKey="1">Sou Admin</CustomToggle>

              <Accordion.Collapse eventKey="1">
                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="custom-lbl">Senha</Form.Label>
                  <Form.Control
                    onChange={(e) => setPassword(e.target.value)}
                    className="custom-input"
                    type="password"
                    placeholder="Digite sua senha"
                  />
                </Form.Group>
              </Accordion.Collapse>
            </Accordion>

            <div className="form-buttons">
              <div to="/user" className="enter-app">
                <Button className="custom-btn" variant="primary" type="submit">
                  Entrar
                </Button>{" "}
              </div>

              <a onClick={ForgotPasswordAlert}>Esqueci a senha...</a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
