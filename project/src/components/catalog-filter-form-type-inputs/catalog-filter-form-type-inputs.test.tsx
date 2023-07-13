import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CatalogFilterFormTypeInputs from './catalog-filter-form-type-inputs';
import { BrowserRouter as Router } from 'react-router-dom';


test('Handle filter product type change when checkbox is checked', () => {
  render(
    <Router>
      <CatalogFilterFormTypeInputs />
    </Router>
  );

  const digitalCheckbox = screen.getByLabelText('Цифровая');

  fireEvent.click(digitalCheckbox);

  const searchParams = new URLSearchParams(window.location.search);

  expect(searchParams.get('product-type')).toBe('digital');
});

test('Handle filter product type change when checkbox is unchecked', () => {
  render(
    <Router>
      <CatalogFilterFormTypeInputs />
    </Router>
  );

  const filmCheckbox = screen.getByLabelText('Плёночная');

  fireEvent.click(filmCheckbox);
  fireEvent.click(filmCheckbox);

  const searchParams = new URLSearchParams(window.location.search);

  expect(searchParams.get('product-type')).toBe('digital');
});

