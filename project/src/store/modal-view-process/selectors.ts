import { NameSpace } from '../../consts';
import { State } from '../../types/state';

export const getReviewModalStatus = ( state: State): boolean => state[NameSpace.ModalView].reviewModalViewStatus;
export const getReviewModalSuccessStatus = ( state: State): boolean => state[NameSpace.ModalView].reviewModalSuccessViewStatus;
export const getAddItemModalStatus = ( state: State): boolean => state[NameSpace.ModalView].addItemModalViewStatus;
export const getAddItemSuccessModalStatus = ( state: State): boolean => state[NameSpace.ModalView].addItemSuccessModalViewStatus;
export const getItemBasketSuccessModalStatus = ( state: State): boolean => state[NameSpace.ModalView].itemBasketSuccessViewStatus;
export const getBasketRemoveItemModalStatus = ( state: State): boolean => state[NameSpace.ModalView].basketRemoveItemModalViewStatus;
