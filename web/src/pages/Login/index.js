import axios from "axios";
import React, { useState, useEffect } from "react";
// import { FaArrowRight } from 'react-icons/fa';

import logoImg from "../../assets/images/login-logo.svg";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Container, Form, Row, Col } from "react-bootstrap/";

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

          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="custom-lbl">Email address</Form.Label>
              <Form.Control className="custom-input" type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="custom-lbl">Password</Form.Label>
              <Form.Control className="custom-input" type="password" placeholder="Password" />
            </Form.Group>
 
            <Button className="custom-btn" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
