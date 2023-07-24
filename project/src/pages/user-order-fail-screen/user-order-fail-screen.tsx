import styles from './user-order-fail-screen.module.scc';
import { Link } from 'react-router-dom';


function UserOrderFailScreen(): JSX.Element {
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

export default UserOrderFailScreen;
