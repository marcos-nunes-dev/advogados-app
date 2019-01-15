import { createReducer } from 'reduxsauce';
import { Types } from './actions';
import Immutable from 'seamless-immutable';

/**
|--------------------------------------------------
| Initial State
|--------------------------------------------------
*/

const getStoredArea = () => {
  const stored = localStorage.getItem('search-area');
  return stored
    ? JSON.parse(stored)
    : {}
};

const INITIAL_STATE = new Immutable({
  area: getStoredArea(),
  location: localStorage.getItem('location')
    ? JSON.parse(localStorage.getItem('location'))
    : {
      state: 'SP',
      city: 'São Paulo',
      coords: [-23.5632103, -46.6542503]
    },
  geolocation: {
    address: '',
    coords: [0,0] 
  }
});

/**
|--------------------------------------------------
| Reducers
|--------------------------------------------------
*/

const setLocation = (state, {payload}) => {
  localStorage.setItem('location', JSON.stringify(payload));
  return state.merge({ location: payload });
}

const setArea = (state, { payload }) => {
  localStorage.setItem('search-area', JSON.stringify(payload));
  return state.merge({ area: payload });
}

/**
|--------------------------------------------------
| Handlers
|--------------------------------------------------
*/

const HANDLERS = {
  [Types.SET_LOCATION]: setLocation,
  [Types.SET_AREA]: setArea
};

export default createReducer(INITIAL_STATE, HANDLERS);
