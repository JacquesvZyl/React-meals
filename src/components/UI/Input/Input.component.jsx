import React from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const { label, input } = props;
  return (
    <div className={styles.input}>
      <label htmlFor={input.id}>{label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
