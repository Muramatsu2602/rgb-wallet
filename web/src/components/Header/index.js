import React, { useState } from "react";
import Swal from "sweetalert2";

// import { Link } from "react-router-dom";
import Auth from "../../services/AuthService";
import { Redirect } from "react-router-dom";

import CornerLogo from "../../assets/images/corner-logo.svg";
import CornerArrow from "../../assets/images/corner-arrow-left.svg";

import "./styles.css";

export default function Header(props) {
  // Auth
  const [redirect, setRedirect] = useState(false);

  const logOut = (e) => {
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
        // Auth
        e.preventDefault();
        Auth.logOut();
        setRedirect(true);
      }
    });
  };

  return (
    <div className="header-wrapper">
      <div className="top-icons">
        <div className="logout-btn">
          <img
            onClick={logOut}
            src={CornerArrow}
            id="arrow"
            alt="arrow de retorno"
          />
          {redirect && <Redirect to="/" />}
        </div>

        <img src={CornerLogo} alt="logo RGBWallet" />
      </div>
      <div className="hello-user">
        <h1>
          {props.isAdmin 
            ? "Painel de Usuários" 
            : `Olá, ${props.fullName}`
          }
        </h1>
        <p>
          {props.isAdmin
            ? "Consulte e altere os dados dos usuários"
            : "Esta é sua carteira virtual"
          }
        </p>
      </div>
    </div>
  );
}
