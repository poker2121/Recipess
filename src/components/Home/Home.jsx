import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { getAllCategories, getMealsByCategory, searchMealByName, getMealById } from '../../services/api';
import MealCard from '../MealCard/MealCard';
import Loader from '../Loader/Loader';
import styles from './Home.module.scss';

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch categories
        const categoriesData = await getAllCategories();
        if (categoriesData.categories) {
          setCategories(categoriesData.categories);
        }

        // Fetch initial meals (random selection)
        const mealsData = await searchMealByName('');
        if (mealsData.meals) {
          setMeals(mealsData.meals);
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchMeals = async () => {
      if (selectedCategory === 'All') return; // Skip if 'All' is selected as it's already loaded

      setLoading(true);
      try {
        const data = await getMealsByCategory(selectedCategory);
        if (data.meals) {
          // Fetch full details for each meal
          const fullMealsData = await Promise.all(
            data.meals.map(async (meal) => {
              const detailsResponse = await getMealById(meal.idMeal);
              return detailsResponse.meals[0];
            })
          );
          setMeals(fullMealsData);
        }
      } catch (err) {
        setError('Failed to fetch meals');
      } finally {
        setLoading(false);
      }
    };

    if (selectedCategory !== 'All') {
      fetchMeals();
    }
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.home}>
      <h1 className={styles.mainTitle}>Learn, Cook, Eat Your Food</h1>
      
      <div className={styles.categoryTabs}>
        <button 
          className={`${styles.categoryTab} ${selectedCategory === 'All' ? styles.active : ''}`}
          onClick={() => handleCategorySelect('All')}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.strCategory}
            className={`${styles.categoryTab} ${selectedCategory === category.strCategory ? styles.active : ''}`}
            onClick={() => handleCategorySelect(category.strCategory)}
          >
            {category.strCategory}
          </button>
        ))}
      </div>

      <div className={styles.filterDropdown}>
        <button 
          className={styles.dropdownButton}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedCategory}
          <FontAwesomeIcon icon={faChevronDown} className={isDropdownOpen ? styles.rotate : ''} />
        </button>
        {isDropdownOpen && (
          <div className={styles.dropdownContent}>
            <div 
              className={styles.dropdownItem} 
              onClick={() => handleCategorySelect('All')}
            >
              All
            </div>
            {categories.map((category) => (
              <div
                key={category.strCategory}
                className={styles.dropdownItem}
                onClick={() => handleCategorySelect(category.strCategory)}
              >
                {category.strCategory}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.mealsGrid}>
        {meals.map((meal) => (
          <MealCard
            key={meal.idMeal}
            id={meal.idMeal}
            name={meal.strMeal}
            image={meal.strMealThumb}
            category={meal.strCategory}
            area={meal.strArea}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
