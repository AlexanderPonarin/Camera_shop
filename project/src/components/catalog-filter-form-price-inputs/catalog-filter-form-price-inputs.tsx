import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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
    if(Number(evt.target.value) < lte) {
      params.set('price_start', lte.toString() );
      setSearchParams(params.toString());
    }
    if(evt.target.value === '') {
      params.delete('price_start');
      setSearchParams(params.toString());
    }
  };

  const handleMaxPriceBlur = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(window.location.search);
    if(Number(evt.target.value) > gte) {
      params.set('price_end', gte.toString() );
      setSearchParams(params.toString());
    }
    if(minPrice && maxPrice && Number(evt.target.value) < minPrice) {
      params.set('price_end', minPrice.toString() );
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


  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              onChange={handleMinPriceChange}
              onBlur={handleMinPriceBlur}
              value={minPrice ? minPrice : ''}
              type="number"
              name="price"
              placeholder= {lte ? `от ${lte}` : 'от'}
              pattern='^(?:[1-9]\d*|0)$'
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              onChange={handleMaxPriceChange}
              onBlur={handleMaxPriceBlur}
              value={maxPrice ? maxPrice : ''}
              type="number"
              name="priceUp"
              placeholder= {gte ? `до ${gte}` : 'до'}
              pattern='^(?:[1-9]\d*|0)$'
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default CataloFilterFormPriceInputs;
