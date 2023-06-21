import { useSelector } from 'react-redux';
import { Product } from '../../types/products';
import ProductCard from '../product-card/product-card';
import { getActiveProductVenderCode, getSimilarProducts } from '../../store/product-data/selectros';
import { fetchSimilarProductsAction } from '../../store/api-action';
import { useAppDispatch } from '../../hooks';
import { useEffect, useRef, useState } from 'react';
import { setActiveProductVenderCode } from '../../store/product-data/product-data';
import clsx from 'clsx';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';


type SimilarProductsProps = {
  cb: (product: Product) => void;
  product: Product;
};

function SimilarProducts({ product, cb }: SimilarProductsProps): JSX.Element {
  const similarProducts = useSelector(getSimilarProducts);
  const activeVenderCode = useSelector(getActiveProductVenderCode);
  const dispatch = useAppDispatch();
  const swiperRef = useRef<SwiperRef['swiper']>();
  const [{ isBeginning, isEnd }, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });


  useEffect(() => {
    if (activeVenderCode !== product.vendorCode) {
      const fetchData = async () => {
        await dispatch(fetchSimilarProductsAction(product.id));
      };
      fetchData();
      dispatch(setActiveProductVenderCode(product.vendorCode));
    }
  }, [activeVenderCode, dispatch, product.id, product.vendorCode]);


  return (
    <section className="product-similar">
      <div
        className="container"
      >
        <h2 className="title title--h3">Похожие товары</h2>
        <div
          className="product-similar__slider"
        >
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setSliderState({
                isBeginning: swiper.isBeginning,
                isEnd: swiper.isEnd });
            }}
            className="product-similar__slider-list"
            slidesPerView={3}
            slidesPerGroup={3}
            spaceBetween={30}
            allowTouchMove={false}
          >
            {similarProducts.map((item) => (
              <SwiperSlide key={item.id}>
                <ProductCard product={item} cb={cb} style={{width: '100%', margin: 0}} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            style={{
              pointerEvents: isBeginning ? 'none' : 'auto'
            }}
            onClick={() => swiperRef.current?.slidePrev()}
            className={clsx('slider-controls slider-controls--prev', isBeginning && 'disabled')}
            type="button"
            aria-label="Предыдущий слайд"
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button
            style={{
              pointerEvents: isEnd ? 'none' : 'auto'
            }}
            onClick={() => swiperRef.current?.slideNext()}
            className={clsx('slider-controls slider-controls--next', isEnd && 'disabled')}
            type="button"
            aria-label="Следующий слайд"
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default SimilarProducts;
