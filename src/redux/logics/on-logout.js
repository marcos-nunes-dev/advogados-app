import { createLogic } from 'redux-logic';
import { restClient, socketClient } from '../../feathers';
import { route } from 'preact-router';
import { configureOfflineFirstRealtime, sync } from '../../feathers';
import appActions from '../../redux/reducers/application/actions';
import { store } from '../../index';

/**
|--------------------------------------------------
| Back On Finish
|--------------------------------------------------
*/

const backOnFinish = createLogic({
  type: /SERVICES_AUTHENTICATION_LOGOUT/,
  latest: true,
  process({ getState, action }, dispatch, next) {

    // limpa storage
    localStorage.clear();

    // desloga clients pra ter certeza
    socketClient.logout()
      .then(restClient.logout)
      .then(() => {
        // re-syncroniza snapshots
        console.log(appActions.resetApp())
        dispatch(appActions.resetApp());
        route('/home');
        sync(store)
          .then(({ type }) => {
            configureOfflineFirstRealtime(store, type);
            location.reload()
            next();
          })
          .catch(() => next());
      })


    // redireciona para home
    
  }
});

export default backOnFinish;