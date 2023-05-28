import { useDispatch, useSelector } from 'react-redux';
import { Product, Products } from '../../types/products';
import ProductCard from '../product-card/product-card';
import { getSimilarProducts } from '../../store/product-data/selectros';
import { useEffect, useRef, useState } from 'react';
import { fetchSimilarProductsAction } from '../../store/api-action';
import { AppDispatch } from '../../types/state';
import { useAppDispatch } from '../../hooks';

type SimilarProductsProps = {
    cb: (product: Product) => void;
    productId: number;
}

function SimilarProducts({productId, cb}: SimilarProductsProps): JSX.Element {
  const similarProducts = useSelector(getSimilarProducts);

  const dispatch = useAppDispatch;
  
  useEffect(() => {
    dispatch(fetchSimilarProductsAction(productId));
  }, [dispatch, productId]);

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {similarProducts.map((item) => <ProductCard product={item} cb={cb} key={item.id}/>)}
          </div>
        </div>
        <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд">
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>

    </section>
  );}

export default SimilarProducts;
