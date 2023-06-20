import { useSelector } from 'react-redux';
import { Product } from '../../types/products';
import ProductCard from '../product-card/product-card';
import { getActiveProductVenderCode, getSimilarProducts } from '../../store/product-data/selectros';
import { fetchSimilarProductsAction } from '../../store/api-action';
import { useAppDispatch } from '../../hooks';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { setActiveProductVenderCode } from '../../store/product-data/product-data';
import React from 'react';

type SimilarProductsProps = {
  cb: (product: Product) => void;
  product: Product;
};

function SimilarProducts({ product, cb }: SimilarProductsProps): JSX.Element {
  const similarProducts = useSelector(getSimilarProducts);
  const activeVenderCode = useSelector(getActiveProductVenderCode);
  const dispatch = useAppDispatch();
  const slidess = similarProducts.map((item) => <ProductCard key={item.id} product={item} cb={cb}/>);


  useEffect(() => {
    if (activeVenderCode !== product.vendorCode) {
      const fetchData = async () => {
        await dispatch(fetchSimilarProductsAction(product.id));
      };
      fetchData();
      dispatch(setActiveProductVenderCode(product.vendorCode));
    }
  }, [activeVenderCode, dispatch, product.id, product.vendorCode]);


  let position = 0;
  const totalSlides: number = similarProducts.length / 3;
  const slidesToshow = 0;
  const slodeToScroll = 0;
  const [sliderGroupCount, setSliderGroupCount] = useState(1);
  const sliderPositionRef = useRef(0);

  const sliderListRef = useRef<HTMLDivElement | null>(null);



  const toNextSlide = (sliderListRefEl: MutableRefObject<HTMLDivElement | null>) => {
    if (sliderListRefEl.current) {
      sliderPositionRef.current -= 107;
      setSliderGroupCount(sliderGroupCount + 1);
      console.log(sliderPositionRef.current, sliderGroupCount);

      sliderListRefEl.current.style.transform = `translateX(${sliderPositionRef.current}%)`;
    }
  };

  const toPrevSlide = (sliderListRefEl: MutableRefObject<HTMLDivElement | null>) => {
    if (sliderListRefEl.current) {
      sliderPositionRef.current += 105;
      setSliderGroupCount(sliderGroupCount - 1);
      console.log(sliderPositionRef.current, sliderGroupCount);

      sliderListRefEl.current.style.transform = `translateX(${sliderPositionRef.current}%)`;
    }
  };

  return (
    <section className="product-similar">
      <div
        className="container"
      >
        <h2 className="title title--h3">Похожие товары</h2>
        <div
          className="product-similar__slider"
        >
          <div
            ref={sliderListRef}
            className="product-similar__slider-list"
          >{slidess}
          </div>
          <button
            onClick={() => toPrevSlide(sliderListRef)}
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            disabled={sliderGroupCount === 1}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button
            onClick={() => toNextSlide(sliderListRef)}
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
            disabled={sliderGroupCount === totalSlides - 1}
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

/* const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const slidesToShow = 3;
  const totalSlides = similarProducts.length;
  const maxSlide = Math.ceil(totalSlides / slidesToShow);

  const goToNextSlide = () => {
    setActiveSlideIndex((prevIndex) =>
      prevIndex >= maxSlide ? 0 : prevIndex + 3
    );
  };

  const goToPrevSlide = () => {
    setActiveSlideIndex((prevIndex) =>
      prevIndex === 0 ? maxSlide : prevIndex - 3
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
  ); */
