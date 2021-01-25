import React from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import CornerLogo from "../../assets/images/corner-logo.svg";
import CornerArrow from "../../assets/images/corner-arrow-left.svg";

import "./styles.css";

async function confirmExit(e) {
  
  Swal.fire({
    title: "Vai vazar?",
    text: "Veja se terminou o que veio aqui fazer!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Fui!",
    cancelButtonText: "Nem!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Tchau!", "Até a próxima", "success");

      e.preventDefault();
    }
  });

  console.log("ASSAS");
}

export default function Header() {
  return (
    <div className="header-wrapper">
      <div className="top-icons">
        <Link onClick={(e) => confirmExit(e)} to="/" className="exit-app">
          <img src={CornerArrow} id="arrow" alt="arrow de retorno" />
        </Link>

        <img src={CornerLogo} alt="logo RGBWallet" />
      </div>
      <div className="hello-user">
        <h1>Olá, Fulano</h1>
        <p>Esta é sua carteira virtual</p>
      </div>
    </div>
  );
}
