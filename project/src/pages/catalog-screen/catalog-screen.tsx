import { useState } from 'react';
import Banner from '../../components/banner/banner';
import CatalogFilterForm from '../../components/catalog-filter-form/catalog-filter-form';
import CatalogSortForm from '../../components/catalog-sort-form/catalog-sort-form';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import Header from '../../components/header/header';
import ProductCard from '../../components/product-card/product-card';
import { Product, Products } from '../../types/products';
import { PromoProduct } from '../../types/promo-product';
import AddProductModal from '../../components/modals/add-product-modal';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setAddItemModalViewStatus } from '../../store/modal-view-process/modal-view-process';


type CatalogScreenProps = {
  products: Products;
  promoProduct: PromoProduct;
  pageId?: number;
}

function CatalogScreen({products, promoProduct, pageId}: CatalogScreenProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(pageId || 1);
  const productsPerPage = 9;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);
  const [productInAddModal, setProductInAddModal] = useState<Product>({} as Product);
  window.history.pushState({}, '', `/catalog/page/${currentPage}`);
  const dispatch = useAppDispatch();

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.history.pushState({}, '', `/catalog/page/${currentPage}`);
  };

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(products?.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.history.pushState({}, '', `/catalog/page/${currentPage - 1}`);
    }
  };

  const goToNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      window.history.pushState({}, '', `/catalog/page/${currentPage + 1}`);
    }
  };

  const onBasketClick = (product: Product) => {
    dispatch(setAddItemModalViewStatus(true));
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
            productDescription={products?.find((item) => item.id === promoProduct.id)?.description}
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
                    <CatalogFilterForm />
                  </div>
                  <div className="catalog__content">
                    <CatalogSortForm />
                    <div className="cards catalog__cards">
                      {
                        products &&
                      currentProducts?.map((item) => <ProductCard key={item.id} product={item} cb={onBasketClick}/>)
                      }
                    </div>
                    <div className="pagination">
                      <ul className="pagination__list">
                        {currentPage > 1 && (
                          <li className="pagination__item" key="previous">
                            <a className="pagination__link" href="#" onClick={(evt) => {
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
                              <a className={`pagination__link ${currentPage === number ? 'pagination__link--active' : ''}`}
                                href="#" onClick={(evt) =>
                                { evt.preventDefault();
                                  paginate(number);}}
                              >{number}
                              </a>
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
        <Footer />
      </div>
    </>
  );
}

export default CatalogScreen;
