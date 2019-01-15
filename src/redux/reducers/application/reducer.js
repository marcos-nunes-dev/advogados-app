import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { Types } from './actions';

/**
|--------------------------------------------------
| Initial State
|--------------------------------------------------
*/

const getStoredAuthData = () => {
  const stored = localStorage.getItem('userData');
  return stored ? JSON.parse(stored) : {};
};

const INITIAL_STATE = new Immutable({
  snapshotSyncronized: false,
  userData: getStoredAuthData(),
});

/**
|--------------------------------------------------
| Reducers
|--------------------------------------------------
*/

const snapshotSyncronized = state => state.merge({ snapshotSyncronized: true });

const setUser = (state, { payload }) => {
  localStorage.setItem('userData', JSON.stringify(payload || {}));
  return state.merge({ userData: payload });
};

const reset = state => state.merge(INITIAL_STATE);

/**
|--------------------------------------------------
| Handlers
|--------------------------------------------------
*/

const HANDLERS = {
  [Types.SNAPSHOT_SYNCRONIZED]: snapshotSyncronized,
  [Types.SET_USER]: setUser,
  [Types.RESET_APP]: reset,
};

export default createReducer(INITIAL_STATE, HANDLERS);
