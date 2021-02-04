import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MagnifyingGlass from "../../assets/images/magnifying-glass-1.svg";
import AddMoneyPic from "../../assets/images/adicionar-credito.svg";
import EraseMoney from "../../assets/images/no-money.svg";

import Header from "../../components/Header/index";
import UserCard from "../../components/UserCard/index";

import { Form, InputGroup, FormControl, Button } from "react-bootstrap/";
import { Container } from "../../components/Container";

export default function Admin() {
  // Req variables
  const [response, setResponse] = useState("");

  // State Variables
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const users = [
    {
      id: 1,
      isAdmin: false,
      fullName: "Pedro Soares",
      userName: "user1",
      didSellProj: false,
      isExecutingProj: false,
      weeklyHours: 10,
      createdAt: "19/02/22",
      cash: 10.32,
    },
    {
      id: 2,
      isAdmin: false,
      fullName: "Johnson McRibs",
      userName: "user2",
      didSellProj: false,
      isExecutingProj: true,
      weeklyHours: 10,
      createdAt: "19/02/22",
      cash: 100032.89,
    },
    {
      id: 3,
      isAdmin: false,
      fullName: "Maria Smith",
      userName: "user3",
      didSellProj: true,
      isExecutingProj: true,
      weeklyHours: 132,
      createdAt: "19/02/22",
      cash: 1990.34,
    },
  ];

  /**
   * onSubmit function for addUserForm
   * @param {*} event
   */
  const addUserOnSubmit = async (e) => {
    e.preventDefault(e);

    setError(false);
    setSuccess(false);

    const res = true;

    try {
      // check server.js
      // const res = await axios.post("/admin", {
      //   userName: userLogado.userName,
      // });

      alert(e.target.name.value);
      alert(e.target.userName.value);
      alert("didSellProj?: " + e.target.didSellProj.checked);
      alert("isExecutingProj?: " + e.target.isExecutingProj.checked);
      alert(e.target.weeklyHours.value);
    } catch (err) {
      setResponse("Error");
    }

    if (!res) setError(true);
    else setSuccess(true);
  };

  /**
   * Adicionar Credito button alert
   * @param {*} e
   */
  const confirmAddCred = async (e) => {
    Swal.fire({
      allowOutsideClick: false,
      title: "Adicionar Crédito",
      html: `<input type="number" id="credito" class="swal2-input"  placeholder="Insira um valor em R$">
          `,
      showCancelButton: true,
      confirmButtonText: "Adicionar!",
      cancelButtonText: "Nem!",
      cancelButtonColor: "#d33",
      focusConfirm: false,
      preConfirm: () => {
        const credito = Swal.getPopup().querySelector("#credito").value;
        if (!credito) {
          Swal.showValidationMessage(`Por Favor insira um valor!`);
        }
        return { credito: credito };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Crédito Adicionado com Sucesso!",
          text: "Todos os usuários receberão a quantia escolhida",
          imageUrl:
            "https://i.pinimg.com/originals/7e/f0/3b/7ef03bc1737fdcd05cbd8f02e9b0be86.gif",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Burning Money...",
        });

        //  this.myMethod(); // this should execute now
      }
    });
  };

  /**
   * Zerar credito confirmation button Alert
   * @param {*} e
   */
  const confirmZeraCred = async (e) => {
    Swal.fire({
      allowOutsideClick: false,
      title: `Zerar Crédito`,
      text: `Deseja mesmo zerar o crédito de TODOS os usuários?`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim!",
      cancelButtonText: "Cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Crédito Zerado com Sucesso!",
          text: "LET IT BUUURN!!!!",
          imageUrl:
            "https://thumbs.gfycat.com/CheerfulEllipticalEstuarinecrocodile-max-1mb.gif",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Burning Money...",
        });

        //  this.myMethod(); // this should execute now
      }
    });
  };

  return (
    <div id="admin-page">
      <div className="content-wrapper">
        <Header isAdmin={true} fullName="TEST_NAME" />
        {/* Make search bar a component too? */}
        <div className="navbar-wrapper sticky">
          <div className="search-bar">
            <Form inline>
              <InputGroup>
                <FormControl
                  className="custom-input"
                  placeholder="Pesquisar..."
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <Button className="custom-btn " id="btn_search" type="submit">
                <img src={MagnifyingGlass} alt="search arrow" />
              </Button>
            </Form>
          </div>

          <div className="control-buttons ">
            <Container
              triggerText="Cadastrar Usuário"
              id="btnCadUser"
              onSubmit={addUserOnSubmit}
            ></Container>
            <Button
              className="custom-btn"
              id="btnAddCred"
              onClick={(e) => confirmAddCred(e)}
              variant="secondary"
            >
              Adicionar Crédito
              <img
                src={AddMoneyPic}
                className="margin-left-img"
                alt="search arrow"
              />
            </Button>{" "}
            <Button
              className="custom-btn "
              id="btnZeraCred"
              onClick={(e) => confirmZeraCred(e)}
              variant="success"
            >
              Zerar Crédito
              <img
                src={EraseMoney}
                className="margin-left-img"
                alt="search arrow"
              />
            </Button>{" "}
          </div>
        </div>

        <div className="body-wrapper">
          {users.map((user, index) => (
            <UserCard id={index} {...user} />
          ))}
        </div>
      </div>
    </div>
  );
}
