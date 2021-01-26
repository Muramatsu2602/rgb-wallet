import React, { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import CustomToggle from "../CustomToggle/index";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap/";

import ProfilePic from "../../assets/images/profile-icon.svg";
import TrashIcon from "../../assets/images/trash-icon.svg";

import "./styles.css";

export default function UserCard() {
  return (
    <div id="custom-card">
      <div className="card-header">
        <Button className="custom-btn " id="btn-delete">
          <img src={TrashIcon} alt="trash icon" />
        </Button>
        <div className="current-balance">
          <p>Fulano Da Silva</p>
          <h1>R$ 1000,00</h1>
        </div>
        <img src={ProfilePic} />
      </div>

      <div className="card-body"></div>
    </div>
  );
}
