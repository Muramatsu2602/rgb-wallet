import axios from "axios";
import React, { useState, useEffect } from "react";

import "./styles.css";

/**
 * displays header for our application
 */
function Header() {
  return (
    <div className="header">
      <h1 className="title">RGBWallet</h1>
      
    </div>
  );
}


/**
 * handles all the CRUD functions regarding the functionality of the site
 * @param {*} props
 */
function Body(props) {

  return (
    <div className="body">
        <h1>Lorem Ipsum</h1>
    </div>
  );
}

function Login() {
  return (
    <div>
      <Header />
      <h2 className="subtitle">Sua lista de pokemons</h2>
      <div>
        <Body className="corpo" />
      </div>
    </div>
  );
}

export default Login;
