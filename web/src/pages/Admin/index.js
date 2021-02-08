import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState([]); // All users from DB
  const [searchQuery, setSearchQuery] = useState(""); // content from searchbar

  /**
   * search bar
   */
  useEffect(() => {
    setError(false);
    setSuccess(true);

    if (searchQuery.trim().length) {
      const result = filteredUsers.filter((str) => {
        return str.fullName.toLowerCase().includes(searchQuery.toLowerCase());
      });

      if (result == "") {
        setError(true);
        setSuccess(false);
      } else {
        setFilteredUsers(result);
      }
    } else {
      setFilteredUsers(users);
    }
  }, [searchQuery]);

  /**
   * loading all users as cards in the page
   */
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get("/allUsers");
        // fixed: this will always contain all users
        setUsers(res.data);
        // variable: changes with userEffect
        setFilteredUsers(res.data);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Displaying all users",
          showConfirmButton: false,
          timer: 1000,
        });

        // setting statuses
        setSuccess(true);
        setError(false);
      } catch (err) {
        await Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error when loading users!",
          showConfirmButton: false,
          timer: 2500,
        });
        setSuccess(false);
        setError(true);
      }
    };

    loadData();
  }, []);

  /**
   * onSubmit function for addUserForm
   * @param {*} event
   */
  const addUserOnSubmit = async (e) => {
    setError(false);
    setSuccess(false);

    const res = true;

    try {
      res = await axios.post("/admin", {
        fullName: e.target.name.value,
        userName: e.target.userName.value,
        didSellProj: e.target.didSellProj.checked,
        isExecutingProj: e.target.isExecutingProj.checked,
        weeklyHours: e.target.weeklyHours.value,
      });
    } catch (err) {
      setResponse("Error");
    }

    if (!res) setError(true);
    else setSuccess(true);

    setResponse(res);
  };

  /**
   * Adicionar Credito button alert
   * @param {*} e
   */
  const confirmAddCred = async (e) => {
    Swal.fire({
      allowOutsideClick: false,
      title: "Adicionar Crédito para Todos?",
      width: "75rem",
      icon: "question",
      html:
        "<h3>A adição de saldo obedece a equação:</h3> <p>saldo += (40 +( 5 * semanasCumpridas))</p><p> * (1 + (vendeuProjeto && 0,2) + (executandoProjeto && 0,1))</p>",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // execute
        setError(false);
        setSuccess(false);

        const res = true;

        // TODO: implement backend
        try {
          // ta certo? precisa de mais args sera?
          res = await axios.post("/addCred");
        } catch (err) {
          setResponse("Error");
        }

        if (!res) setError(true);
        else setSuccess(true);
        setResponse(res);

        // SUCCESS
        await Swal.fire({
          title: "Crédito Adicionado com Sucesso!",
          text: "Todos os usuários receberão a quantia escolhida",
          imageUrl:
            "https://i.pinimg.com/originals/7e/f0/3b/7ef03bc1737fdcd05cbd8f02e9b0be86.gif",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Burning Money...",
        });

        // forcefully reloading page
        window.location.reload();
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = true;

        try {
          res = await axios.get("/eraseCred");
        } catch (err) {
          setResponse("Error");
        }

        // success alert
        await Swal.fire({
          title: "Crédito Zerado com Sucesso!",
          text: "LET IT BUUURN!!!!",
          imageUrl:
            "https://thumbs.gfycat.com/CheerfulEllipticalEstuarinecrocodile-max-1mb.gif",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Burning Money...",
        });

        // forcefully reloading page
        window.location.reload();

        setResponse(res);
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
              <Form.Group controlId="formSearchBar">
                <FormControl
                  className="custom-input"
                  placeholder="Pesquisar por nome..."
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                />
              </Form.Group>
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
            <div className="error-message">Erro ao carregar usuários!</div>
          )}
          {/* using chave=index to avoid error when displaying that */}
          {success &&
            filteredUsers.map((user, index) => (
              <UserCard key={index} chave={index} {...user} />
            ))}
        </div>
      </div>
    </div>
  );
}
