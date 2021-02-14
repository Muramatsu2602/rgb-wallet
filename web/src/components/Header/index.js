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
  /**
   * testing for URL in string using REGEX
   * @param {*} str
   */
  function validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  /**
   * simple clock in js
   */
  function showTime() {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";

    if (h == 0) {
      h = 12;
    }

    if (h > 12) {
      h = h - 12;
      session = "PM";
    }

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    var time = h + ":" + m + ":" + s + " " + session;
    var clock = document.getElementById("MyClockDisplay");
    if (clock) {
      clock.textContent = time;
      clock.innerText = time;
    }

    setTimeout(showTime, 1000);
  }

  showTime();

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
        "<a  target='_blank' className='design-pic' href='https://www.behance.net/urfali_luisa'>Clique aqui pra ver mais ideias de Luisa Urfali!<a/>",
      imageUrl:
        "https://media-exp1.licdn.com/dms/image/C4D03AQGZ4z9HM4D60g/profile-displayphoto-shrink_400_400/0/1583366064988?e=1617840000&v=beta&t=FUB_10Rvpv0KMx7UUqZ96h7KqwX-0bW1XOr_BY8tNzI",
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
  };

  const clockOnclick = async (e) => {
    Swal.fire({
      title: "De Olho no Clockify, ein?",
      html:
        "<a target='_blank' className='design-pic' href='https://clockify.me/login'>Clique aqui, antes de levar um cartão!<a/>",
      imageUrl:
        "data:image/png;base64,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",
      imageAlt: "clockify always",
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
        <div
          id="MyClockDisplay"
          onClick={clockOnclick}
          class="clock"
          onload="showTime()"
        ></div>
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
