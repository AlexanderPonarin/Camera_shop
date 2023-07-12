import { useSearchParams } from 'react-router-dom';

function CatalogFilterFormLevelInputs(): JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();
  const levelParams = searchParams.getAll('level');

  const handleFilterLevelChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = evt.target.checked;
    const params = new URLSearchParams(window.location.search);
    if (isChecked) {
      params.append('level', evt.target.name);
      setSearchParams(params.toString());
    }
    if(!isChecked) {
      const inputString = `level=${evt.target.name}`;
      const index = params.toString().indexOf(inputString);
      setSearchParams(params.toString().slice(0, index) + params.toString().slice(index + inputString.length));
    }
  };
  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      <div
        className="custom-checkbox catalog-filter__item"
      >
        <label>
          <input
            onChange={handleFilterLevelChange}
            checked={levelParams.includes('zero')}
            type="checkbox" name="zero"
          /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Нулевой</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            onChange={handleFilterLevelChange}
            checked={levelParams.includes('non-professional')}
            type="checkbox" name="non-professional"
          /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Любительский</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            onChange={handleFilterLevelChange}
            checked={levelParams.includes('professional')}
            type="checkbox" name="professional"
          /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Профессиональный</span>
        </label>
      </div>
    </fieldset>
  );
}

export default CatalogFilterFormLevelInputs;
