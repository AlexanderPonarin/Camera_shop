import { useState } from 'react';
import { Product } from '../../types/products';
import { ProductTabsNameSpace } from '../../consts';
import { useLocation } from 'react-router-dom';


type ProductTabsProps = {
    product: Product;
}

function ProductTabs({product}: ProductTabsProps): JSX.Element {
  const { pathname } = useLocation();
  const urlTabName = pathname.substring(pathname.lastIndexOf('/') + 1);
  const [activeTab, setActiveTab] = useState(urlTabName);
  window.history.pushState({}, '', `/product/${product.id}/${activeTab}`);

  const handleTabClick = (tabName: ProductTabsNameSpace) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          onClick={() => handleTabClick(ProductTabsNameSpace.Characterization)}
          className={`tabs__control ${activeTab === ProductTabsNameSpace.Characterization ? 'is-active' : ''}`}
          type="button"
        >Характеристики
        </button>
        <button
          onClick={() => handleTabClick(ProductTabsNameSpace.Description)}
          className={`tabs__control ${activeTab === ProductTabsNameSpace.Description ? 'is-active' : ''}`}
          type="button"
        >Описание
        </button>
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
