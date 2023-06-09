import { useSelector } from 'react-redux';
import { Product } from '../../types/products';
import ProductCard from '../product-card/product-card';
import { getActiveProductVenderCode, getSimilarProducts } from '../../store/product-data/selectros';
import { fetchSimilarProductsAction } from '../../store/api-action';
import { useAppDispatch } from '../../hooks';
import { useEffect, useState } from 'react';
import { setActiveProductVenderCode } from '../../store/product-data/product-data';

type SimilarProductsProps = {
  cb: (product: Product) => void;
  product: Product;
};

function SimilarProducts({ product, cb }: SimilarProductsProps): JSX.Element {
  const similarProducts = useSelector(getSimilarProducts);
  const activeVenderCode = useSelector(getActiveProductVenderCode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeVenderCode !== product.vendorCode) {
      const fetchData = async () => {
        await dispatch(fetchSimilarProductsAction(product.id));
      };
      fetchData();
      dispatch(setActiveProductVenderCode(product.vendorCode));
    }
  }, [activeVenderCode, dispatch, product.id, product.vendorCode]);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const slidesToShow = 3;
  const totalSlides = similarProducts.length;
  const maxSlide = Math.ceil(totalSlides / slidesToShow) - 1;

  const goToNextSlide = () => {
    setActiveSlideIndex((prevIndex) =>
      prevIndex >= maxSlide ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setActiveSlideIndex((prevIndex) =>
      prevIndex === 0 ? maxSlide : prevIndex - 1
    );
  };

  const slides = similarProducts.map((item) => (
    <ProductCard key={item.id} product={item} cb={cb} />
  ));
  for (let i = 0; i < totalSlides; i += slidesToShow) {
    const slideGroup = similarProducts
      .slice(i, i + slidesToShow)
      .map((item) => <ProductCard key={item.id} product={item} cb={cb} />);
    slides.push(
      <div className="product-similar__slider-slide" >
        {slideGroup}
      </div>
    );
  }

  const currentSlides = slides.slice(
    activeSlideIndex,
    activeSlideIndex + slidesToShow
  );

  return (
    <section className="product-similar">
      <div
        className="container"
      >
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">{currentSlides}</div>
          <button
            onClick={goToPrevSlide}
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            disabled={activeSlideIndex === 0}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button
            onClick={goToNextSlide}
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
            disabled={activeSlideIndex === maxSlide}
          >
            <svg
              width="7" height="12" aria-hidden="true"
            >
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default SimilarProducts;
