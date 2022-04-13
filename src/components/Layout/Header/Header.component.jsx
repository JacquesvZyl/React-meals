import React, { Fragment } from "react";
import styles from "./Header.module.css";
import mealsImg from "../../../assets/meals.jpg";
import HeaderCartButton from "../HeaderCartButton/HeaderCartButton.component";
import logo from "../../../assets/logo.png";

function Header(props) {
  return (
    <Fragment>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="Logo" />
        <div className={styles["button-container"]}>
          <HeaderCartButton onShowCart={props.onShowCart} />
        </div>
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImg} alt="a table full of food" />
      </div>
    </Fragment>
  );
}

export default Header;
