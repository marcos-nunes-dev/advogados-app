import { createReducer } from 'reduxsauce';
import { Types } from './actions';
import Immutable from 'seamless-immutable';

/**
|--------------------------------------------------
| Initial State
|--------------------------------------------------
*/

const INITIAL_STATE = new Immutable({
  step: 1,
  planId: null
});

/**
|--------------------------------------------------
| Reducers
|--------------------------------------------------
*/


const setStep = (state, {value}) =>
  state.merge({ step: value });

const backStep = (state) =>
  state.merge({ step: state.step > 1 ? state.step - 1 : state.step });

const selectPlan = (state, { planId, payload }) =>
  state.merge({ planId, plan: payload });

/**
|--------------------------------------------------
| Handlers
|--------------------------------------------------
*/

const HANDLERS = {
  [Types.SET_STEP]: setStep,
  [Types.BACK_STEP]: backStep,
  [Types.SELECT_PLAN]: selectPlan
};

export default createReducer(INITIAL_STATE, HANDLERS);
