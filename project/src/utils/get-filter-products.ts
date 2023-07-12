import { ProductCategory, ProductLevel, ProductType } from '../consts';
import { Products } from '../types/products';
import { ProductsFilterOption } from '../types/products-filter-option';

export type GetFilterProductsProps = {
  products: Products;
  filterOptions: ProductsFilterOption;
}

export function getFilterProducts({products, filterOptions}: GetFilterProductsProps): Products {
  let filteredProducts = [...products];

  if(filterOptions.minPrice || filterOptions.maxPrice) {
    if(filterOptions.maxPrice === 0) {
      filteredProducts = filteredProducts.filter((item) =>
        item.price >= filterOptions.minPrice);
    } else {
      filteredProducts = filteredProducts.filter((item) =>
        item.price >= filterOptions.minPrice && item.price <= filterOptions.maxPrice);
    }
  }

  if(filterOptions.productCategory && filteredProducts.length) {
    let updateProductCategory = '';
    if(filterOptions.productCategory === 'photocamera') {
      updateProductCategory = ProductCategory.Camera;
    }
    if(filterOptions.productCategory === 'videocamera') {
      updateProductCategory = ProductCategory.Camcorder;
    }
    filteredProducts = filteredProducts.filter((item) =>
      item.category === updateProductCategory);
  }

  if(filterOptions.productTypes && filteredProducts.length > 0 && filterOptions.productTypes.length) {
    const updateProductTypes: string[] = [];
    for(const type of filterOptions.productTypes) {
      if(type === 'digital') {
        updateProductTypes.push(ProductType.Digital);
      }
      if(type === 'film') {
        updateProductTypes.push(ProductType.Film);
      }
      if(type === 'snapshot') {
        updateProductTypes.push(ProductType.Instant);
      }
      if(type === 'collection') {
        updateProductTypes.push(ProductType.Collectible);
      }
    }

    filteredProducts = filteredProducts.filter((item) => updateProductTypes.includes(item.type));
  }

  if(filterOptions.level && filteredProducts.length > 0 && filterOptions.level.length) {
    const updateProductLevels: string[] = [];
    console.log(filteredProducts);
    for(const level of filterOptions.level) {
      if(level === 'zero') {
        updateProductLevels.push(ProductLevel.Beginning);
      }
      if(level === 'non-professional') {
        updateProductLevels.push(ProductLevel.Amateur);
      }
      if(level === 'professional') {
        updateProductLevels.push(ProductLevel.Professional);
      }

    }

    filteredProducts = filteredProducts.filter((item) => updateProductLevels.includes(item.level));
  }

  return filteredProducts;
}

