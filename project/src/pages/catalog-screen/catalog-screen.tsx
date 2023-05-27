import Banner from '../../components/banner/banner';
import CatalogFilterForm from '../../components/catalog-filter-form/catalog-filter-form';
import CatalogSortForm from '../../components/catalog-sort-form/catalog-sort-form';
import Footer from '../../components/footer/footer';
import HeaderLogo from '../../components/header-logo/header-logo';
import Header from '../../components/header/header';
import ProductCard from '../../components/product-card/product-card';
import { Products } from '../../types/products';
import { PromoProduct } from '../../types/promo-product';

type CatalogScreenProps = {
  products: Products;
  promoProduct: PromoProduct;
}

function CatalogScreen({products, promoProduct}: CatalogScreenProps): JSX.Element {
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
                      {products.map((item) => <ProductCard key={item.id} product={item}/>)}
                    </div>
                    <div className="pagination">
                      <ul className="pagination__list">
                        <li className="pagination__item"><a className="pagination__link pagination__link--active" href="1">1</a>
                        </li>
                        <li className="pagination__item"><a className="pagination__link" href="2">2</a>
                        </li>
                        <li className="pagination__item"><a className="pagination__link" href="3">3</a>
                        </li>
                        <li className="pagination__item"><a className="pagination__link pagination__link--text" href="2">Далее</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default CatalogScreen;
