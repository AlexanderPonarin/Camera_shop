import { render, screen } from '@testing-library/react';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';

describe('Logo', () => {
  test('renders the logo element', () => {
    render(
      <Provider >
        <Route>
          <CatalogScreen />
        </Route>
      </Provider >
    );
    const bascetEl = screen.getByTestId('icon-basket');
    expect(bascetEl).toBeInTheDocument();
  });

});
