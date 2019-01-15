import { createReducer } from 'reduxsauce';
import { Types } from './actions';

/**
|--------------------------------------------------
| Initial State
|--------------------------------------------------
*/

const INITIAL_STATE = {
  routeOnAuth: '/home',
};

/**
|--------------------------------------------------
| Reducers
|--------------------------------------------------
*/

const changeAuthRoute = (state, action) => {
  return { ...state, routeOnAuth: action.route };
};


/**
|--------------------------------------------------
| Handlers
|--------------------------------------------------
*/

const HANDLERS = {
  [Types.CHANGE_AUTH_ROUTE]: changeAuthRoute,
};


export default createReducer(INITIAL_STATE, HANDLERS);

