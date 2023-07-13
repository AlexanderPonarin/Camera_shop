import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import CatalogFilterFormLevelInputs from './catalog-filter-form-level-inputs';

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

describe('CatalogFilterFormLevelInputs', () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(), jest.fn()]);
  });

  it('should render checkboxes correctly', () => {
    render(<CatalogFilterFormLevelInputs />);
    expect(screen.getByLabelText('Нулевой')).toBeInTheDocument();
    expect(screen.getByLabelText('Любительский')).toBeInTheDocument();
    expect(screen.getByLabelText('Профессиональный')).toBeInTheDocument();
  });

  it('should update search params when a checkbox is checked', () => {
    const setSearchParams = jest.fn();
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(), setSearchParams]);
    render(<CatalogFilterFormLevelInputs />);

    fireEvent.click(screen.getByLabelText('Нулевой'));

    expect(setSearchParams).toHaveBeenCalledWith('level=zero');

  });

});
