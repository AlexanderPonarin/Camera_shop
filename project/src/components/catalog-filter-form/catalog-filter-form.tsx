import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Products } from '../../types/products';
import CataloFilterFormPriceInputs from '../catalog-filter-form-price-inputs/catalog-filter-form-price-inputs';
import CatalogFilterFormCategoryInputs from '../catalog-filter-form-category-inputs/catalog-filter-form-category-inputs';
import CatalogFilterFormTypeInputs from '../catalog-filter-form-type-inputs/catalog-filter-form-type-inputs';
import CatalogFilterFormLevelInputs from '../catalog-filter-form-level-inputs/catalog-filter-form-level-inputs';

type CatalogFilterFormProps = {
  products: Products;
  onFilterChangedHandler: (
    minPrice: number,
    maxPrice: number,
    productCategory: string | null,
    productType: string[] | null,
    level: string[] | null) => void;
}

function CatalogFilterForm({onFilterChangedHandler, products}: CatalogFilterFormProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const minPriceParams = searchParams.get('price_start');
  const maxPriceParams = searchParams.get('price_end');
  const categoryParams = searchParams.get('category');
  const productTypeParams = searchParams.getAll('product-type');
  const levelParams = searchParams.getAll('level');
  const [lte, setLte] = useState<number>(0);
  const [gte, setGte] = useState<number>(0);


  useEffect(() => {
    if(products) {
      const sortProductsByPrice = products.sort((a, b) => a.price - b.price);
      setLte(sortProductsByPrice[0]?.price);
      setGte(sortProductsByPrice[sortProductsByPrice.length - 1]?.price);
    }
  }, [products]);


  useEffect(() => {
    onFilterChangedHandler(Number(minPriceParams), Number(maxPriceParams), categoryParams, productTypeParams, levelParams);
  },[searchParams]);


  const onResetBtnClickHandler = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete('level');
    params.delete('product-type');
    params.delete('category');
    params.delete('price_start');
    params.delete('price_end');
    setSearchParams(params.toString());
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <CataloFilterFormPriceInputs lte={lte} gte={gte} />
        <CatalogFilterFormCategoryInputs />
        <CatalogFilterFormTypeInputs />
        <CatalogFilterFormLevelInputs />
        <button
          onClick={onResetBtnClickHandler}
          className="btn catalog-filter__reset-btn" type="reset"
        >Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default CatalogFilterForm;
