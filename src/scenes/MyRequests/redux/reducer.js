import { createReducer } from 'reduxsauce';
import { Types } from './actions';

/**
|--------------------------------------------------
| Initial State
|--------------------------------------------------
*/

const INITIAL_STATE = {
  fixedIndex: 0,
};

/**
|--------------------------------------------------
| Reducers
|--------------------------------------------------
*/


const handleFixedTabChange = (state, action) => {
  console.log(action.index)
  return { fixedIndex: action.index };
};

/**
|--------------------------------------------------
| Handlers
|--------------------------------------------------
*/

const HANDLERS = {
  [Types.HANDLE_FIXED_TAB_CHANGE]: handleFixedTabChange,
};


export default createReducer(INITIAL_STATE, HANDLERS);

