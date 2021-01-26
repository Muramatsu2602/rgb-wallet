import React, { useState, useEffect } from "react";

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
            <Button className="custom-btn" id="btnAddCred"  variant="secondary">
              Adicionar Crédito 
              <img src={AddMoneyPic} alt="search arrow" />
            </Button>{" "}
            <Button className="custom-btn " id="btnZeraCred" variant="success">
              Zerar Crédito 
              <img src={EraseMoney} alt="search arrow" />
            </Button>{" "}
          </div>
        </div>
        <div className="body-wrapper">
          <UserCard/>
          <UserCard/>
          <UserCard/>

        </div>
      </div>
    </div>
  );
}
