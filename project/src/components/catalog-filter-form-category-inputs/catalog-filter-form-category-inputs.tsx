import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function CatalogFilterFormCategoryInputs(): JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParams = searchParams.get('category');
  const [categoryCheckbox, setCategoryCheckbox] = useState<string | null>();

  const handleFilterCategoryChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = evt.target.checked;
    const params = new URLSearchParams(window.location.search);
    if(isChecked) {
      setCategoryCheckbox(evt.target.name);
      params.set('category', evt.target.name);
      setSearchParams(params.toString());
    }
    if(!isChecked) {
      params.delete('category');
      setSearchParams(params.toString());
    }
    if(!isChecked && categoryCheckbox === evt.target.name) {
      setCategoryCheckbox(null);
    }
  };

  return (
    <fieldset
      className="catalog-filter__block"
    >
      <legend className="title title--h5">Категория</legend>
      <div
        className="custom-checkbox catalog-filter__item"
      >
        <label>
          <input
            onChange={handleFilterCategoryChange}
            checked={categoryParams === 'photocamera'}
            type="checkbox"
            name="photocamera"
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Фотокамера</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            checked={categoryParams === 'videocamera'}
            onChange={handleFilterCategoryChange}
            type="checkbox"
            name="videocamera"
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Видеокамера</span>
        </label>
      </div>
    </fieldset>
  );
}

export default CatalogFilterFormCategoryInputs;
