import configureMockStore from 'redux-mock-store';
import { redirect } from './redirect';
import { State } from '../../types/state';
import { Middleware } from 'redux';
import {redirectToRoute} from '../actions';

const mockStore = configureMockStore<State, Middleware<object, State>>([redirect]);

it('should handle routing action', () => {
  const store = mockStore();
  const action = redirectToRoute('/some-path');
  store.dispatch(action);

  const dispatchedActions = store.getActions();
  expect(dispatchedActions).toEqual([action]);
});

it('should handle non-routing action', () => {
  const store = mockStore();
  const action = { type: 'SOME_ACTION' };
  store.dispatch(action);

  const dispatchedActions = store.getActions();
  expect(dispatchedActions).toEqual([action]);
});
