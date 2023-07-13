import { render, fireEvent, screen } from '@testing-library/react';
import CataloFilterFormPriceInputs from './catalog-filter-form-price-inputs';
import { BrowserRouter as Router } from 'react-router-dom';


test('should update min price correctly', () => {
  render(
    <Router>
      <CataloFilterFormPriceInputs lte={0} gte={100} />
    </Router>
  );

  const minPriceInput: HTMLInputElement = screen.getByTestId(/minprice/i);

  fireEvent.change(minPriceInput, { target: { value: '50' } });

  expect(minPriceInput.value).toBe('50');
});
