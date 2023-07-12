import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CatalogSortForm from './catalog-sort-form';
import {BrowserRouter as Router } from 'react-router-dom';

const sortTypeChangeHandlerMock = jest.fn();
const sortOrderChangeHandlerMock = jest.fn();

describe('CatalogSortForm', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders correctly', () => {
    render(
      <Router>
        <CatalogSortForm
          sortTypeChangeHandler={sortTypeChangeHandlerMock}
          sortOrderChangeHandler={sortOrderChangeHandlerMock}
        />
      </Router>
    );

    expect(screen.getByText('по цене')).toBeTruthy();
    expect(screen.getByText('по популярности')).toBeTruthy();

  });

  test('sorts correctly', () => {
    render(
      <Router>
        <CatalogSortForm
          sortTypeChangeHandler={sortTypeChangeHandlerMock}
          sortOrderChangeHandler={sortOrderChangeHandlerMock}
        />
      </Router>);

    fireEvent.click(screen.getByLabelText('по цене'));
    fireEvent.click(screen.getByLabelText('По убыванию'));

    expect(screen.getByRole('radio', { name: 'по цене' })).toHaveProperty('checked', true);
    expect(screen.getByRole('radio', { name: 'По убыванию' })).toHaveProperty('checked', true);

    jest.clearAllMocks();
  });
});
