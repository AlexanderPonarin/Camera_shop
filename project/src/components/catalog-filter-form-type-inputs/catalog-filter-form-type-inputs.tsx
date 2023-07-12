import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function CatalogFilterFormTypeInputs(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const productTypeParams = searchParams.getAll('product-type');
  const categoryParams = searchParams.get('category');

  useEffect(() => {
    if(categoryParams === 'videocamera') {
      const params = new URLSearchParams(window.location.search);

      if(productTypeParams.includes('film')) {
        const inputString = 'product-type=film';
        const index = params.toString().indexOf(inputString);
        setSearchParams(params.toString().slice(0, index) + params.toString().slice(index + inputString.length));
      }
      if(productTypeParams.includes('snapshot')) {
        const inputString = 'product-type=snapshot';
        const index = params.toString().indexOf(inputString);
        setSearchParams(params.toString().slice(0, index) + params.toString().slice(index + inputString.length));
      }
    }
  });


  const handleFilterProductTypeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = evt.target.checked;
    const params = new URLSearchParams(window.location.search);
    if (isChecked) {
      params.append('product-type', evt.target.name);
      setSearchParams(params.toString());
    }
    if(!isChecked) {
      const inputString = `product-type=${evt.target.name}`;
      const index = params.toString().indexOf(inputString);
      setSearchParams(params.toString().slice(0, index) + params.toString().slice(index + inputString.length));
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      <div

        className="custom-checkbox catalog-filter__item"
      >
        <label>
          <input
            onChange={handleFilterProductTypeChange}
            checked={productTypeParams.includes('digital')}
            type="checkbox" name="digital"
          /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
        </label>
      </div>
      <div

        className="custom-checkbox catalog-filter__item"
      >
        <label>
          <input
            checked={productTypeParams.includes('film')}
            onChange={handleFilterProductTypeChange}
            type="checkbox" name="film"
            disabled={categoryParams === 'videocamera'}
          /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
        </label>
      </div>
      <div

        className="custom-checkbox catalog-filter__item"
      >
        <label>
          <input
            onChange={handleFilterProductTypeChange}
            checked={productTypeParams.includes('snapshot')}
            type="checkbox" name="snapshot"
            disabled={categoryParams === 'videocamera'}
          /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
        </label>
      </div>
      <div

        className="custom-checkbox catalog-filter__item"
      >
        <label>
          <input
            onChange={handleFilterProductTypeChange}
            checked={productTypeParams.includes('collection')}
            type="checkbox" name="collection"
          /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Коллекционная</span>
        </label>
      </div>
    </fieldset>
  );
}

export default CatalogFilterFormTypeInputs;
