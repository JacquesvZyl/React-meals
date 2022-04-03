import React, { useRef, useState } from "react";
import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input/Input.component";

function MealItemForm(props) {
  const { addTocart } = props;
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  function submitHandler(e) {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNum = +amountInputRef.current.value;
    if (
      !enteredAmount.trim().length ||
      enteredAmountNum < 1 ||
      enteredAmountNum > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    addTocart(enteredAmountNum);
  }
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          type: "number",
          id: "amount",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && (
        <span className={styles.error}>
          Please enter an amount between 1 and 5
        </span>
      )}
    </form>
  );
}

export default MealItemForm;
