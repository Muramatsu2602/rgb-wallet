import axios from "axios";
import React, { useState, useEffect } from "react";
// import { FaArrowRight } from 'react-icons/fa';

import logoImg from "../../assets/images/login-logo.svg";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Container, Form, Row, Col, Accordion } from "react-bootstrap/";
import Switch from "react-switch";

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
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                
              </Accordion.Toggle>

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
              <a>Esqueci a senha...</a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
