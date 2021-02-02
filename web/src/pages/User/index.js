import React, { useState, useEffect } from "react";
import Auth from "../../services/AuthService";
import axios from "axios";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { FaAngleDown } from "react-icons/fa";

import Header from "../../components/Header/index";
import CustomToggle from "../../components/CustomToggle/index";

import { Button, Table, Accordion } from "react-bootstrap/";

export default function User() {
  const [saldo, setSaldo] = useState(1030.5); // MUDAR ASSIM QUE ESTIVER FUNCIONANDO!

  //   const [redirect, setRedirect] = useState(false); // IN HEADER!
  const [response, setResponse] = useState("");
  const [userName, setUserName] = useState(""); // login, setLogin --> in Notion
  const [cash, setCash] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get("/search");
        setResponse(res.data);
      } catch (err) {
        setResponse("Error");
      }
    };
    const user = Auth.isLogged();
    setUserName(user.userName);
    setCash(user.cash);

    loadData();
  }, []);

  return (
    <div id="user-page">
      <div className="content-wrapper">
        <Header />
        <div className="body-wrapper">
          <div className="wallet-wrapper">
            {/* BACKEND RESPONSE */}
            <div className="welcome-msg">Hey {userName},</div>

            <div className="current-balance">
              <h2>Saldo Atual</h2>
              <h1>R$ {response}</h1>
            </div>

            <div className="transaction-history-wrapper">
              <Accordion defaultActiveKey="0">
                <CustomToggle eventKey="1">
                  Histório de Transações <FaAngleDown />
                </CustomToggle>

                <Accordion.Collapse eventKey="1">
                  <div className="custom-table">
                    <Table striped responsive bordered hover size="sm">
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
                        <tr>
                          <td>4</td>
                          <td>$9900,00</td>
                          <td>23/12/20</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
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
