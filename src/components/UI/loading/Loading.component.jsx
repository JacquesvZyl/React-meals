import React from "react";
import LoopIcon from "@mui/icons-material/Loop";

import styles from "./Loading.module.css";

function Loading(props) {
  const text = props.text ? props.text : "Loading...";
  const color = props.color ? props.color : "white";
  return (
    <div className={styles.loading}>
      <LoopIcon className={styles.icon} style={{ color: color }} />
      <p style={{ color: color }}>{text}</p>
    </div>
  );
}

export default Loading;
