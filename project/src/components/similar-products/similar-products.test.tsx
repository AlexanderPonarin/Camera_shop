import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import SimilarProducts from './similar-products';
import { Product } from '../../types/products';

const history = createMemoryHistory();
const mockSimilarProduct: Product = {
  id: 1,
  name: 'Product 1',
  price: 10.5,
} as Product;

const fakeApp = (
  <HistoryRouter history={history}>
    <SimilarProducts product={mockSimilarProduct} cb={() => false}/>
  </HistoryRouter>
);

describe('Component: SimilarProducts', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/10.5/i)).toBeInTheDocument();


  });
});
