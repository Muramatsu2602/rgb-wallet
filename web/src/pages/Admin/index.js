import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MagnifyingGlass from "../../assets/images/magnifying-glass-1.svg";
import AddMoneyPic from "../../assets/images/adicionar-credito.svg";
import CreateUserPic from "../../assets/images/cadastrar-usuario.svg";
import EraseMoney from "../../assets/images/no-money.svg";

import Header from "../../components/Header/index";
import UserCard from "../../components/UserCard/index";
import ModalForm from "../../components/ModalForm/index";

import { Form, InputGroup, FormControl, Button } from "react-bootstrap/";

/**
 * Cadastrar Usuario button alert
 * @param {*} e
 */
async function confirmAddUser(e) {
  // TODO: add a big modal here or a huge-ass alert
}

/**
 * Adicionar Credito button alert
 * @param {*} e
 */
async function confirmAddCred(e) {
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
}

/**
 * Zerar credito confirmation button Alert
 * @param {*} e
 */
async function confirmZeraCred(e) {
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
}

export default function Admin() {
  return (
    <div id="admin-page">
      <div className="content-wrapper">
        <Header />
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

          <div className="control-buttons">
            <Button
              className="custom-btn "
              id="btnCadUser"
              onClick={(e) => confirmAddUser(e)}
              variant="primary"
            >
              Cadastrar Usuário
              <img src={CreateUserPic} alt="search arrow" />
            </Button>{" "}
            <Button
              className="custom-btn"
              id="btnAddCred"
              onClick={(e) => confirmAddCred(e)}
              variant="secondary"
            >
              Adicionar Crédito
              <img src={AddMoneyPic} alt="search arrow" />
            </Button>{" "}
            <Button
              className="custom-btn "
              id="btnZeraCred"
              onClick={(e) => confirmZeraCred(e)}
              variant="success"
            >
              Zerar Crédito
              <img src={EraseMoney} alt="search arrow" />
            </Button>{" "}
          </div>
        </div>

        <div className="body-wrapper">
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </div>
    </div>
  );
}
