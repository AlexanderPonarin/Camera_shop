import { render, fireEvent, screen } from '@testing-library/react';
import BasketItem from './basket-item';
import { Product } from '../../types/products';
import { Provider } from 'react-redux';
import { UserProducts } from '../../types/user-products';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

const mockUserProducts: UserProducts = [
  { product: {
    id: 1,
    name: 'Sample Product 1',
    description: 'Sample Description 1',
    price: 100,
  }},
] as unknown as UserProducts;

describe('BasketItem', () => {

  const mockProduct: Product =
    {
      id: 1,
      name: 'Product Name',
      price: 10,
      previewImg: 'product-preview.jpg',
      vendorCode: 'ABC123',
      type: 'Type',
      category: 'Category',
      level: 1,
      previewImgWebp: 'product-preview.webp',
      previewImgWebp2x: 'product-preview@2x.webp',
      previewImg2x: 'product-preview@2x.jpg',
    } as unknown as Product;

  const userQuantity = 2;
  const onProductToRemoveHandler = jest.fn();

  const store = mockStore({
    USER: {
      products: mockUserProducts
    },
  });

  test('renders BasketItem component', () => {
    render(
      <Provider store={store} >
        <BasketItem
          product={mockProduct}
          userQuantity={userQuantity}
          onProductToRemoveHandler={onProductToRemoveHandler}
        />
      </Provider>
    );

    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText('ABC123')).toBeInTheDocument();
    expect(screen.getByText('Type Category')).toBeInTheDocument();
    expect(screen.getByText('1 уровень')).toBeInTheDocument();
    expect(screen.getByText('Цена:')).toBeInTheDocument();
    expect(screen.getByLabelText('количество товара')).toHaveValue(2);
    expect(screen.getByText('Общая цена:')).toBeInTheDocument();
  });

  test('calls onDecreaseBtnClickHandler when decrease button is clicked', () => {
    render(
      <Provider store={store} >
        <BasketItem
          product={mockProduct}
          userQuantity={userQuantity}
          onProductToRemoveHandler={onProductToRemoveHandler}
        />
      </Provider>
    );
    const decreaseBtn = screen.getByLabelText('уменьшить количество товара');

    fireEvent.click(decreaseBtn);

    expect(screen.getByLabelText('количество товара')).toHaveValue(1);
  });

  test('calls onIncreaseBtnClickHandler when increase button is clicked', () => {
    render(
      <Provider store={store} >
        <BasketItem
          product={mockProduct}
          userQuantity={userQuantity}
          onProductToRemoveHandler={onProductToRemoveHandler}
        />
      </Provider>
    );
    const increaseBtn = screen.getByLabelText('увеличить количество товара');

    fireEvent.click(increaseBtn);

    expect(screen.getByLabelText('количество товара')).toHaveValue(3);
  });

  test('calls removeBtnClickHandler when remove button is clicked', () => {
    render(
      <Provider store={store} >
        <BasketItem
          product={mockProduct}
          userQuantity={userQuantity}
          onProductToRemoveHandler={onProductToRemoveHandler}
        />
      </Provider>
    );
    const removeBtn = screen.getByLabelText('Удалить товар');

    fireEvent.click(removeBtn);

    expect(onProductToRemoveHandler).toHaveBeenCalledWith(mockProduct);
  });
});
