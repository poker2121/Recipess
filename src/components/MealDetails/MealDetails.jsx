import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMealById } from '../../services/api';
import Loader from '../Loader/Loader';
import styles from './MealDetails.module.scss';

const MealDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const data = await getMealById(id);
        if (data.meals && data.meals[0]) {
          const mealData = data.meals[0];
          
          // Extract ingredients and measurements
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = mealData[`strIngredient${i}`];
            const measure = mealData[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '') {
              ingredients.push({
                name: ingredient,
                amount: measure
              });
            }
          }

          setMeal({
            id: mealData.idMeal,
            name: mealData.strMeal,
            category: mealData.strCategory,
            area: mealData.strArea,
            instructions: mealData.strInstructions,
            image: mealData.strMealThumb,
            ingredients: ingredients,
            youtubeUrl: mealData.strYoutube
          });
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        setError('Failed to fetch recipe details');
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error || !meal) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h2>🍽️ Oops!</h2>
          <p>{error || 'Recipe not found'}</p>
          <p className={styles.suggestion}>
            The recipe you're looking for might have been moved or doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mealDetails}>
      <div className={styles.mealHeader}>
        <img src={meal.image} alt={meal.name} />
        <div className={styles.mealTitle}>
          <h2>{meal.name}</h2>
          <p className={styles.cuisine}>{meal.category} • {meal.area}</p>
        </div>
      </div>
      
      <div className={styles.mealContent}>
        <div className={styles.ingredients}>
          <h3>Ingredients</h3>
          <ul>
            {meal.ingredients.map((ingredient, index) => (
              <li key={index}>
                <span className={styles.ingredientName}>{ingredient.name}:</span>
                <span className={styles.ingredientAmount}>{ingredient.amount}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.instructions}>
          <h3>Instructions</h3>
          <p>{meal.instructions}</p>
        </div>

        {meal.youtubeUrl && (
          <div className={styles.video}>
            <h3>Video Tutorial</h3>
            <a href={meal.youtubeUrl} target="_blank" rel="noopener noreferrer" className={styles.youtubeLink}>
              Watch on YouTube
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealDetails;
