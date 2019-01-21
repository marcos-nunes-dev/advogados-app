import reduxifyServices from 'feathers-redux';
import feathers from '@feathersjs/feathers';
import feathersAuth from '@feathersjs/authentication-client';
import rest from '@feathersjs/rest-client';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import values from 'lodash/values';
import axios from 'axios';
import feathersReduxifyAuthentication from 'feathers-reduxify-authentication';
import servicesConfig from './services';
import configureFeathersOfflineFirstRealtime from './offline-first';

/**
|--------------------------------------------------
| Clients Configuration
|--------------------------------------------------
*/

//const API_ENDPOINT = 'http://oi-advogado-api.sa-east-1.elasticbeanstalk.com';
const API_ENDPOINT = 'http://localhost:3030';

export const socketClient = feathers()
  .configure(socketio(io(API_ENDPOINT), { timeout: 60000 }))
  .configure(feathersAuth({ storage: localStorage }));

export const restClient = feathers()
  .configure(rest(API_ENDPOINT).axios(axios))
  .configure(feathersAuth({ storage: localStorage }));

/**
|--------------------------------------------------
| Feathers Authentication
|--------------------------------------------------
*/

/*
  For real-time works on Feathers v3 you must use socketClient
  in authentication and new Channels features will works
*/
export const authentication = feathersReduxifyAuthentication(socketClient, {});
window.auth = authentication;

/**
|--------------------------------------------------
| Redux Integration
|--------------------------------------------------
*/

export const services = {
  authentication,
  ...reduxifyServices(restClient, servicesConfig),
};

/**
|--------------------------------------------------
| Extract all service reducers
|--------------------------------------------------
*/

const extractAllReducers = (servicesConfig, services) => {
  const keys = values(servicesConfig);
  return keys.reduce(
    (obj, serviceName) => ({
      ...obj,
      [serviceName]: services[serviceName].reducer,
    }),
    {},
  );
};

/**
|--------------------------------------------------
| Exports reducers
|--------------------------------------------------
*/

export const reducers = {
  authentication: authentication.reducer,
  ...extractAllReducers(servicesConfig, services),
};

/**
|--------------------------------------------------
| Configure Offline-firt Realtime
|--------------------------------------------------
*/

export const configureOfflineFirstRealtime = (store, authData) => {
  configureFeathersOfflineFirstRealtime(store, socketClient, services, authData);
};

/**
|--------------------------------------------------
| Sync Authentication
|--------------------------------------------------
*/

export const sync = () => {
  const authState = store.getState().authentication;
  if (authState.isSignedIn) return Promise.resolve(true);

  if (localStorage['feathers-jwt']) {
    const action = authentication.authenticate();
    const { payload } = window.store.dispatch(action);
    return payload.promise
      .then(res => {
        const authToken = JSON.parse(atob(res.accessToken.split('.')[1]));
        return authToken;
      })
      .catch(err => {
        window.localStorage.clear();
        window.location.reload();
      });
  }

  return Promise.resolve(false);
};
