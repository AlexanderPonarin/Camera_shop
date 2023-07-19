import { useEffect, useState, KeyboardEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../../store/product-data/selectros';
import { useAppSelector } from '../../hooks';
import { Products } from '../../types/products';

type CataloFilterFormPriceInputsProps = {
    lte: number;
    gte: number;
}

function CataloFilterFormPriceInputs({lte, gte}: CataloFilterFormPriceInputsProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const minPriceParams = searchParams.get('price_start');
  const maxPriceParams = searchParams.get('price_end');
  const [minPrice, setMinPrice] = useState<number |null>(Number(minPriceParams));
  const [maxPrice, setMaxPrice] = useState<number | null>(Number(maxPriceParams));
  const products = useAppSelector(getProducts);
  const [sortProductsByPrice, setSortProductsByPrice] = useState<Products>(products);
  const [placeHolderLte, setPlaceHolderLte] = useState(lte);
  const [placeHolderGte, setPlaceHolderGte] = useState(lte);


  useEffect(() => {
    if(lte) {
      const currentValue = lte;
      setPlaceHolderLte(currentValue);
    }
    if(gte) {
      const currentValue = lte;
      setPlaceHolderGte(currentValue);
    }
  }, [gte, lte]);

  useEffect(() => {
    if(!maxPriceParams) {
      const params = new URLSearchParams(window.location.search);
      params.set('price_end', '');
      setSearchParams(params.toString());
    }
    if(!minPriceParams) {
      const params = new URLSearchParams(window.location.search);
      params.set('price_start', '');
      setSearchParams(params.toString());
    }
    if(products) {
      const sortedProducts = [...products].sort((a, b) => a.price - b.price);
      setSortProductsByPrice(sortedProducts);
    }
  }, [maxPriceParams, products, searchParams]);

  useEffect(() => {
    setMinPrice(Number(minPriceParams));
    setMaxPrice(Number(maxPriceParams));
  }, [minPriceParams, maxPriceParams, searchParams]);

  const handleMinPriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(window.location.search);
    if(Number(evt.target.value) < 0) {
      params.delete('price_start');
      setSearchParams(params.toString());
    } else {
      params.set('price_start', evt.target.value );
      setSearchParams(params.toString());
    }
  };

  const handleMinPriceBlur = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(window.location.search);
    if(sortProductsByPrice && Number(minPriceParams) < sortProductsByPrice[0].price) {
      params.set('price_start', sortProductsByPrice[0].price.toString());
      setSearchParams(params.toString());
    } else {
      params.set('price_start', minPriceParams ? minPriceParams : '');
      setSearchParams(params.toString());
    }
    if(minPriceParams === '') {
      params.delete('price_start');
      setSearchParams(params.toString());
    }
  };


  const handleMaxPriceBlur = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(window.location.search);
    if(maxPriceParams === '') {
      params.set('price_end', '');
      setSearchParams(params.toString());
    }
    if(sortProductsByPrice && Number(evt.target.value) > sortProductsByPrice[sortProductsByPrice.length - 1].price && maxPriceParams !== '') {
      params.set('price_end', sortProductsByPrice[sortProductsByPrice.length - 1].price.toString());
      setSearchParams(params.toString());
    } else {
      params.set('price_end', evt.target.value);
      setSearchParams(params.toString());
    }
    if(minPrice && sortProductsByPrice && Number(maxPriceParams) < Number(minPriceParams) && maxPriceParams !== '') {
      params.set('price_start', sortProductsByPrice[0].price.toString());
      setSearchParams(params.toString());
      if(Number(maxPriceParams) < Number(minPriceParams) && Number(maxPriceParams) < sortProductsByPrice[0].price && maxPriceParams !== '') {
        params.set('price_end', sortProductsByPrice[0].price.toString());
      }
      setSearchParams(params.toString());
    }
  };

  const handleMaxPriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(window.location.search);
    if(Number(evt.target.value) < 0) {
      params.delete('price_end');
      setSearchParams(params.toString());
    } else {
      params.set('price_end', evt.target.value );
      setSearchParams(params.toString());
    }
  };

  const handleMinPriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === 'Enter') {
      const params = new URLSearchParams(window.location.search);
      if(sortProductsByPrice && Number(minPriceParams) < sortProductsByPrice[0].price) {
        params.set('price_start', sortProductsByPrice[0].price.toString());
        setSearchParams(params.toString());
      } else {
        params.set('price_start', minPriceParams ? minPriceParams : '');
        setSearchParams(params.toString());
      }
      if(minPriceParams === '') {
        params.set('price_start', '');
        setSearchParams(params.toString());
      }
    }
  };

  const handleMaxPriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === 'Enter') {
      const params = new URLSearchParams(window.location.search);
      if(maxPriceParams === '' || !maxPriceParams) {
        params.set('price_end', '');
        setSearchParams(params.toString());
      }
      if(sortProductsByPrice && Number(maxPriceParams) > sortProductsByPrice[sortProductsByPrice.length - 1].price && maxPriceParams !== '') {
        params.set('price_end', sortProductsByPrice[sortProductsByPrice.length - 1].price.toString());
        setSearchParams(params.toString());
      }
      if(minPrice && sortProductsByPrice && Number(maxPriceParams) < Number(minPriceParams) && maxPriceParams !== '') {
        params.set('price_start', sortProductsByPrice[0].price.toString());
        setSearchParams(params.toString());
        if(Number(maxPriceParams) < Number(minPriceParams) && Number(maxPriceParams) < sortProductsByPrice[0].price && maxPriceParams !== '') {
          params.set('price_end', sortProductsByPrice[0].price.toString());
        }
        setSearchParams(params.toString());
      }
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              onKeyDown={handleMinPriceKeyDown}
              onChange={handleMinPriceChange}
              onBlur={handleMinPriceBlur}
              value={minPrice ? minPrice : ''}
              type="number"
              name="price"
              placeholder={lte ? `${lte}` : placeHolderLte.toString()}
              pattern='^(?:[1-9]\d*|0)$'
              data-testid='minprice'
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              onKeyDown={handleMaxPriceKeyDown}
              onChange={handleMaxPriceChange}
              onBlur={handleMaxPriceBlur}
              value={maxPrice ? maxPrice : ''}
              type="number"
              name="priceUp"
              placeholder= {gte ? `${gte}` : placeHolderGte.toString()}
              pattern='^(?:[1-9]\d*|0)$'
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default CataloFilterFormPriceInputs;
