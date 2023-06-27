import { useEffect, useState } from 'react';
import { Product } from '../../types/products';
import { ProductTabsNameSpace } from '../../consts';
import { Link, useParams } from 'react-router-dom';
import { redirectToRoute } from '../../store/actions';
import { useAppDispatch } from '../../hooks';


type ProductTabsProps = {
    product: Product;
}

function ProductTabs({product}: ProductTabsProps): JSX.Element {
  const { tab } = useParams();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState(tab);


  useEffect(() => {
    if(tab !== ProductTabsNameSpace.Description && tab !== ProductTabsNameSpace.Characterization){
      dispatch(redirectToRoute(`/product/${product.id}/${ProductTabsNameSpace.Description}`));
      setActiveTab(ProductTabsNameSpace.Description);
    }
  }, [dispatch, product.id, tab]);


  const handleTabClick = (tabName: ProductTabsNameSpace) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <Link tabIndex={-1} to={`/product/${product.id}/characterization`} >
          <button
            onClick={() => handleTabClick(ProductTabsNameSpace.Characterization)}
            className={`tabs__control ${activeTab === ProductTabsNameSpace.Characterization ? 'is-active' : ''}`}
            type="button"
          >Характеристики
          </button>
        </Link>
        <Link tabIndex={-1} to={`/product/${product.id}/description`} >
          <button
            onClick={() => handleTabClick(ProductTabsNameSpace.Description)}
            className={`tabs__control ${activeTab === ProductTabsNameSpace.Description ? 'is-active' : ''}`}
            type="button"
          >Описание
          </button>
        </Link>
      </div>
      <div className="tabs__content">
        {activeTab === ProductTabsNameSpace.Characterization && (
          <div className="tabs__element is-active">
            <ul className="product__tabs-list">
              <li className="item-list"><span className="item-list__title">Артикул:</span>
                <p className="item-list__text"> {product.vendorCode}</p>
              </li>
              <li className="item-list"><span className="item-list__title">Категория:</span>
                <p className="item-list__text">{product.type}</p>
              </li>
              <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                <p className="item-list__text">{product.category}</p>
              </li>
              <li className="item-list"><span className="item-list__title">Уровень:</span>
                <p className="item-list__text">{product.level}</p>
              </li>
            </ul>
          </div>
        )}
        {activeTab === ProductTabsNameSpace.Description && (
          <div className="tabs__element is-active">
            <div className="product__tabs-text">
              <p>{product.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductTabs;
