import styles from './not-found-screen.module.css';
import { Link } from 'react-router-dom';


function NotFoundScreen(): JSX.Element {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>404</h1>
      <p className={styles.text}>Страница не найдена.</p>
      <img
        src="/img/not-found-screen-img/not-found-screen-img.png"
        alt="Page not found"
        className={styles.image}
      />
      <button
        className={styles.button}
      >
        <Link to={'/'} >
      Нажмите для перехода на главную страницу
        </Link>
      </button>
    </div>
  );
}

export default NotFoundScreen;
