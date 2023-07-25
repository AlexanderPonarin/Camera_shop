import styles from './user-order-fail-screen.module.css';
import { Link } from 'react-router-dom';


function UserOrderFailScreen(): JSX.Element {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Ошибка</h1>
      <p className={styles.text}>Заказ не был отправлен</p>
      <img
        src="/img/user-order-fail-screen-img/fail-order-screen-image.jpg"
        alt="fail order"
        className={styles.image}
      />
      <button
        className={styles.button}
      >
        <Link to={'/'} >
      Нажмите для перехода на главную страницу
        </Link>
      </button>
      <button
        className={styles.button}
      >
        <Link to={'/basket'} >
      Нажмите для перехода на страницу корзины
        </Link>
      </button>
    </div>
  );
}

export default UserOrderFailScreen;
