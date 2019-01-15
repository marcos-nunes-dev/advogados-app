import { createReducer } from 'reduxsauce';
import { Types } from './actions';
import Immutable from 'seamless-immutable';

/**
|--------------------------------------------------
| Initial State
|--------------------------------------------------
*/

const INITIAL_STATE = new Immutable({
  
});

/**
|--------------------------------------------------
| Reducers
|--------------------------------------------------
*/


const reset = () => INITIAL_STATE;

/**
|--------------------------------------------------
| Handlers
|--------------------------------------------------
*/

const HANDLERS = {
  [Types.RESET]: reset
};


export default createReducer(INITIAL_STATE, HANDLERS);

