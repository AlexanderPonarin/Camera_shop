import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CatalogSortForm from './catalog-sort-form';

describe('CatalogSortForm', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders correctly', () => {
    render(<CatalogSortForm />);

    expect(screen.getByText('по цене')).toBeTruthy();
    expect(screen.getByText('по популярности')).toBeTruthy();

  });

  test('sorts correctly', () => {
    render(<CatalogSortForm />);

    fireEvent.click(screen.getByLabelText('по цене'));
    fireEvent.click(screen.getByLabelText('По убыванию'));

    expect(screen.getByRole('radio', { name: 'по цене' })).toHaveProperty('checked', true);
    expect(screen.getByRole('radio', { name: 'По убыванию' })).toHaveProperty('checked', true);

    jest.clearAllMocks();
  });
});
