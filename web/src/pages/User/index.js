import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { FaAngleDown } from "react-icons/fa";
import CornerLogo from "../../assets/images/corner-logo.svg";
import CornerArrow from "../../assets/images/corner-arrow-left.svg";

import Swal from "sweetalert2";

import CustomToggle from "../../Components/CustomToggle/index";
import { Button, Table, Accordion } from "react-bootstrap/";

export default function User() {
  return (
    <div id="user-page">
      <div className="content-wrapper">
        <div className="header-wrapper">
          <div className="top-icons">
            <Link to="/" className="exit-app">
              <img src={CornerArrow} id="arrow" alt="arrow de retorno" />
            </Link>
            <img src={CornerLogo} alt="logo RGBWallet" />
          </div>
          <div className="hello-user">
            <h1>Olá, usuário</h1>
            <p>Esta é sua carteira virtual</p>
          </div>
        </div>
        <div className="body-wrapper">
          <div className="wallet-wrapper">
            <div className="current-balance">
              <h2>Saldo Atual</h2>
              <h1>R$ 100,00</h1>
            </div>

            <div className="transaction-history">
              <Accordion defaultActiveKey="0">
                <CustomToggle eventKey="1">
                  Histório de Transações <FaAngleDown />
                </CustomToggle>

                <Accordion.Collapse eventKey="1">
                  <Table
                    className="custom-table"
                    striped
                    responsive
                    bordered
                    hover
                    size="sm"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Valor</th>
                        <th>Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>$400,00</td>
                        <td>05/10/19</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>$400,00</td>
                        <td>14/12/20</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>$500,00</td>
                        <td>14/12/20</td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Collapse>
              </Accordion>
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
