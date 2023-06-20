import styles from './not-found-screen.module.css';
import { Link } from 'react-router-dom';

function NotFoundScreen(): JSX.Element {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>404</h1>
      <p className={styles.text}>Страница не найдена.</p>
      <img
        src="https://media.giphy.com/media/l41YskXp7Yqq3yYzG/source.gif"
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
