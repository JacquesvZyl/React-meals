import React, { useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card/Card.component";
import Meal from "./MealItem/MealItem.component";
import useHTTP from "../../hooks/useHTTP";
import LoopIcon from "@mui/icons-material/Loop";

function AvailableMeals() {
  const { error, isLoading, sendRequest } = useHTTP();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    function mealsAddHandler(mealsData) {
      const loadedMeals = [];
      for (const m in mealsData) {
        loadedMeals.push({
          id: m,
          name: mealsData[m].name,
          description: mealsData[m].description,
          price: mealsData[m].price,
        });
      }
      setMeals(loadedMeals);
    }

    sendRequest(
      {
        url: process.env.REACT_APP_DB_URL,
      },
      mealsAddHandler
    );
  }, []);

  const content = isLoading ? (
    <div className={styles.loading}>
      <LoopIcon className={styles.icon} />
    </div>
  ) : (
    meals.map((meal) => (
      <Meal
        title={meal.name}
        key={meal.id}
        description={meal.description}
        price={meal.price}
        id={meal.id}
      />
    ))
  );
  return (
    <section className={styles.meals}>
      <Card>
        {error ? <p className={styles.error}>{error}</p> : <ul>{content}</ul>}
      </Card>
    </section>
  );
}

export default AvailableMeals;
