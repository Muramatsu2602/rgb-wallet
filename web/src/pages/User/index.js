import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import CornerLogo from "../../assets/images/corner-logo.svg";
import CornerArrow from "../../assets/images/corner-arrow-left.svg";

import Swal from "sweetalert2";

import { Button, Table } from "react-bootstrap/";

export default function User() {
  return (
    <div id="user-page">
      <div className="content-wrapper">
        <div className="header-wrapper">
          <div className="top-icons">
            <Link to="/" className="exit-app">
              <img src={CornerArrow} alt="logo RGBWallet" />
              <img src={CornerLogo} alt="arrow de retorno" />
            </Link>
          </div>
          <div className="hello-user">
            <h1>Olá, usuário</h1>
            <p>Esta é sua carteira virtual</p>
          </div>
        </div>
        <div className="body-wrapper">
          <div className="wallet-wrapper">
            <div className="current-balance">
              <p>Saldo Atual</p>
              <h1>R$ 100,00</h1>
            </div>

            <div className="transaction-history">
              <h2>Histório de Transações</h2>
              {/* <Table striped bordered hover size="sm"></Table> */}
            </div>

            <div className="user-buttons">
              <Button className="custom-btn" id="solicitar" variant="primary">
                Solicitar
              </Button>{" "}
              <Button className="custom-btn" id="extrato" variant="warning">
                Extrato
              </Button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
