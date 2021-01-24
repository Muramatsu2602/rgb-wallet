import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import { FaArrowRight } from 'react-icons/fa';

import logoImg from "../../assets/images/login-logo.svg";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Swal from "sweetalert2";
import { Button, Form, Accordion, useAccordionToggle } from "react-bootstrap/";

/**
 * Custom Toggle Button to Collapse/Show Password Accordeon
 * @param {*} param0
 */
function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <Button
      className="custom-btn-small"
      onClick={decoratedOnClick}
      // disabled={status}
    >
      {children}
    </Button>
  );
}

/**
 * simple onclick-triggered function that shows an alert
 */
function ForgotPassword() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Deu Mer**!",
    footer: `<a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO'>Por que estou vendo isso?</a>`,
  });
}

export default function Login() {
  return (
    <div id="login-page">
      <div className="content-wrapper">
        <div className="logo-portion">
          <img src={logoImg} alt="logo RGBWallet" />

          <p>Programmed with ♡ by @Muramatsu2602 and @benetche.</p>
        </div>
        <div className="form-portion">
          <h1>Login</h1>

          <Form onSubmit={() => {}}>
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
              {/* This will change soon  */}
              <Link to="/user" className="enter-app">
                <Button className="custom-btn" variant="primary" type="submit">
                  Entrar
                </Button>{" "}
              </Link>

              <a onClick={ForgotPassword}>Esqueci a senha...</a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
