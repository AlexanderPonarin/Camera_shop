import { render, screen, fireEvent } from '@testing-library/react';
import ProductTabs from './product-tabs';
import { Product } from '../../types/products';
import { ProductCategory, ProductLevel, ProductType } from '../../consts';
import {BrowserRouter as Router } from 'react-router-dom';


const mockProduct = {
  id: 1,
  name: 'Test Product',
  vendorCode: '1234',
  type: ProductType.Digital,
  category: ProductCategory.Camcorder,
  level: ProductLevel.Beginning,
  description: 'This is a test product.',
} as Product;

describe('ProductTabs', () => {
  it('renders tabs with correct titles', () => {
    render(
      <Router>
        <ProductTabs product={mockProduct} />
      </Router>
    );
    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
  });

  it('changes active tab on click', () => {
    render(
      <Router>
        <ProductTabs product={mockProduct} />
      </Router>
    );
    const characterizationTab = screen.getByText('Характеристики');
    const descriptionTab = screen.getByText('Описание');

    fireEvent.click(characterizationTab);
    expect(characterizationTab.classList).toContain('is-active');
    expect(descriptionTab.classList).not.toContain('is-active');

    fireEvent.click(descriptionTab);
    expect(descriptionTab.classList).toContain('is-active');
    expect(characterizationTab.classList).not.toContain('is-active');
  });
});
