import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('LoadingScreen component', () => {
  test('renders loading text', () => {
    render(<LoadingScreen />);
    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });
});
