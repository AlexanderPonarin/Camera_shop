import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getProducts } from '../../store/product-data/selectros';
import { Products } from '../../types/products';
import SearchItem from '../search-item/search-item';

function Header(): JSX.Element {
  const [searchProductName, setSearchProductName] = useState<string>('');
  const products = useAppSelector(getProducts);
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(-1);
  const serchFormRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const getSerchProducts = (productList: Products, searchName: string): Products => {
    const findedProducts = [];
    if(!searchName.length){
      return [];
    }

    for (const item of productList) {
      if(item.name.toLowerCase().includes(searchName.toLowerCase())) {
        findedProducts.push(item);
      }
    }
    return findedProducts;
  };

  const searchProductList: Products = getSerchProducts(products, searchProductName);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedProductIndex((prevIndex) => Math.min(prevIndex + 1, searchProductList.length - 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedProductIndex((prevIndex) => Math.max(prevIndex - 1, -1));
      } else if (event.key === 'Enter' && selectedProductIndex !== -1) {
        const selectedProduct = searchProductList[selectedProductIndex];
        navigate(`/product/${selectedProduct.id}/description`);
      } else if (event.key === 'Escape') {
        setSearchProductName('');
      }
    };
    if (serchFormRef.current) {
      serchFormRef.current.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (serchFormRef.current) {
        serchFormRef.current.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [navigate, searchProductList, selectedProductIndex]);


  return (
    <header className="header" id="header">
      <div className="container">
        <Link to={'/'}className="header__logo" aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item"><Link to={'/'} className="main-nav__link">Каталог</Link>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">Гарантии</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">Доставка</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">О компании</a>
            </li>
          </ul>
        </nav>
        <div className="form-search">
          <form
            ref={serchFormRef}
          >
            <label>
              <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-lens"></use>
              </svg>
              <input

                value={searchProductName}
                onChange={(evt) => setSearchProductName(evt.target.value)}
                className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту"
              />
            </label>
            <ul
              style={{visibility: searchProductList.length ? 'visible' : 'hidden', opacity: searchProductList.length ? 1 : 0}}
              className="form-search__select-list"
            >
              {searchProductList.map((item, index) => (
                <SearchItem
                  key={item.name}
                  product={item}
                  isFocused={index === selectedProductIndex}
                />))}
            </ul>
          </form>
          <button
            style={{display: searchProductList.length ? 'flex' : 'none'}}
            onClick={() => setSearchProductName('')}
            className="form-search__reset" type="reset"
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg><span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <a className="header__basket-link" href="#">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </a>
      </div>
    </header>
  );
}

export default Header;
