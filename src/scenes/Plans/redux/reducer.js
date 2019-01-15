import { createReducer } from 'reduxsauce';
import { Types } from './actions';
import Immutable from 'seamless-immutable';

/**
|--------------------------------------------------
| Initial State
|--------------------------------------------------
*/

const INITIAL_STATE = new Immutable({
  planId: null
});

/**
|--------------------------------------------------
| Reducers
|--------------------------------------------------
*/



const selectPlan = (state, { planId }) =>
  state.merge({ planId });

/**
|--------------------------------------------------
| Handlers
|--------------------------------------------------
*/

const HANDLERS = {
  [Types.SELECT_PLAN]: selectPlan
};

export default createReducer(INITIAL_STATE, HANDLERS);
