import { useState } from 'react';
import Banner from '../../components/banner/banner';
import CatalogFilterForm from '../../components/catalog-filter-form/catalog-filter-form';
import CatalogSortForm from '../../components/catalog-sort-form/catalog-sort-form';
import Footer from '../../components/footer/footer';
import HeaderLogo from '../../components/header-logo/header-logo';
import Header from '../../components/header/header';
import ProductCard from '../../components/product-card/product-card';
import { Product, Products } from '../../types/products';
import { PromoProduct } from '../../types/promo-product';
import AddProductModal from '../../components/modals/add-product-modal';

type CatalogScreenProps = {
  products: Products;
  promoProduct: PromoProduct;
}

function CatalogScreen({products, promoProduct}: CatalogScreenProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const [addModalOpen, setAddModalActive] = useState(false);
  const [productInAddModal, setProductInAddModal] = useState<Product>(products[0]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onBasketClick = (product: Product) => {
    setAddModalActive(true);
    setProductInAddModal(product);
  };

  const onCloseBtnClick = () => {
    setAddModalActive(false);
  };

  return (
    <>
      <HeaderLogo />
      <div className="wrapper">
        <Header />
        <main>
          <Banner
            promoProduct={promoProduct}
            productDescription={products.find((item) => item.id === promoProduct.id)?.description}
          />
          <div className="page-content">
            <div className="breadcrumbs">
              <div className="container">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link" href="index.html">Главная
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </a>
                  </li>
                  <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
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
                      {currentProducts.map((item) => <ProductCard key={item.id} product={item} cb={onBasketClick}/>)}
                    </div>
                    <div className="pagination">
                      <ul className="pagination__list">
                        {currentPage > 1 && (
                          <li className="pagination__item" key="previous">
                            <a className="pagination__link" href="#" onClick={goToPreviousPage}>Назад</a>
                          </li>
                        )}
                        {pageNumbers.map((number) => (
                          <li className="pagination__item" key={number}>
                            <a className={`pagination__link ${currentPage === number ? 'pagination__link--active' : ''}`}
                              href="#" onClick={() => paginate(number)}
                            >{number}
                            </a>
                          </li>
                        ))}
                        {currentPage < pageNumbers.length && (
                          <li className="pagination__item" key="next">
                            <a className="pagination__link" href="#" onClick={goToNextPage}>Вперед</a>
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
        {addModalOpen && <AddProductModal product={productInAddModal} cb={onCloseBtnClick} />}
        <Footer />
      </div>
    </>
  );
}

export default CatalogScreen;
