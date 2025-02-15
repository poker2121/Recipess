import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faHome, faLayerGroup, faHeart, faTimes, faChevronDown, faUtensils, faLeaf, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home';
import MealDetails from './components/MealDetails/MealDetails';
import Ingredients from './components/Ingredients/Ingredients';
import Area from './components/Area/Area';
import styles from './App.module.scss';

// Initialize Font Awesome icons
library.add(faBars, faHome, faLayerGroup, faHeart, faTimes, faChevronDown, faUtensils, faLeaf, faGlobe);

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className={styles.app}>
        <div className={styles.mobileHeader}>
          <button className={styles.menuButton} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <div className={styles.mainContainer}>
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <main className={styles.content}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/meal/:id" element={<MealDetails />} />
              <Route path="/ingredients" element={<Ingredients />} />
              <Route path="/area" element={<Area />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
