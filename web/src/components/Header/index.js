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

  const logoOnClick = async (e) => {
    Swal.fire({
      title: "Créditos do Logo",
      text: "Esse logo incrível foi feito pela Luisa Urfali.",
      html:
        "<a className='design-pic' href='https://www.behance.net/urfali_luisa'>Clique aqui pra ver mais ideias de Luisa Urfali!<a/>",
      imageUrl:
        "https://media-exp1.licdn.com/dms/image/C4D03AQGZ4z9HM4D60g/profile-displayphoto-shrink_400_400/0/1583366064988?e=1617840000&v=beta&t=FUB_10Rvpv0KMx7UUqZ96h7KqwX-0bW1XOr_BY8tNzI",
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Custom image",
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
        <div className="logo-container" onClick={logoOnClick}>
          <img src={CornerLogo} alt="logo RGBWallet" />
        </div>
      </div>
      <div className="hello-user">
        <h1>
          {props.isAdmin ? "Painel de Usuários" : `Olá, ${props.fullName}`}
        </h1>
        <p>
          {props.isAdmin
            ? "Consulte e altere os dados dos usuários"
            : "Esta é sua carteira virtual"}
        </p>
      </div>
    </div>
  );
}
