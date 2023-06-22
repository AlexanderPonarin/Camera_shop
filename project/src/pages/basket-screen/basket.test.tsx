import { render, screen } from '@testing-library/react';
import React from 'react';
import BasketScreen from './basket-screen';

describe('BasketScreen', () => {
  it('should render the header', () => {
    render(<BasketScreen />);
    const headerAndFooter = screen.getAllByText('Доставка');
    expect(headerAndFooter[0]).toBeInTheDocument();
    expect(headerAndFooter[1]).toBeInTheDocument();

  });

  it('should render the page title', () => {
    render(<BasketScreen />);
    const basketTitles = screen.getAllByText('Корзина');
    expect(basketTitles[0]).toBeInTheDocument();
    expect(basketTitles[1]).toBeInTheDocument();

  });

});
