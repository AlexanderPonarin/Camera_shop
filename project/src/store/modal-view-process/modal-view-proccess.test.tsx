import { ModalView, setAddItemModalViewStatus, setReviewModalSuccessViewStatus, setReviewModalViewStatus } from './modal-view-process';

describe('ModalView slice', () => {
  let initialState = {
    reviewModalViewStatus: false,
    reviewModalSuccessViewStatus: false,
    addItemModalViewStatus: false,
    addItemSuccessModalViewStatus: false,
    itemBasketSuccessViewStatus: false,
    basketRemoveItemModalViewStatus: false
  };

  beforeEach(() => {
    initialState = {
      reviewModalViewStatus: false,
      reviewModalSuccessViewStatus: false,
      addItemModalViewStatus: false,
      addItemSuccessModalViewStatus: false,
      itemBasketSuccessViewStatus: false,
      basketRemoveItemModalViewStatus: false
    };
  });

  it('should handle setReviewModalViewStatus', () => {
    const newState = ModalView.reducer(initialState, setReviewModalViewStatus(true));
    expect(newState.reviewModalViewStatus).toEqual(true);
  });

  it('should handle setReviewModalSuccessViewStatus', () => {
    const newState = ModalView.reducer(initialState, setReviewModalSuccessViewStatus(true));
    expect(newState.reviewModalSuccessViewStatus).toEqual(true);
  });

  it('should handle setAddItemModalViewStatus', () => {
    const newState = ModalView.reducer(initialState, setAddItemModalViewStatus(true));
    expect(newState.addItemModalViewStatus).toEqual(true);
  });
});
