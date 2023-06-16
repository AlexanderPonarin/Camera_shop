import { Products } from '../types/products';
import { PromoProduct } from '../types/promo-product';

const promoProductMock = {
  id: 1,
  name: 'Product Mock',
  previewImg: 'previewImg',
  previewImg2x: 'previewImg2x',
  previewImgWebp: 'previewImgWebp',
  previewImgWebp2x: 'previewImgWebp2x',
} as PromoProduct;

const productDescriptionMock = 'Product description Mock';

const promoProductsMock = [promoProductMock] as Products;

export {promoProductMock, productDescriptionMock, promoProductsMock};
