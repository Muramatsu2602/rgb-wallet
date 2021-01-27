import React, { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import CustomToggle from "../CustomToggle/index";
import ContextAwareToggle from "../ContextAwareToggle/index";

import {
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  Accordion,
  Form,
} from "react-bootstrap/";

import ProfilePic from "../../assets/images/profile-icon.svg";
import TrashIcon from "../../assets/images/trash-icon.svg";
import TrueIcon from "../../assets/images/true-icon.svg";
import FalseIcon from "../../assets/images/false-icon.svg";

import { FaAngleDown } from "react-icons/fa";

import "./styles.css";

async function handleUserUpdate(e) {
  e.preventDefault();

  try {
    // const response = await api
    console.log("only a sketch of the handle the update user form");
  } catch (e) {
    await Swal.fire("Erro no Login", `Detalhes=${e.message}`, "error");
  }
}

export default function UserCard() {
  const [isExecutingProj, setIsExecutingProj] = useState(false); // MUDAR ASSIM QUE ESTIVER FUNCIONANDO!
  const [didSellProj, setDidSellProj] = useState(true);

  return (
    <div id="custom-card">
      <div className="btn-delete-container">
        <Button className="custom-btn " id="btn-delete">
          <img src={TrashIcon} alt="trash icon" />
        </Button>
      </div>

      <div className="card-header">
        <div className="current-balance">
          <p>Fulano Da Silva</p>
          <h1>R$ 2000,00</h1>
        </div>
        <img src={ProfilePic} />
      </div>

      <div className="card-body">
        <Accordion defaultActiveKey="0">
          <CustomToggle eventKey="1">
            Detalhes <FaAngleDown />
          </CustomToggle>
          {/* <ContextAwareToggle eventKey="1">
            {" "}
            Detalhes <FaAngleDown />
          </ContextAwareToggle> */}

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
                    placeholder="Digite seu nome"
                  />
                </Form.Group>

                <Form.Group controlId="formFullUsername">
                  <Form.Label className="custom-card-lbl">
                    Nome de Usuário
                  </Form.Label>
                  <Form.Control
                    className="custom-card-input"
                    type="text"
                    placeholder="Digite seu nome"
                  />
                </Form.Group>

                <Form.Group controlId="formDidSellProj">
                  <Form.Label className="custom-card-lbl">
                    Venda de projeto nesse mês?
                  </Form.Label>
                  <img src={didSellProj ? TrueIcon : FalseIcon} />
                </Form.Group>

                <Form.Group controlId="formIsExecProj">
                  <Form.Label className="custom-card-lbl">
                    Algum projeto em execução?
                  </Form.Label>
                  <img src={isExecutingProj ? TrueIcon : FalseIcon} />
                </Form.Group>

                <Form.Group controlId="formHowManyWeeks">
                  <Form.Label className="custom-card-lbl">
                    Quantas semanas cumpriu 10h/semanais?
                  </Form.Label>
                  <Form.Control
                    className="custom-card-input"
                    type="text"
                    placeholder="Digite seu nome"
                  />
                </Form.Group>

                <div className="form-buttons">
                  <Button
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
