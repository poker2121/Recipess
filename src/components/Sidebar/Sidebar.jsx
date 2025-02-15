import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faLeaf, faGlobe, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './Sidebar.module.scss';
import logo from '../../assets/logo.png';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeButton} onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      
      <div className={styles.logo}>
        <img src={logo} alt="Recipe Logo" />
       
      </div>
      
      <nav>
        <NavLink 
          to="/" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          onClick={onClose}
        >
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faUtensils} />
          </div>
          <span>Meals</span>
        </NavLink>
        <NavLink 
          to="/ingredients" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          onClick={onClose}
        >
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faLeaf} />
          </div>
          <span>Ingredients</span>
        </NavLink>
        <NavLink 
          to="/area" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          onClick={onClose}
        >
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faGlobe} />
          </div>
          <span>Area</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
