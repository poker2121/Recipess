import { useState, useEffect } from 'react';
import { getAllAreas, getMealsByArea } from '../../services/api';
import MealCard from '../MealCard/MealCard';
import Loader from '../Loader/Loader';
import styles from './Area.module.scss';

const Area = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const data = await getAllAreas();
        if (data.meals) {
          setAreas(data.meals);
        }
      } catch (err) {
        setError('Failed to fetch areas');
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  useEffect(() => {
    const fetchMealsByArea = async () => {
      if (!selectedArea) return;

      setLoading(true);
      try {
        const data = await getMealsByArea(selectedArea);
        if (data.meals) {
          setMeals(data.meals);
        }
      } catch (err) {
        setError('Failed to fetch meals');
      } finally {
        setLoading(false);
      }
    };

    fetchMealsByArea();
  }, [selectedArea]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.area}>
      <div className={styles.areaGrid}>
        {areas.map((area) => (
          <button
            key={area.strArea}
            className={`${styles.areaButton} ${
              selectedArea === area.strArea ? styles.active : ''
            }`}
            onClick={() => setSelectedArea(area.strArea)}
          >
            <span className={styles.areaName}>{area.strArea}</span>
          </button>
        ))}
      </div>
      
      {selectedArea && (
        <div className={styles.mealsGrid}>
          {meals.map((meal) => (
            <MealCard
              key={meal.idMeal}
              id={meal.idMeal}
              name={meal.strMeal}
              image={meal.strMealThumb}
              area={meal.strArea}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Area;
