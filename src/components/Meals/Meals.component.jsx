import React from "react";
import AvailableMeals from "./AvailableMeals.component";
import MealsSummary from "./MealsSummary.component";

function Meals() {
  return (
    <React.Fragment>
      <MealsSummary />
      <AvailableMeals />
    </React.Fragment>
  );
}

export default Meals;
