
import reduxThunk from 'redux-thunk';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import { createLogicMiddleware } from 'redux-logic';

import logger from './logger';

/**
|--------------------------------------------------
| Logics
|--------------------------------------------------
*/

import backOnFinish from '../logics/back-on-finish';
import orderStatusNotification from '../logics/order-status-notification';
import confirmDialog from '../logics/confirm-dialog';
import validationData from '../logics/validation-data';
import errorDialog from '../logics/error-dialog';
import { showPreloader, hidePreloader } from '../logics/preloaders';
import rediretOnFinished from '../logics/redirect-on-finished';
import rediretOnAuth from '../logics/redirect-on-auth';
import toast from '../logics/toast';
import onLogout from '../logics/on-logout';
import syncSnapshot from '../logics/sync-snapshots';
import completeAuthentication from '../logics/complete-authentication';
import savePendingRequestOnAuth from '../logics/save-pending-request-on-auth';


/**
|--------------------------------------------------
| Scenes Logic Middlewares
|--------------------------------------------------
*/

const logicMiddlewares = [
  orderStatusNotification,
  syncSnapshot,
  backOnFinish, 
  confirmDialog, 
  errorDialog,
  showPreloader,
  hidePreloader,
  rediretOnFinished,
  rediretOnAuth,
  toast,
  onLogout,
  validationData,
  ...savePendingRequestOnAuth,
  ...completeAuthentication,
];


export default [
  createLogicMiddleware(logicMiddlewares),
  // logger('store', { diff: true }),
  reduxThunk,
  reduxPromiseMiddleware()
];

