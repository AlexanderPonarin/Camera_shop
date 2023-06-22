import { renderHook } from '@testing-library/react-hooks';
import { useAppSelector } from '.';
import { getAddItemModalStatus, getReviewModalStatus, getReviewModalSuccessStatus } from '../store/modal-view-process/selectors';
import useScrollLock from '../hooks/';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
  useEffect: jest.fn(),
}));
jest.mock('./useAppSelector', () => ({
  useAppSelector: jest.fn(),
}));

describe('useScrollLock', () => {
  let addModalStatus;
  let reviewModalStatus;
  let reviewModalSuccessStatus;
  let bodyRef;

  beforeEach(() => {
    addModalStatus = false;
    reviewModalStatus = false;
    reviewModalSuccessStatus = false;
    bodyRef = { current: { style: {}, getComputedStyle: jest.fn() } };
    useRef.mockReturnValueOnce(bodyRef);

    useAppSelector.mockImplementation((selectorFn) => {
      if (selectorFn === getAddItemModalStatus) return addModalStatus;
      if (selectorFn === getReviewModalStatus) return reviewModalStatus;
      if (selectorFn === getReviewModalSuccessStatus) return reviewModalSuccessStatus;

      return null;
    });
    window.getComputedStyle.mockReturnValue({ overflow: '' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set overflow to hidden when any modal is open', () => {
    addModalStatus = true;
    renderHook(() => useScrollLock());

    expect(bodyRef.current.style.overflow).toBe('hidden');
  });

  it('should set overflow to original value when all modals are closed', () => {
    addModalStatus = false;
    reviewModalSuccessStatus = false;
    reviewModalStatus = false;
    renderHook(() => useScrollLock());

    expect(bodyRef.current.style.overflow).toBe('');
  });

  it('should set overflow to hidden when any review modal is open', () => {
    reviewModalStatus = true;
    renderHook(() => useScrollLock());

    expect(bodyRef.current.style.overflow).toBe('hidden');
  });

  it('should set overflow to hidden when review modal success is open', () => {
    reviewModalSuccessStatus = true;
    renderHook(() => useScrollLock());

    expect(bodyRef.current.style.overflow).toBe('hidden');
  });

  it('should return the body reference', () => {
    const { result } = renderHook(() => useScrollLock());

    expect(result.current).toBe(bodyRef);
  });
});
