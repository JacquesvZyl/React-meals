import React, { Fragment } from "react";
import styles from "./Modal.module.css";
import * as ReactDOM from "react-dom";
const portalElement = document.getElementById("overlays");

function Backdrop(props) {
  return <div className={styles.backdrop} onClick={props.onClick} />;
}

function ModalOverlay(props) {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}

function Modal(props) {
  return ReactDOM.createPortal(
    <Fragment>
      <Backdrop onClick={props.onClick} />
      <ModalOverlay>{props.children}</ModalOverlay>
    </Fragment>,
    portalElement
  );
}

export default Modal;
