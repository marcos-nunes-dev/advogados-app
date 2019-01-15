import { createLogic } from 'redux-logic';
import { services, restClient } from '../../feathers';
import { configureOfflineFirstRealtime, sync } from '../../feathers';
import appActions from '../../redux/reducers/application/actions';
import { store } from '../../index';

/**
|--------------------------------------------------
| Redirect On Finish
|--------------------------------------------------
*/

const syncSnapshot = createLogic({
  type: 'SERVICES_AUTHENTICATION_AUTHENTICATE_FULFILLED',
  latest: true,
  process: ({ getState, action }, dispatch, next) => {

    const { payload } = action;

    const JWT = JSON.parse(atob(payload.accessToken.split('.')[1]));

    restClient
      .authenticate()
      .then(() => {

        restClient
          .service('app/user-profile')

          .get(JWT.userId)
          .then(user => {

            dispatch(appActions.setUser(user));

            sync(store)
              .then(({ type }) => {
                configureOfflineFirstRealtime(store, type)
                next();
              })
              .catch(() => next());
          })
          
        restClient
          .service('app/user-profile')
          .patch(JWT.userId, {
            device_id: localStorage.getItem('local_device_id')
          })
          .then(() => {
          })
      })
      .catch(() => {
        window.localStorage.clear();
        window.location.reload();
      });

  }
});

export default syncSnapshot;