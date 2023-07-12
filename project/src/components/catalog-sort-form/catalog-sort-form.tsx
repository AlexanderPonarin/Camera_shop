import { useSearchParams } from 'react-router-dom';
import { sortType } from '../../consts';
import { sortOrder } from '../../consts';
import { useEffect } from 'react';


type CatalogSortFormProps = {
  sortTypeChangeHandler: (type: string) => void;
  sortOrderChangeHandler: (type: string) => void;
}

function CatalogSortForm({sortTypeChangeHandler, sortOrderChangeHandler}: CatalogSortFormProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortTypeParams = searchParams.get('type');
  const sortOrderParams = searchParams.get('order');

  useEffect(() => {
    if(sortTypeParams) {
      sortTypeChangeHandler(sortTypeParams);
    }
    if(sortOrderParams) {
      sortOrderChangeHandler(sortOrderParams);
    }
  },[searchParams]);

  const handleSortTypeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(window.location.search);
    params.set('type', evt.target.value);
    setSearchParams(params.toString());
  };

  const handleSortOrderChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(window.location.search);
    if(!sortTypeParams) {
      params.set('type', 'price');
    }
    params.set('order', evt.target.id);
    setSearchParams(params.toString());
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div
            className="catalog-sort__type"
          >
            <div className="catalog-sort__btn-text">
              <input
                onChange={handleSortTypeChange}
                checked={sortTypeParams === sortType.Price}
                type="radio" id="sortPrice" value={'price'} name="sort"
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                onChange={handleSortTypeChange}
                checked={sortTypeParams === sortType.Popular}
                type="radio" id="sortPopular" value={'popular'} name="sort"
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div
            className="catalog-sort__order"
          >
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                onChange={handleSortOrderChange}
                checked={sortOrderParams === sortOrder.Up}
                type="radio" id="up" name="sort-icon" aria-label="По возрастанию"
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                onChange={handleSortOrderChange}
                checked={sortOrderParams === sortOrder.Down}
                type="radio" id="down" name="sort-icon" aria-label="По убыванию"
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CatalogSortForm;
