import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MagnifyingGlass from "../../assets/images/magnifying-glass-1.svg";
import AddMoneyPic from "../../assets/images/adicionar-credito.svg";
import CreateUserPic from "../../assets/images/cadastrar-usuario.svg";
import EraseMoney from "../../assets/images/no-money.svg";

import Header from "../../components/Header/index";
import CustomToggle from "../../components/CustomToggle/index";
import UserCard from "../../components/UserCard/index";

import {
  Navbar,
  Form,
  InputGroup,
  FormControl,
  Button,
  NavDropdown,
  Nav,
} from "react-bootstrap/";

async function confirmZeraCred(e) {
  Swal.fire({
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
        imageUrl: "https://media4.giphy.com/media/d3MMyApsVs3Vpuvu/giphy.gif",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Burning Money...",
      });
    }
  });
}

export default function Admin() {
  return (
    <div id="admin-page">
      <div className="content-wrapper">
        <Header />
        {/* Make search bar a component too? */}
        <div className="navbar-wrapper">
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
            <Button className="custom-btn " id="btnCadUser" variant="primary">
              Cadastrar Usuário
              <img src={CreateUserPic} alt="search arrow" />
            </Button>{" "}
            <Button className="custom-btn" id="btnAddCred" variant="secondary">
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
        </div>
      </div>
    </div>
  );
}
