import axios from "axios";
import React, { useState, useEffect } from "react";
// import { FaArrowRight } from 'react-icons/fa';

import logoImg from "../../assets/images/login-logo.svg";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Container, Form} from "react-bootstrap/";

export default function Login() {
  return (
    <div id="login-page">
      <div className="content-wrapper">
        <div className="logo-portion">
          <img src={logoImg} alt="logo RGBWallet" />
        </div>
        <div className="form-portion">
          <h1>Form</h1>

          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Example select</Form.Label>
              <Form.Control as="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Example multiple select</Form.Label>
              <Form.Control as="select" multiple>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button variant="primary">Entrar</Button>{' '}

          </Form>
        </div>
      </div>
    </div>
  );
}
