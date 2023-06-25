import { redirectToRoute } from './actions';

describe('redirect to route action', () => {
  test('should create an action to redirect to a specified route', () => {
    const route = '/dashboard';
    const expectedAction = {
      type: 'redirectToRoute',
      payload: route,
    };
    expect(redirectToRoute(route)).toEqual(expectedAction);
  });
});
