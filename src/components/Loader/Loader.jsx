import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <div className={styles.plate}></div>
        <div className={styles.fork}></div>
        <div className={styles.knife}></div>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
