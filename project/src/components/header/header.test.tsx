import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './header';

describe('Header', () => {
  it('should render the header component correctly', () => {
    render(<Header />);
    const headerEl = screen.getByRole('banner');
    const logoEl = screen.getByLabelText('Переход на главную');
    const navEl = screen.getByText('Каталог');
    const searchEl = screen.getByPlaceholderText('Поиск по сайту');

    expect(headerEl).toBeInTheDocument();
    expect(logoEl).toBeInTheDocument();
    expect(navEl).toBeInTheDocument();
    expect(searchEl).toBeInTheDocument();
  });
});