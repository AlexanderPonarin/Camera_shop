import { Product } from './products';

export type UserProduct = {
    selectedQuantity: number;
    product: Product;
};

export type UserProducts = UserProduct[];
