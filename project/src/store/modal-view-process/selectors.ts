import { NameSpace } from '../../consts';
import { State } from '../../types/state';

export const getReviewModalStatus = ( state: State): boolean => state[NameSpace.ModalView].reviewModalViewStatus;
export const getReviewModalSuccessStatus = ( state: State): boolean => state[NameSpace.ModalView].reviewModalSuccessViewStatus;
export const getAddItemModalStatus = ( state: State): boolean => state[NameSpace.ModalView].addItemModalViewStatus;
