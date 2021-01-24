import axios from "axios";
import React, { useState, useEffect } from "react";
// import { FaArrowRight } from 'react-icons/fa';

import logoImg from "../../assets/images/login-logo.svg";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Swal from "sweetalert2";
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  Accordion,
  useAccordionToggle,
} from "react-bootstrap/";
import Switch from "react-switch";

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

function ForgotPasswordOnClick() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
    footer: `<a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO'>Why do I have this issue?</a>`,
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
              <Button className="custom-btn" variant="primary" type="submit">
                Entrar
              </Button>
              <a onClick={ForgotPasswordOnClick}>Esqueci a senha...</a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
