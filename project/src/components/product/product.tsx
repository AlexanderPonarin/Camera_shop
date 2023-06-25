import { useParams } from 'react-router-dom';
import { Products } from '../../types/products';
import ProductScreen from '../../pages/product-screen/product-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { ProductTabsNameSpace } from '../../consts';
import { useAppDispatch } from '../../hooks';
import { redirectToRoute } from '../../store/actions';

type ProductsProps = {
    products: Products;
}

function Product({products}: ProductsProps): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch()
  const product = products?.find((item) => String(item.id) === params?.id);
  console.log(params.tab);
  if (params.tab !== ProductTabsNameSpace.Characterization && params.tab !== ProductTabsNameSpace.Description) {
    dispatch(redirectToRoute('*'));
  }
  return product ? <ProductScreen product={product} /> : <NotFoundScreen />;
}

export default Product;
