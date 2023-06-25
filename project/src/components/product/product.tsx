import { useParams } from 'react-router-dom';
import { Products } from '../../types/products';
import ProductScreen from '../../pages/product-screen/product-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { ProductTabsNameSpace } from '../../consts';

type ProductsProps = {
    products: Products;
}

function Product({products}: ProductsProps): JSX.Element {
  const params = useParams();
  const { tab } = useParams();
  console.log(tab)
  if (tab) {
    tab === ProductTabsNameSpace.
  }
  const product = products?.find((item) => String(item.id) === params?.id);
  return product ? <ProductScreen product={product} /> : <NotFoundScreen />;
}

export default Product;
