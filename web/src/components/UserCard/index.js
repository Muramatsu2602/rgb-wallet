import React, { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import CustomToggle from "../CustomToggle/index";
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

          <Accordion.Collapse eventKey="1">
            <div className="card-details">
              <Form onSubmit={(e) => handleUserUpdate(e)}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="custom-card-lbl">Nome</Form.Label>
                  <Form.Control
                    className="custom-card-input"
                    type="email"
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
