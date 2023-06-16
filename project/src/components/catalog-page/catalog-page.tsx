import { useParams } from 'react-router-dom';
import { Products } from '../../types/products';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import { PromoProduct } from '../../types/promo-product';

type CatalogPageProps = {
    products: Products;
    promoProduct: PromoProduct;
}

function CatalogPage({products, promoProduct}: CatalogPageProps): JSX.Element {
  const params = useParams();
  return params.id ?
    <CatalogScreen
      promoProduct={promoProduct}
      products={products}
      pageId={Number(params.id)}
    />
    :
    <CatalogScreen
      promoProduct={promoProduct}
      products={products}
    />;
}

export default CatalogPage;
