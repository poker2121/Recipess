import { useState, useEffect } from 'react';
import { getAllIngredients, getMealsByIngredient } from '../../services/api';
import MealCard from '../MealCard/MealCard';
import Loader from '../Loader/Loader';
import styles from './Ingredients.module.scss';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await getAllIngredients();
        if (data.meals) {
          setIngredients(data.meals);
        }
      } catch (err) {
        setError('Failed to fetch ingredients');
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  useEffect(() => {
    const fetchMealsByIngredient = async () => {
      if (!selectedIngredient) return;

      setLoading(true);
      try {
        const data = await getMealsByIngredient(selectedIngredient);
        if (data.meals) {
          setMeals(data.meals);
        }
      } catch (err) {
        setError('Failed to fetch meals');
      } finally {
        setLoading(false);
      }
    };

    fetchMealsByIngredient();
  }, [selectedIngredient]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.ingredients}>
      <div className={styles.ingredientsList}>
        {ingredients.map((ingredient) => (
          <button
            key={ingredient.idIngredient}
            className={`${styles.ingredientButton} ${
              selectedIngredient === ingredient.strIngredient ? styles.active : ''
            }`}
            onClick={() => setSelectedIngredient(ingredient.strIngredient)}
          >
            <img 
              src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`}
              alt={ingredient.strIngredient}
            />
            <span>{ingredient.strIngredient}</span>
          </button>
        ))}
      </div>

      {selectedIngredient && (
        <div className={styles.mealsGrid}>
          {meals.map((meal) => (
            <MealCard
              key={meal.idMeal}
              id={meal.idMeal}
              name={meal.strMeal}
              image={meal.strMealThumb}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Ingredients;
