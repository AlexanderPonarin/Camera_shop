import { useEffect, useState } from 'react';
import Banner from '../../components/banner/banner';
import CatalogFilterForm from '../../components/catalog-filter-form/catalog-filter-form';
import CatalogSortForm from '../../components/catalog-sort-form/catalog-sort-form';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import Header from '../../components/header/header';
import ProductCard from '../../components/product-card/product-card';
import { Product, Products } from '../../types/products';
import { PromoProduct } from '../../types/promo-product';
import AddProductModal from '../../components/modals/add-product-modal/add-product-modal';
import { Link, useSearchParams } from 'react-router-dom';
import ReviewModalSuccess from '../../components/modals/review-modal-success/review-modal-success';
import { getSortProducts } from '../../utils/get-sort-products';
import { getFilterProducts } from '../../utils/get-filter-products';
import { ProductsFilterOption } from '../../types/products-filter-option';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getReviews } from '../../store/product-data/selectros';
import { DataReviesList } from '../../types/data-reviews-list';
import { fetchReviewsAction } from '../../store/api-action';
import AddProductSuccessModal from '../../components/modals/add-product-success-modal/add-product-success-modal';
import { setIsProductsDataLoading } from '../../store/product-data/product-data';


type CatalogScreenProps = {
  products: Products;
  promoProduct: PromoProduct;
}

function CatalogScreen({products, promoProduct}: CatalogScreenProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParams = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState<number>(Number(pageParams));
  const reviews: DataReviesList = useAppSelector(getReviews);
  const productsPerPage = 9;
  const [productInAddModal, setProductInAddModal] = useState<Product>({} as Product);
  const [sortType, setSortType] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const [filterOptions, setFilterOptions] = useState({} as ProductsFilterOption);
  const filteredProducts = getFilterProducts({products, filterOptions});
  const sortedProducts = getSortProducts({products: filteredProducts, reviews, type: sortType, order: sortOrder});
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const [isLoadedProductIdList, setIsLoadedProductIdList] = useState<number[]>([]);


  useEffect(() => {
    if(currentProducts.length) {
      dispatch(setIsProductsDataLoading(true));
      for(let i = 0; i < currentProducts.length; i++) {
        if(!reviews[currentProducts[i].id] && !isLoadedProductIdList.includes(currentProducts[i].id)) {
          dispatch(fetchReviewsAction(currentProducts[i].id));
          setIsLoadedProductIdList((prevIsLoadedProductIdList) => [...prevIsLoadedProductIdList, currentProducts[i].id]);
        }
      }
      dispatch(setIsProductsDataLoading(false));
    }

  },[currentProducts]);

  useEffect(() => {
    if(!pageParams) {
      const params = new URLSearchParams(window.location.search);
      params.set('page', '1');
      setSearchParams(params);
    }
    if(sortedProducts.length !== 0 && sortedProducts.length + productsPerPage < currentPage * productsPerPage) {
      const params = new URLSearchParams(window.location.search);
      params.set('page', '1');
      setSearchParams(params);
    }
    setCurrentPage(Number(pageParams));
  },[currentPage, pageParams, searchParams, setSearchParams, sortedProducts.length]);


  const sortTypeChangeHandler = (type: string) => {
    setSortType(type);
  };

  const sortOrderChangeHandler = (order: string) => {
    setSortOrder(order);
  };

  const filterOptionsChangeHandler = (minPrice: number, maxPrice: number, productCategory: string | null, productType: string[] | null, level: string[] | null) => {
    setFilterOptions({
      minPrice: minPrice,
      maxPrice: maxPrice,
      productCategory: productCategory,
      productTypes: productType,
      level: level
    });
  };

  const paginate = (pageNumber: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', pageNumber.toString());
    setSearchParams(params);
  };

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(sortedProducts.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const params = new URLSearchParams(window.location.search);
      params.set('page', (currentPage - 1).toString());
      setSearchParams(params);
    }
  };

  const goToNextPage = () => {
    if (currentPage < pageNumbers.length) {
      const params = new URLSearchParams(window.location.search);
      params.set('page', (currentPage + 1).toString());
      setSearchParams(params);
    }
  };

  const onBasketClickHandler = (product: Product) => {
    setProductInAddModal(product);
  };


  return (
    <>
      <Logo />
      <div className="wrapper">
        <Header />
        <main>
          <Banner
            promoProduct={promoProduct}
            productDescription={products.find((item) => item.id === promoProduct?.id)?.description || ''}
          />
          <div className="page-content">
            <div className="breadcrumbs">
              <div className="container">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link" href="/">Главная
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </a>
                  </li>
                  <li className="breadcrumbs__item">
                    <Link to={'/'}>
                      <span className="breadcrumbs__link breadcrumbs__link--active">
                    Каталог
                      </span>
                    </Link>

                  </li>
                </ul>
              </div>
            </div>
            <section className="catalog">
              <div className="container">
                <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
                <div className="page-content__columns">
                  <div className="catalog__aside">
                    <CatalogFilterForm
                      products={sortedProducts}
                      onFilterChangedHandler={filterOptionsChangeHandler}
                    />
                  </div>
                  <div className="catalog__content">
                    <CatalogSortForm
                      sortTypeChangeHandler={sortTypeChangeHandler}
                      sortOrderChangeHandler={sortOrderChangeHandler}
                    />
                    <div className="cards catalog__cards">
                      {
                        currentProducts.length ?
                          currentProducts.map((item) =>
                            <ProductCard key={item.id} product={item} cb={onBasketClickHandler}/>)
                          : <p>По вашему запросу ничего не найдено</p>
                      }
                    </div>
                    <div className="pagination">
                      <ul className="pagination__list">
                        {currentPage > 1 && (
                          <li className="pagination__item" key="previous">
                            <a className="pagination__link" href="" onClick={(evt) => {
                              evt.preventDefault();
                              goToPreviousPage();}}
                            >
                                Назад
                            </a>
                          </li>
                        )}
                        {
                          products &&
                          pageNumbers.map((number) => (
                            <li className="pagination__item" key={number}>
                              <Link className={`pagination__link ${currentPage === number ? 'pagination__link--active' : ''}`}
                                onClick={(evt) => {
                                  evt.preventDefault();
                                  paginate(number);
                                } } to={''}
                              >{number}
                              </Link>
                            </li>
                          ))
                        }
                        {currentPage < pageNumbers.length && (
                          <li className="pagination__item" key="next">
                            <a className="pagination__link" href="#"
                              onClick={(evt) => {
                                evt.preventDefault();
                                goToNextPage();}}
                            >Вперед
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <AddProductModal product={productInAddModal} />
        <ReviewModalSuccess />
        <AddProductSuccessModal />
        <Footer />
      </div>
    </>
  );
}

export default CatalogScreen;
