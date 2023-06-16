import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CatalogSortForm from './catalog-sort-form';

describe('CatalogSortForm', () => {
  test('renders correctly', () => {
    render(<CatalogSortForm />);

    expect(screen.getByText('по цене')).toBeTruthy();
    expect(screen.getByText('по популярности')).toBeTruthy();

  });

  test('sorts correctly', () => {
    render(<CatalogSortForm />);

    fireEvent.click(screen.getByLabelText('по цене'));
    fireEvent.click(screen.getByLabelText('По убыванию'));

    expect(screen.getByLabelText('по цене').checked).toBe(true);
    expect(screen.getByLabelText('По убыванию').checked).toBe(true);
  });
});
