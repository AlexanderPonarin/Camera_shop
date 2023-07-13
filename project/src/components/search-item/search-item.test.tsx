import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchItem from './search-item';
import { Product } from '../../types/products';

const testProduct = {
  id: 1,
  name: 'Test Product',
} as unknown as Product;

test('renders search item correctly', () => {
  render(
    <MemoryRouter>
      <SearchItem product={testProduct} isFocused={false} />
    </MemoryRouter>
  );

  const listItem = screen.getByText('Test Product');
  expect(listItem).toBeInTheDocument();
});

test('focuses search item when isFocused prop is true', () => {
  render(
    <MemoryRouter>
      <SearchItem product={testProduct} isFocused />
    </MemoryRouter>
  );

  const listItem = screen.getByText('Test Product');
  expect(listItem).toHaveFocus();
});

