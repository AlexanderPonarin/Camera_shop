import { render, fireEvent, screen } from '@testing-library/react';
import CatalogFilterFormCategoryInputs from './catalog-filter-form-category-inputs';
import { BrowserRouter as Router } from 'react-router-dom';


describe('CatalogFilterFormCategoryInputs', () => {
  test('should handle filter category change on Фотокамера', () => {
    render(
      <Router>
        <CatalogFilterFormCategoryInputs />
      </ Router>
    );
    const photocameraCheckbox: HTMLInputElement = screen.getByLabelText('Фотокамера') ;

    fireEvent.click(photocameraCheckbox);

    expect(photocameraCheckbox.checked).toBe(true);
  });

  test('should handle filter category change Видеокамера', () => {
    render(
      <Router>
        <CatalogFilterFormCategoryInputs />
      </ Router>
    );

    const videocameraCheckbox: HTMLInputElement = screen.getByLabelText('Видеокамера');

    fireEvent.click(videocameraCheckbox);

    expect(videocameraCheckbox.checked).toBe(true);
  });
});
