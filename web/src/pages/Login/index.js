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
        </div>
        <div className="form-portion">
          <h1>Login</h1>
          
        </div>
      </div>
    </div>
  );
}
