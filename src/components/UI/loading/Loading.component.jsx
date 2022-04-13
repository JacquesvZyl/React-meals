import React from "react";

import spinner from "../../../assets/spinner.png";
import styles from "./Loading.module.css";

function Loading(props) {
  const text = props.text ? props.text : "Loading...";
  const color = props.color ? props.color : "white";
  return (
    <div className={styles.loading}>
      <img src={spinner} className={styles.icon} alt="" />
      <p style={{ color: color }}>{text}</p>
    </div>
  );
}

export default Loading;
