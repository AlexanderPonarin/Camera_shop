import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundScreen from './not-found-screen';
import {BrowserRouter as Router } from 'react-router-dom';


describe('NotFoundScreen', () => {
  it('renders correct text', () => {
    render(
      <Router>
        <NotFoundScreen />
      </Router>);
    const buttonText = screen.getByRole('button').textContent;

    expect(buttonText).toEqual('Нажмите для перехода на главную страницу');
  });

  it('renders correct image', () => {
    render(
      <Router>
        <NotFoundScreen />
      </Router>);
    const image = screen.getByAltText(/page not found/i);
    const textNotFound = screen.getByText(/Страница не найдена./i);
    const text404 = screen.getByText(/404/i);

    expect(image).toBeInTheDocument();
    expect(textNotFound).toBeInTheDocument();
    expect(text404).toBeInTheDocument();

  });
});
