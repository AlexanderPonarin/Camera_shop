import { fireEvent, render, screen } from '@testing-library/react';
import ButtonUp from './button-up';

describe('ButtonUp', () => {
  test('should smoothly scroll to the top on button click', () => {
    render(<ButtonUp />);
    const button = screen.getByRole('button');
    const scrollTo = jest.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollTo });
    fireEvent.click(button);
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  test('should render the button component', () => {
    render(<ButtonUp />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
