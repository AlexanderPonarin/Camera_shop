import { KeyboardEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { redirectToRoute } from '../../store/actions';
import styles from './user-order-fail-screen.module.css';
import { Link } from 'react-router-dom';


function UserOrderFailScreen(): JSX.Element {

  const dispatch = useAppDispatch();

  const onKeyDownBtnToCatalogHandler = (evt: KeyboardEvent) => {
    if (evt.code === 'Enter') {
      dispatch(redirectToRoute('/'));
    }
  };

  const onKeyDownBtnToBasketHandler = (evt: KeyboardEvent) => {
    if (evt.code === 'Enter') {
      dispatch(redirectToRoute('/basket'));
    }
  };

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
        onKeyDown={onKeyDownBtnToCatalogHandler}
        className={styles.button}
        tabIndex={0}

      >
        <Link
          tabIndex={-1}
          to={'/'}
        >
      Нажмите для перехода на главную страницу
        </Link>
      </button>
      <button
        tabIndex={0}
        onKeyDown={onKeyDownBtnToBasketHandler}
        className={styles.button}
      >
        <Link
          tabIndex={-1}

          to={'/basket'}
        >
      Нажмите для перехода на страницу корзины
        </Link>
      </button>
    </div>
  );
}

export default UserOrderFailScreen;
