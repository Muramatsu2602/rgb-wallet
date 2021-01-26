import React, { useState, useEffect } from "react";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { FaAngleDown } from "react-icons/fa";

import Header from "../../Components/Header/index";
import CustomToggle from "../../Components/CustomToggle/index";

import { Button, Table, Accordion } from "react-bootstrap/";

export default function User() {
  
  const [saldo, setSaldo] = useState(100.5); // MUDAR ASSIM QUE ESTIVER FUNCIONANDO!

  return (
    <div id="user-page">
      <div className="content-wrapper">
        <Header />
        <div className="body-wrapper">
          <div className="wallet-wrapper">
            <div className="current-balance">
              <h2>Saldo Atual</h2>
              <h1>R$ {saldo}</h1>
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
                Imprimir Extrato
              </Button>{" "}
              <Button className="custom-btn" id="extrato" variant="warning">
                Requisitar $
              </Button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
