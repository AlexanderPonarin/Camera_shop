import styles from './user-order-fail-screen.css';


function UserOrderFailScreen(): JSX.Element {
  return (
    <div className={styles.container}>
      <h1>Не удалось оформить заказ</h1>
      <a className="button" href="cart.html">
            Вернуться в Корзину
      </a>
      <a className="button" href="catalog.html">
            Вернуться в Каталог
      </a>
    </div>
  );
}

export default UserOrderFailScreen;
