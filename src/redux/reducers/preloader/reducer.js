import { createReducer } from 'reduxsauce';
import { Types } from './actions';

/**
|--------------------------------------------------
| Initial State
|--------------------------------------------------
*/

const INITIAL_STATE = {
  opened: false
};

/**
|--------------------------------------------------
| Reducers
|--------------------------------------------------
*/

const show = (state) => {
  return { opened: true };
};

const hide = (state) => {
  return { opened: false };
};

/**
|--------------------------------------------------
| Handlers
|--------------------------------------------------
*/

const HANDLERS = {
  [Types.SHOW_PRELOADER]: show,
  [Types.HIDE_PRELOADER]: hide,
};


export default createReducer(INITIAL_STATE, HANDLERS);

