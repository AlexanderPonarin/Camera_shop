import { render, screen } from '@testing-library/react';
import Logo from './logo';

describe('Logo', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders correctly', () => {
    render(<Logo />);

    expect(screen.getByTestId('icon-add-basket')).toBeInTheDocument();

  });
});
