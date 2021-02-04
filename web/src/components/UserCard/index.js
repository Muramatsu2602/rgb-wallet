import React from "react";
import Swal from "sweetalert2";

import NumberFormat from "react-number-format";
import Moment from "react-moment";

import CustomToggle from "../CustomToggle/index";
import { Button, Accordion, Form } from "react-bootstrap/";

import ProfilePic from "../../assets/images/profile-icon.svg";
import TrashIcon from "../../assets/images/trash-icon.svg";
import TrueIcon from "../../assets/images/true-icon.svg";
import FalseIcon from "../../assets/images/false-icon.svg";

import { FaAngleDown } from "react-icons/fa";

import "./styles.css";

export default function UserCard(props) {
  /**
   * updating user's data when submiting form
   * @param {*} e
   */
  async function handleUserUpdate(e) {
    e.preventDefault();

    try {
      // const response = await api
      console.log("only a sketch of the handle the update user form");
    } catch (e) {
      await Swal.fire("Erro no Login", `Detalhes=${e.message}`, "error");
    }
  }

  /**
   * User deletion using their name
   * @param {*} e
   * @param {*} name
   */
  async function confirmDelete(e,props) {
    Swal.fire({
      title: `Deletar Usuário`,
      text: `Deseja mesmo deletar ${props.fullName}?`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim!",
      cancelButtonText: "Cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          
          // TODO: auth?
          // const res = await axios.delete("/deleteUser", props.userName);

          Swal.fire(
            `Usuário deletado com sucesso!`,
            `Tchau, '${props.fullName}'...`,
            "success"
          );
        } catch (error) {
          Swal.fire(
            `Erro ao apagar Usuário!`,
            `'${props.fullName}' continua aqui...`,
            "error"
          );
        }
      }
    });

    console.log("ASSAS");
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
              <Form onSubmit={(e) => handleUserUpdate(e)}>
                <Form.Group controlId="formFullName">
                  <Form.Label className="custom-card-lbl">
                    Nome Completo
                  </Form.Label>
                  <Form.Control
                    className="custom-card-input"
                    type="text"
                    placeholder={props.fullName}
                  />
                </Form.Group>

                <Form.Group controlId="formFullUsername">
                  <Form.Label className="custom-card-lbl">
                    Nome de Usuário
                  </Form.Label>
                  <Form.Control
                    className="custom-card-input"
                    type="text"
                    placeholder={props.userName}
                  />
                </Form.Group>

                <Form.Group controlId="formDidSellProj">
                  <Form.Label className="custom-card-lbl">
                    Venda de projeto nesse mês?
                  </Form.Label>
                  <img
                    className="bool-img"
                    src={props.didSellProj ? TrueIcon : FalseIcon}
                    alt="boolean"
                  />
                </Form.Group>

                <Form.Group controlId="formIsExecProj">
                  <Form.Label className="custom-card-lbl">
                    Algum projeto em execução?
                  </Form.Label>
                  <img
                    className="bool-img"
                    src={props.isExecutingProj ? TrueIcon : FalseIcon}
                    alt="boolean"
                  />
                </Form.Group>

                <Form.Group controlId="formHowManyWeeks">
                  <Form.Label className="custom-card-lbl">
                    Quantas semanas cumpriu 10h/semanais?
                  </Form.Label>
                  <Form.Control
                    className="custom-card-input"
                    type="number"
                    placeholder={props.weeklyHours}
                  />
                </Form.Group>

                <div className="form-buttons">
                  <Button
                    // Disable if one of the fields is untouched
                    className="custom-card-btn"
                    variant="primary"
                    type="submit"
                  >
                    Salvar
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
