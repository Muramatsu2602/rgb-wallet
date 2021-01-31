import React, { ChangeEvent, FormEvent, useState } from "react";
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
  // const [name, setName] = useState(""); // MUDAR ASSIM QUE ESTIVER FUNCIONANDO!
  // const [is_admin, setIsAdmin] = useState(false);

  // TESTING
  const [name, setName] = useState("Teste"); // MUDAR ASSIM QUE ESTIVER FUNCIONANDO!
  const [is_admin, setIsAdmin] = useState(true);

  return (
    <div className="header-wrapper">
      <div className="top-icons">
        <Link onClick={(e) => confirmExit(e)} to="/" className="exit-app">
          <img src={CornerArrow} id="arrow" alt="arrow de retorno" />
          {/* <button onClick={logOut}>Logout</button>
          {redirect && <Redirect to="/" />} */}
        </Link>

        <img src={CornerLogo} alt="logo RGBWallet" />
      </div>
      <div className="hello-user">
        <h1>{!is_admin ? `Olá, ${name}` : "Painel de Usuários"}</h1>
        <p>
          {!is_admin
            ? "Esta é sua carteira virtual"
            : "Consulte e altere os dados dos usuários"}
        </p>
      </div>
    </div>
  );
}
