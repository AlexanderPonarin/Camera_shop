import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Footer', () => {
  it('should render the footer component correctly', () => {
    render(<Footer />);
    const footerEl = screen.getByRole('contentinfo');
    const logoEl = screen.getByLabelText('Переход на главную');
    const socialEl = screen.getByLabelText('Переход на страницу вконтатке');
    const navEl = screen.getByText('Каталог');
    const resourceEl = screen.getByText('Курсы операторов');
    const supportEl = screen.getByText('FAQ');

    expect(footerEl).toBeInTheDocument();
    expect(logoEl).toBeInTheDocument();
    expect(socialEl).toBeInTheDocument();
    expect(navEl).toBeInTheDocument();
    expect(resourceEl).toBeInTheDocument();
    expect(supportEl).toBeInTheDocument();
  });
});
