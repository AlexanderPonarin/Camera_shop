import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from './history-route';

test('renders children correctly with history prop', () => {
  const history = createMemoryHistory();
  render(
    <HistoryRouter history={history}>
      <div>Test</div>
    </HistoryRouter>,
  );
  const textElement = screen.getByText(/test/i);
  expect(textElement).toBeInTheDocument();
});

