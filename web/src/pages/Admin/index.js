import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

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
  // All users from DB
  const [users, setUsers] = useState({});

  /**
   * loading all users as cards in the page
   */
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get("/allUsers");

        console.log("hey", res.data);
        setUsers(res.data);

        // setting statuses
        setSuccess(true);
        setError(false); 
        setResponse("Displaying all users!");

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        setSuccess(false);
        setError(true);
        setResponse("Could not load all users!");

        Swal.fire({
          position: "top-end",
          icon: "error",
          title: response,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    };

    loadData();
  }, []);

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
      await axios.post("/admin", {fullName: e.target.name.value, userName: e.target.userName.value,
        didSellProj: e.target.didSellProj.checked, isExecutingProj: e.target.isExecutingProj.checked,
        weeklyHours: e.target.weeklyHours.value});   
    } 
    catch (err) {
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
                  placeholder="Pesquisar por nome..."
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
          {error && (
            <span style={{ color: "red" }}>Erro ao carregar usuários!</span>
          )}
          {/* using chave=index to avoid error when displaying that */}
          {success &&
            users.map((user, index) => <UserCard key={index} chave={index} {...user} />)}
        </div>
      </div>
    </div>
  );
}
