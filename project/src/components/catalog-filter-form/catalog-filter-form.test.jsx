import React from 'react';
import ReactDOM from 'react-dom';
import CatalogFilterForm from './catalog-filter-form';
import { render, screen } from '@testing-library/react';


describe('Catalog filter form component', () => {
  test('renders a price filter fieldset', () => {
    render(<CatalogFilterForm />);
    const priceFieldset = screen.getByRole('group', { name: /цена/i });
    expect(priceFieldset).toBeInTheDocument();
  });

  test('renders category checkboxes', () => {
    render(<CatalogFilterForm />);
    const categoryCheckboxes = screen.getAllByRole('checkbox', { name: /фотокамера|видеокамера/i });
    expect(categoryCheckboxes.length).toBe(2);
  });

  test('renders a type cameras checkboxes fieldset', () => {
    render(<CatalogFilterForm />);
    const typeCamerasFieldset = screen.getByRole('group', { name: /тип камеры/i });
    expect(typeCamerasFieldset).toBeInTheDocument();
  });

  test('renders level checkboxes', () => {
    render(<CatalogFilterForm />);
    const levelCheckboxes = screen.getAllByRole('checkbox', { name: /нулевой|любительский|профессиональный/i });
    expect(levelCheckboxes.length).toBe(3);
  });

  test('renders a reset button', () => {
    render(<CatalogFilterForm />);
    const resetButton = screen.getByRole('button', { name: /сбросить фильтры/i });
    expect(resetButton).toBeInTheDocument();
  });
});
