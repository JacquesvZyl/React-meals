import React, { useRef, useState } from "react";
import styles from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isNotFiveChars = (value) => value.trim().length !== 5;

function Checkout(props) {
  const [formInputsValid, setFormInputsValid] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  function confirmHandler(e) {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const streetName = streetInputRef.current.value;
    const postalCodeName = postalInputRef.current.value;
    const cityName = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(streetName);
    const enteredCityIsValid = !isEmpty(cityName);
    const enteredPostalCodeIsValid = !isNotFiveChars(postalCodeName);

    setFormInputsValid({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onSubmit({
      name: enteredName,
      street: streetName,
      city: cityName,
      postalCode: postalCodeName,
    });
  }

  const nameControlStyle = `${styles.control} ${
    formInputsValid.name ? "" : styles.invalid
  }`;
  const streetControlStyle = `${styles.control} ${
    formInputsValid.street ? "" : styles.invalid
  }`;
  const postalControlStyle = `${styles.control} ${
    formInputsValid.postalCode ? "" : styles.invalid
  }`;
  const cityControlStyle = `${styles.control} ${
    formInputsValid.city ? "" : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameControlStyle}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formInputsValid.name && (
          <p className={styles.error}>Please enter a valid Name</p>
        )}
      </div>

      <div className={streetControlStyle}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formInputsValid.street && (
          <p className={styles.error}>Please enter a valid Street Address</p>
        )}
      </div>
      <div className={postalControlStyle}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInputRef} type="text" id="postal" />
        {!formInputsValid.postalCode && (
          <p className={styles.error}>
            Please enter a valid postal Code (5 chars)
          </p>
        )}
      </div>
      <div className={cityControlStyle}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formInputsValid.city && (
          <p className={styles.error}>Please enter a valid City</p>
        )}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
}

export default Checkout;
