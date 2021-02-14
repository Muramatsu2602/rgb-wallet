import React, { useState, useEffect } from "react";
import Auth from "../../services/AuthService";
import axios from "axios";
import Swal from "sweetalert2";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";

import Header from "../../components/Header/index";
import { Button } from "react-bootstrap/";

import NumberFormat from "react-number-format";

export default function User() {
  //   const [redirect, setRedirect] = useState(false); // IN HEADER!
  const [user, setUser] = useState({
    fullName: "",
    cash: 0,
  });
  const [error, setError] = useState(false);
  // User properties,actions
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
  const requisitarDinheiroOnClick = async (e) => {
    Swal.fire({
      title: "Solicitar $$$ ao ADMIN?",
      text:
        "Vamos mandar um e-mail pedindo pra adicionar crédito à sua conta !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Quero!",
      cancelButtonText: "Nem!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Auth
        // manda notificacao para tal card?
      }
    });
  };

  /**
   * onClick function to ask for more money on account
   * @param {*} event
   */
  const declararGastoOnClick = async (e) => {
    Swal.fire({
      allowOutsideClick: false,
      title: "Inserir gasto a ser debitado",
      html: `<input type="number" id="newExpense" class="swal2-input"  placeholder="30,00">
            `,
      showCancelButton: true,
      confirmButtonText: "Adicionar!",
      cancelButtonText: "Nem!",
      cancelButtonColor: "#d33",
      focusConfirm: false,
      preConfirm: () => {
        const newExpense = Swal.getPopup().querySelector("#newExpense").value;

        if (!newExpense) {
          Swal.showValidationMessage(`Por Favor insira um valor em R$!`);
        }

        if (newExpense < 0) {
          Swal.showValidationMessage(`Por Favor insira um valor Maior que 0!`);
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const expense = Swal.getPopup().querySelector("#newExpense").value;
        try {
          const res = await axios.post("/declareExpense", {
            userName: userName,
            cash: user.cash,
            expense: expense,
          });
        } catch (err) {
          await Swal.fire(`ERROR!`, `Detalhes: '${err}'`, "error");
        }

        await Swal.fire({
          title: " Gasto declarado com sucesso!",
          text: `Você está R$${expense} mais pobre...`,
          icon: "success",
        });

        // forcefully reloading page
        window.location.reload();
      }
    });
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
                <h1
                  className={
                    Number(user.cash.$numberDecimal) < 0
                      ? "negative-cash"
                      : null
                  }
                >
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
                {/* <Accordion defaultActiveKey="0">
                  <CustomToggle eventKey="1">
                    Visualizar Extrato <FaAngleDown />
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
                </Accordion> */}
              </div>

              <div className="user-buttons">
                <Button
                  onClick={requisitarDinheiroOnClick}
                  className="custom-btn"
                  id="requisitarDinheiro"
                >
                  Requisitar
                  <span>&nbsp;&nbsp;</span>
                  <GiReceiveMoney size={30} />
                </Button>{" "}
                <Button
                  onClick={declararGastoOnClick}
                  className="custom-btn"
                  id="declararGasto"
                >
                  Declarar Gasto
                  <GiPayMoney size={30} />
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
