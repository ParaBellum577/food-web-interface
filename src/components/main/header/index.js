import React from "react";
import styles from "./style.module.scss";
import logo from "../../style/img/Imgs/dish.svg";


export default function Header() {

  return (
    <div className={styles.header}>
      <div className={styles.avatar}>
        <img src={logo} alt="logo"/>
      </div>
    </div>
  )
}

