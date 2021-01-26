import React, { useState, useEffect } from "react";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MagnifyingGlass from "../../assets/images/magnifying-glass-1.svg";

import Header from "../../components/Header/index";
import CustomToggle from "../../components/CustomToggle/index";

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
              <Button className="custom-btn" type="submit">
                <img src={MagnifyingGlass} alt="search arrow" />
              </Button>
            </Form>
          </div>

          <div className="control-buttons">
            <Button variant="primary">Primary</Button>{" "}
            <Button variant="secondary">Secondary</Button>{" "}
            <Button variant="success">Success</Button>{" "}
          </div>
        </div>
        <div className="body-wrapper"></div>
      </div>
    </div>
  );
}
