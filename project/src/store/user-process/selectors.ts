import { NameSpace } from '../../consts';
import { State } from '../../types/state';
import { UserProducts } from '../../types/user-products';

export const getUserProducts = ( state: State): UserProducts => state[NameSpace.User].products;

