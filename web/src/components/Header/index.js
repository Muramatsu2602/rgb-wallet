import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import Auth from "../../services/AuthService";
import { Redirect } from "react-router-dom";

import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling the popcorn tooltip text

import defaultProfilePic from "../../assets/images/profile-icon.svg";
import CornerLogo from "../../assets/images/corner-logo.svg";
import CornerArrow from "../../assets/images/corner-arrow-left.svg";

import "./styles.css";

export default function Header(props) {
  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
  // Auth
  const [redirect, setRedirect] = useState(false);
  // Req variables
  const [response, setResponse] = useState("");

  // Nice Tooltip
  tippy("#myProfilePic", {
    content: "Clique para Alterar a Foto!",
  });

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

  // changing profile picture upon clicking on the icon
  const changeProfilePicOnClick = async (e) => {
    Swal.fire({
      allowOutsideClick: false,
      title: "Insira a URL da nova foto de perfil!",
      html: `<input type="text" id="newImgUrl" class="swal2-input"  placeholder="https://avatars.githubusercontent.com/u/3723">
            `,
      showCancelButton: true,
      confirmButtonText: "Alterar!",
      cancelButtonText: "Nem!",
      cancelButtonColor: "#d33",
      focusConfirm: false,
      preConfirm: () => {
        const newImgUrl = Swal.getPopup().querySelector("#newImgUrl").value;
        if (!newImgUrl) {
          Swal.showValidationMessage(`Não insira URL vazia!`);
        }

        if (!validURL(newImgUrl)) {
          Swal.showValidationMessage(`Por Favor insira uma url!`);
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.post("/updateProfilePic", {
            userName: props.userName,
            imgUrl: Swal.getPopup().querySelector("#newImgUrl").value,
          });
        } catch (err) {
          setResponse("Error");
          await Swal.fire(`ERROR!`, `Detalhes: '${err}'`, "error");
        }

        await Swal.fire({
          title: "Foto de perfil alterada com sucesso!",
          text: `${props.fullName} de cara nova!`,
          icon: "success",
        });

        // forcefully reloading page
        window.location.reload();
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
        <div className="logo-container" onClick={logoOnClick}>
          <img src={CornerLogo} alt="logo RGBWallet" />
        </div>
      </div>
      <div className="hello-user-container">
        {!props.isAdmin ? (
          <img
            onClick={changeProfilePicOnClick}
            className="profile-pic"
            id="myProfilePic"
            src={props.imgUrl ? props.imgUrl : defaultProfilePic}
            alt="profile"
          />
        ) : null}
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
    </div>
  );
}
