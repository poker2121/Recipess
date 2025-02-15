import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';
import logo from '../../assets/logo.png';

const Header = ({ toggleSidebar }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button className={styles.mobileToggle} onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Recipe Logo" />
          <h1>Learn, Cook, Eat Your Food</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
