import { AxiosInstance } from 'axios';
import { fetchProductsAction, fetchPromoProductAction, fetchSimilarProductsAction, fetchReviewsAction, sendReviewAction } from './';

// Mocked data and instances
const mockData = { foo: 'bar' };
const mockAxiosInstance: AxiosInstance = {
  get: jest.fn(),
  post: jest.fn(),
} as unknown as AxiosInstance;

// Mocked arguments for async thunks
const dispatchMock = jest.fn();
const getStateMock = jest.fn();
const extraMock = jest.fn();

describe('fetchProductsAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch products correctly', async () => {
    // GIVEN
    mockAxiosInstance.get.mockResolvedValueOnce({ data: mockData });

    // WHEN
    await fetchProductsAction(null, { dispatch: dispatchMock, getState: getStateMock, extra: mockAxiosInstance });

    // THEN
    expect(mockAxiosInstance.get).toBeCalledWith('cameras');
    expect(dispatchMock).toBeCalledWith(fetchProductsAction.fulfilled(mockData));
  });

  it('should handle fetch error correctly', async () => {
    // GIVEN
    const mockError = new Error('Request failed');
    mockAxiosInstance.get.mockRejectedValueOnce(mockError);

    // WHEN
    await fetchProductsAction(null, { dispatch: dispatchMock, getState: getStateMock, extra: mockAxiosInstance });

    // THEN
    expect(mockAxiosInstance.get).toBeCalledWith('cameras');
    expect(dispatchMock).toBeCalledWith(fetchProductsAction.rejected(mockError));
  });
});

describe('fetchPromoProductAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch promo product correctly', async () => {
    // GIVEN
    mockAxiosInstance.get.mockResolvedValueOnce({ data: mockData });

    // WHEN
    await fetchPromoProductAction(null, { dispatch: dispatchMock, getState: getStateMock, extra: mockAxiosInstance });

    // THEN
    expect(mockAxiosInstance.get).toBeCalledWith('promo');
    expect(dispatchMock).toBeCalledWith(fetchPromoProductAction.fulfilled(mockData));
  });

  it('should handle fetch error correctly', async () => {
    // GIVEN
    const mockError = new Error('Request failed');
    mockAxiosInstance.get.mockRejectedValueOnce(mockError);

    // WHEN
    await fetchPromoProductAction(null, { dispatch: dispatchMock, getState: getStateMock, extra: mockAxiosInstance });

    // THEN
    expect(mockAxiosInstance.get).toBeCalledWith('promo');
    expect(dispatchMock).toBeCalledWith(fetchPromoProductAction.rejected(mockError));
  });
});

describe('fetchSimilarProductsAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch similar products correctly', async () => {
    // GIVEN
    const mockId = 42;
    mockAxiosInstance.get.mockResolvedValueOnce({ data: mockData });

    // WHEN
    await fetchSimilarProductsAction(mockId, { dispatch: dispatchMock, getState: getStateMock, extra: mockAxiosInstance });

    // THEN
    expect(mockAxiosInstance.get).toBeCalledWith('/cameras/42/similar');
    expect(dispatchMock).toBeCalledWith(fetchSimilarProductsAction.fulfilled(mockData));
  });

  it('should handle fetch error correctly', async () => {
    // GIVEN
    const mockError = new Error('Request failed');
    const mockId = 42;
    mockAxiosInstance.get.mockRejectedValueOnce(mockError);

    // WHEN
    await fetchSimilarProductsAction(mockId, { dispatch: dispatchMock, getState: getStateMock, extra: mockAxiosInstance });

    // THEN
    expect(mockAxiosInstance.get).toBeCalledWith('/cameras/42/similar');
    expect(dispatchMock).toBeCalledWith(fetchSimilarProductsAction.rejected(mockError));
  });
});

describe('fetchReviewsAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch reviews correctly', async () => {
    // GIVEN
    const mockId = 42;
    mockAxiosInstance.get.mockResolvedValueOnce({ data: mockData });

    // WHEN
    await fetchReviewsAction(mockId, { dispatch: dispatchMock, getState: getStateMock, extra: mockAxiosInstance });

    // THEN
    expect(mockAxiosInstance.get).toBeCalledWith('/cameras/42/reviews');
    expect(dispatchMock).toBeCalledWith(fetchReviewsAction.fulfilled(mockData));
  });

  it('should handle fetch error correctly', async () => {
    // GIVEN
    const mockError = new Error('Request failed');
    const mockId = 42;
    mockAxiosInstance.get.mockRejectedValueOnce(mockError);

    // WHEN
    await fetchReviewsAction(mockId, { dispatch: dispatchMock, getState: getStateMock, extra: mockAxiosInstance });

    // THEN
    expect(mockAxiosInstance.get).toBeCalledWith('/cameras/42/reviews');
    expect(dispatchMock).toBeCalledWith(fetchReviewsAction.rejected(mockError));
  });
});

describe('sendReviewAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send review correctly', async () => {
    // GIVEN
    const mockReviewForm = { cameraId: 42, rating: 5, comment: 'Great product' };
    const mockReviewData = { ...mockReviewForm, id: 1 };
    mockAxiosInstance.post.mockResolvedValueOnce({ data: mockReviewData });

    // WHEN
    await sendReviewAction(mockReviewForm, { dispatch: dispatchMock, getState: getStateMock, extra: mockAxiosInstance });

    // THEN
    expect(mockAxiosInstance.post).toBeCalledWith('reviews', mockReviewForm);
    expect(dispatchMock).toBeCalledWith(fetchReviewsAction.success(mockReviewForm.cameraId));
    expect(dispatchMock).toBeCalledWith(setReviewModalViewStatus(false));
    expect(dispatchMock).toBeCalledWith(setReviewModalSuccessViewStatus(true));
  });

  it('should handle send error correctly', async () => {
    // GIVEN
    const mockReviewForm = { cameraId: 42, rating: 5, comment: 'Great product' };
    const mockError = new Error('Request failed');
    mockAxiosInstance.post.mockRejectedValueOnce(mockError);

    // WHEN
    await sendReviewAction(mockReviewForm, { dispatch: dispatchMock, getState: getStateMock, extra: mockAxiosInstance });

    // THEN
    expect(mockAxiosInstance.post).toBeCalledWith('reviews', mockReviewForm);
    expect(dispatchMock).toBeCalledWith(fetchReviewsAction.failure(mockReviewForm.cameraId));
    expect(dispatchMock).not.toBeCalledWith(setReviewModalViewStatus(false));
    expect(dispatchMock).not.toBeCalledWith(setReviewModalSuccessViewStatus(true));
  });
});
