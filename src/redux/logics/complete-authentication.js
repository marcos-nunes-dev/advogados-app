import { createLogic } from 'redux-logic';
import { route } from 'preact-router';

import { services, socketClient, restClient } from '../../feathers';
import appActions from '../reducers/application/actions';
import preloaderActions from '../reducers/preloader/actions';

/**
|--------------------------------------------------
| Lawyer
|--------------------------------------------------
*/

const completeLawyerAuthentication = createLogic({
  type: /SERVICES_LAWYERS_CREATE_FULFILLED/,
  latest: true,
  process({ action }, dispatch, next) {
    const { payload, meta } = action;
    const { authenticate } = services.authentication;

    if (meta && meta.completeAuthentication) {
      console.log('completeAuthentication Logic!');

      dispatch(preloaderActions.showPreloader());

      console.log(payload.authData.accessToken);

      const data = {
        strategy: 'local',
        email: window.tempEmail,
        password: window.tempPassword,
      };

      console.log(data);

      const foo = () => {
        const authAction = authenticate(data);

        const authPromise = dispatch(authAction).payload.promise;

        authPromise
          .then(() => {
            dispatch(appActions.setUser(payload));
            dispatch(preloaderActions.hidePreloader());
            if (meta.goToTutorial) {
              route('/tutorial');
            } else {
              route('/services');
            }
            next();
          })
          .catch(() => {
            dispatch(preloaderActions.hidePreloader());
            next();
          });
      };

      socketClient
        .authenticate(data)
        .then(() => {
          foo();
        })
        .catch(() => {
          foo();
        });
    }
  },
});

/**
|--------------------------------------------------
| User
|--------------------------------------------------
*/

const completeUserAuthentication = createLogic({
  type: /SERVICES_USERS_CREATE_FULFILLED/,
  latest: true,
  process({ getState, action }, dispatch, next) {
    const { payload, meta } = action;
    const { authenticate } = services.authentication;

    if (meta && meta.completeAuthentication) {
      console.log('completeAuthentication Logic!');

      dispatch(preloaderActions.showPreloader());

      const data = {
        strategy: 'local',
        email: window.tempEmail,
        password: window.tempPassword,
      };

      console.log(data);

      socketClient
        .authenticate(data)
        .then(() => {
          console.log('logged');
          foo();
        })
        .catch(() => {
          console.log('no logged');
          foo();
        });

      restClient
        .authenticate(data)
        .then(() => {
          console.log('rest logged');
        })
        .catch(() => {
          console.log('rest no logged');
        });

      const foo = () => {
        const authAction = authenticate(data);

        const authPromise = dispatch(authAction).payload.promise;

        authPromise
          .then(authData => {
            dispatch(appActions.setUser(payload));
            dispatch(preloaderActions.hidePreloader());
            if (window.redirectToLawyer) {
              route(`/lawyer/${window.redirectToLawyer}`);
            } else {
              route('/home');
            }
            next();
          })
          .catch(err => {
            dispatch(preloaderActions.hidePreloader());
            next();
          });
      };
    }
  },
});

export default [completeLawyerAuthentication, completeUserAuthentication];
