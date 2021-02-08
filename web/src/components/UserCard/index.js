import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import NumberFormat from "react-number-format";
import Moment from "react-moment";

import CustomToggle from "../CustomToggle/index";
import { Button, Accordion, Form } from "react-bootstrap/";

import ProfilePic from "../../assets/images/profile-icon.svg";
import TrashIcon from "../../assets/images/trash-icon.svg";
import TrueIcon from "../../assets/images/true-icon.svg";
import FalseIcon from "../../assets/images/false-icon.svg";

import { FaAngleDown } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import "./styles.css";

export default function UserCard(props) {
  // Req variables
  const [response, setResponse] = useState("");
  // State Variables
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form Variables
  const [isEdited, setIsEdited] = useState(false);

  async function allowFormEditOnClick(event) {
    // toggle behaviour
    if (isEdited) {
      setIsEdited(false);
    } else {
      setIsEdited(true);
    }
  }

  /**
   * updating user's data when submiting form
   * @param {*} e
   */
  async function userUpdateOnSubmit(e) {
    setError(false);
    setSuccess(false);

    const res = true;

    try {
      res = await axios.post("/updateUser", {
        originalUserName: props.userName,
        fullName: e.target.formFullName.value,
        userName: e.target.formFullUsername.value,
        didSellProj: e.target.formDidSellProj.checked,
        isExecutingProj: e.target.formIsExecProj.checked,
        weeklyHours: e.target.formHowManyWeeks.value,
      });
    } catch (err) {
      setResponse("Error");
      await Swal.fire(`ERROR!`, `Detalhes: '${err}'`, "error");
    }

    if (!res) setError(true);
    else setSuccess(true);

    setResponse(res);
  }

  /**
   * User deletion using their name
   * @param {*} e
   * @param {*} name
   */
  async function confirmDelete(e, props) {
    setError(false);
    setSuccess(false);

    Swal.fire({
      title: `Deletar Usuário`,
      text: `Deseja mesmo deletar ${props.fullName}?`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim!",
      cancelButtonText: "Cancelar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.post("/deleteUser", {
            userName: props.userName,
          });

          await Swal.fire(
            `Usuário deletado com sucesso!`,
            `Tchau, '${props.fullName}'...`,
            "success"
          );
          // setting states
          if (!res) setError(true);
          else setSuccess(true);
          setResponse(res);
        } catch (error) {
          Swal.fire(`Erro ao apagar Usuário!`, `${error}`, "error");
          setResponse("ERROR");
        }
      }
    });
  }

  return (
    <div id="custom-card">
      <div className="btn-delete-container">
        <p>ID: {props.chave}</p>
        <span>
          Joined: <Moment format="DD/MM/YY">{props.createdAt}</Moment>
        </span>
        <Button
          className="custom-btn "
          id="btn-delete"
          onClick={(e) => confirmDelete(e, props)}
        >
          <img src={TrashIcon} alt="trash icon" />
        </Button>
      </div>

      <div className="card-header">
        <div className="current-balance">
          <p>{props.fullName}</p>
          <h1>
            {" "}
            <NumberFormat
              // value={Number(props.cash.$numberDecimal)}
              value={Number(props.cash ? props.cash.$numberDecimal : 0)}
              displayType={"text"}
              thousandSeparator={"."}
              decimalSeparator={","}
              prefix={"R$ "}
            />
          </h1>
        </div>
        <img src={ProfilePic} alt="profile" />
      </div>

      <div className="card-body">
        <Accordion defaultActiveKey="0">
          <CustomToggle eventKey="1">
            Detalhes <FaAngleDown />
          </CustomToggle>

          <Accordion.Collapse eventKey="1">
            <div className="card-details">
              <div className="card-commands">
                <Button className="btn-edit" onClick={allowFormEditOnClick}>
                  Editar <FaEdit />
                </Button>
              </div>

              <Form onSubmit={userUpdateOnSubmit}>
                <Form.Group controlId="formFullName">
                  <Form.Label className="custom-card-lbl">
                    Nome Completo
                  </Form.Label>
                  <Form.Control
                    className="custom-card-input"
                    type="text"
                    value={!isEdited ? props.fullName : null}
                    disabled={!isEdited}
                  />
                </Form.Group>

                <Form.Group controlId="formFullUsername">
                  <Form.Label className="custom-card-lbl">
                    Nome de Usuário
                  </Form.Label>
                  <Form.Control
                    className="custom-card-input"
                    type="text"
                    value={!isEdited ? props.userName : null}
                    disabled={!isEdited}
                  />
                </Form.Group>

                <Form.Group controlId="formDidSellProj">
                  <Form.Label className="custom-card-lbl">
                    Venda de projeto nesse mês?
                  </Form.Label>
                  {!isEdited ? (
                    <img
                      className="bool-img"
                      src={props.didSellProj ? TrueIcon : FalseIcon}
                      alt="boolean"
                    />
                  ) : (
                    <div className="switch">
                      <input
                        id="formDidSellProj"
                        type="checkbox"
                        className="switch-input"
                      />
                      <label htmlFor="formDidSellProj" className="switch-label">
                        Switch
                      </label>
                    </div>
                  )}
                </Form.Group>

                <Form.Group controlId="formIsExecProj">
                  <Form.Label className="custom-card-lbl">
                    Algum projeto em execução?
                  </Form.Label>
                  {!isEdited ? (
                    <img
                      className="bool-img"
                      src={props.isExecutingProj ? TrueIcon : FalseIcon}
                      alt="boolean"
                    />
                  ) : (
                    <div className="switch">
                      <input
                        id="formIsExecProj"
                        type="checkbox"
                        className="switch-input"
                      />
                      <label htmlFor="formIsExecProj" className="switch-label">
                        Switch
                      </label>
                    </div>
                  )}
                </Form.Group>

                <Form.Group controlId="formHowManyWeeks">
                  <Form.Label className="custom-card-lbl">
                    Quantas semanas cumpriu 10h/semanais?
                  </Form.Label>
                  <Form.Control
                    className="custom-card-input"
                    type="number"
                    value={!isEdited ? props.weeklyHours : null}
                    disabled={!isEdited}
                  />
                </Form.Group>

                <div className="form-buttons">
                  <Button
                    // Disable if one of the fields is untouched
                    className="custom-card-btn"
                    variant="primary"
                    type="submit"
                    style={
                      !isEdited
                        ? { visibility: "hidden" }
                        : { visibility: "visible" }
                    }
                  >
                    Salvar Alterações
                  </Button>{" "}
                </div>
              </Form>
            </div>
          </Accordion.Collapse>
        </Accordion>
      </div>
    </div>
  );
}
