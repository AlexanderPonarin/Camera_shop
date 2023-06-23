import { render, screen } from '@testing-library/react';
import React from 'react';
import BasketScreen from './basket-screen';
import {BrowserRouter as Router } from 'react-router-dom';


describe('BasketScreen', () => {
  it('should render the header', () => {
    render(
      <Router>
        <BasketScreen />
      </Router>
    );
    const headerAndFooter = screen.getAllByText('Доставка');
    expect(headerAndFooter[0]).toBeInTheDocument();
    expect(headerAndFooter[1]).toBeInTheDocument();

  });

  it('should render the page title', () => {
    render(
      <Router>
        <BasketScreen />
      </Router>);
    const basketTitles = screen.getAllByText('Корзина');
    expect(basketTitles[0]).toBeInTheDocument();
    expect(basketTitles[1]).toBeInTheDocument();

  });

});
