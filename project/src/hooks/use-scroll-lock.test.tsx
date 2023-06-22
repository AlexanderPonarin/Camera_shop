import { renderHook } from '@testing-library/react';
import useScrollLock from './use-scroll-lock';
import React from 'react';

jest.mock('../store/modal-view-process/selectors', () => ({
  __esModule: true,
  getAddItemModalStatus: jest.fn(),
  getReviewModalStatus: jest.fn(),
  getReviewModalSuccessStatus: jest.fn(),
}));

jest.mock('.', () => ({
  __esModule: true,
  useAppSelector: jest.fn(),
}));

describe('useScrollLock', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return a ref to the document body', () => {
    const { result } = renderHook(() => useScrollLock());
    expect(result.current).toMatchObject({ current: document.body });
  });


  it('should undo styling when modals are closed', () => {
    const useStateMock = jest.spyOn(React, 'useState');
    const useEffectMock = jest.spyOn(React, 'useEffect');
    useStateMock.mockImplementation(() => [false, jest.fn()]);
    useEffectMock.mockImplementation((func) => func());
    expect(document.body.style.overflow).toEqual('');
    useStateMock.mockRestore();
    useEffectMock.mockRestore();
  });
});
