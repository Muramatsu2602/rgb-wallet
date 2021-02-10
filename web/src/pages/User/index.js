import React, { useState, useEffect } from "react";
import Auth from "../../services/AuthService";
import axios from "axios";
import Swal from "sweetalert2";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { FaAngleDown } from "react-icons/fa";

import Header from "../../components/Header/index";
import CustomToggle from "../../components/CustomToggle/index";
import { Button, Table, Accordion } from "react-bootstrap/";

import NumberFormat from "react-number-format";

export default function User() {
  //   const [redirect, setRedirect] = useState(false); // IN HEADER!
  const [user, setUser] = useState({
    fullName: "",
    cash: 0,
  });
  const [error, setError] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        // post request using logged userName
        const res = await axios.post("/searchUser", {
          userName: userLogado.userName,
        });

        // console.log("Hey", res.data.cash.$numberDecimal);
        setUser(res.data);
        setError(false);
        setUserName(userLogado.userName);
      } catch (err) {
        setError(true);
      }
    };

    // retrieving frowm localStorage
    const userLogado = Auth.isLogged();

    loadData();
  }, []);

  /**
   * onClick function to ask for more money on account
   * @param {*} event
   */
  const printExtratoOnClick = async (e) => {
    Swal.fire("Imprimir Extrato?", "Feature em andamento", "question");
  };

  /**
   * onClick function to ask for more money on account
   * @param {*} event
   */
  const solicitarTransfOnClick = async (e) => {
    Swal.fire(
      "Solicitar Transferencia ao ADMIN?",
      "Feature em andamento",
      "question"
    );
  };

  return (
    <div id="user-page">
      <div className="content-wrapper">
        {/* Limited info, so no need to send entire user object like {...user} */}
        <Header
          isAdmin={false}
          imgUrl={user.imgUrl}
          userName={userName}
          fullName={user.fullName}
        />

        {!error ? (
          <div className="body-wrapper">
            <div className="wallet-wrapper">
              <div className="current-balance">
                <h2>Saldo Atual</h2>
                <h1>
                  <NumberFormat
                    value={Number(user.cash.$numberDecimal)}
                    displayType={"text"}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    prefix={"R$ "}
                  />
                </h1>
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
                <Button
                  onClick={printExtratoOnClick}
                  className="custom-btn"
                  id="printExtrato"
                >
                  Imprimir Extrato
                </Button>{" "}
                <Button
                  onClick={solicitarTransfOnClick}
                  className="custom-btn"
                  id="solicitarTransf"
                >
                  Requisitar $
                </Button>{" "}
              </div>
            </div>
          </div>
        ) : (
          <div className="wallet-wrapper">
            <h2 style={{ color: "red", alignSelf: "center" }}>
              Erro ao puxar informações de {user.fullName} !!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
