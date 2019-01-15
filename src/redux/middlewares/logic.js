import { createLogic } from 'redux-logic';
import metalize from '../../helpers/metalize';

/**
|--------------------------------------------------
| Toast
|--------------------------------------------------
*/

const toast = createLogic({
  type: /FULFILLED$/,
  latest: true,
  process({ getState, action }, dispatch, next) {

    const defaultConfig = {
      text: '',
      closeTimeout: 2000
    };

    const meta = action.meta;
    if (meta && meta.toastOnFinish) {
      console.log('Logic(toast)', meta.toastOnFinish);
    }

    next(action);
  }
});

/**
|--------------------------------------------------
| Back page when finish
|--------------------------------------------------
*/

const backOnFinish = createLogic({
  type: /FULFILLED$/,
  latest: true,
  process({ getState, action }, dispatch, next) {

    const meta = action.meta;
    if (meta && meta.backOnFinish) {
      console.log('Logic(backOnFinish)');
    }

    next(action);
  }
});

/**
|--------------------------------------------------
| Show/Hide Preloader
|--------------------------------------------------
*/

const showPreloader = createLogic({
  type: /^SERVICES_(.*)_(.*)/,
  latest: true,
  process({ getState, action }, dispatch, next) {

    if (action.meta && action.meta.showPreloader) {
      console.log('Logic(showPreloader)');
    }

    next(action);
  }
});

const hidePreloader = createLogic({
  type: /^SERVICES_(.*)_(.*)_(FULFILLED|REJECTED)$/,
  latest: true,
  process({ getState, action }, dispatch, next) {

    if (action.meta && action.meta.showPreloader) {
      console.log('Logic(hidePreloader)');
    }

    next(action);
  }
});

/**
|--------------------------------------------------
| Error Dialog
|--------------------------------------------------
*/

const errorAlert = createLogic({
  type: /^SERVICES_(.*)_(.*)_REJECTED$/,
  latest: true,
  process({ getState, action }, dispatch, next) {

    const { name, message } = action.payload;
    const meta = action.meta;
    if (meta && meta.errorAlert) {
      console.log('Logic(errorAlert)', meta.errorAlert);
      alert(message, name);
    }

    next(action);
  }
});


/**
|--------------------------------------------------
| Foo
|--------------------------------------------------
*/

const before = createLogic({
  type: /^BEFORE_PROCCESS_FEATHERS_PAYLOAD$/,
  latest: true,
  process({ getState, action }, dispatch, next) {

    const { name, message } = action.payload;
    const meta = action.meta;
    if (meta && meta.confirmDialog) {
      console.log('Logic(before)', meta.confirmDialog)
      confirm(meta.confirmDialog.message, meta.confirmDialog.title)
      dispatch(
        metalize(meta, action.payload.action)(...action.payload.args)
      );
    }

  }
});

/**
|--------------------------------------------------
| Foo
|--------------------------------------------------
*/

const redirectTo = createLogic({
  type: /^SERVICES_AUTHENTICATION_AUTHENTICATE_FULFILLED$/,
  latest: true,
  process({ getState, action }, dispatch, next) {

    const { name, message } = action.payload;
    const meta = action.meta;
    if (meta && meta.redirectTo) {
      console.log('Logic(redirectTo)', redirectTo)
    }

  }
});

/**
|--------------------------------------------------
| Export
|--------------------------------------------------
*/

export default [toast, backOnFinish, hidePreloader, showPreloader, errorAlert, before, redirectTo];