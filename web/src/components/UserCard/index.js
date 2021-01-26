import React, { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import {
  Navbar,
  Form,
  InputGroup,
  FormControl,
  Button,
  NavDropdown,
  Nav,
  Card,
} from "react-bootstrap/";

import "./styles.css";

export default function UserCard() {
  return (
    <Card className="custom-card">
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}
