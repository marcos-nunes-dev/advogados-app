import { createReducer } from 'reduxsauce';
import { Types } from './actions';

/**
|--------------------------------------------------
| Initial State
|--------------------------------------------------
*/

const INITIAL_STATE = {
  drawerOpened: false
};

/**
|--------------------------------------------------
| Reducers
|--------------------------------------------------
*/


const toggleDrawer = (state) => {
  return { drawerOpened: !state.drawerOpened };
};

/**
|--------------------------------------------------
| Handlers
|--------------------------------------------------
*/

const HANDLERS = {
  [Types.TOGGLE_DRAWER]: toggleDrawer,
};


export default createReducer(INITIAL_STATE, HANDLERS);

