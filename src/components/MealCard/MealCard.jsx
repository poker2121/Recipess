import { Link } from 'react-router-dom';
import styles from './MealCard.module.scss';

const MealCard = ({ id, name, image, category, area }) => {
  return (
    <div className={styles.mealCard}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.mealImage} />
      </div>
      <div className={styles.mealInfo}>
        <h3>{name}</h3>
        <div className={styles.tags}>
          {category && <span className={styles.category}>{category}</span>}
          {area && <span className={styles.area}>{area}</span>}
        </div>
        <Link to={`/meal/${id}`} className={styles.viewRecipe}>
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default MealCard;
