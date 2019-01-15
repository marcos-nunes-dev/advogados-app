import { createLogic } from 'redux-logic';
import snackbar from 'node-snackbar';

/**
|--------------------------------------------------
| Toast
|--------------------------------------------------
*/

const toastOnFinish = createLogic({
  type: /FULFILLED$/,
  latest: true,
  process({ getState, action }, dispatch, next) {

    const meta = action.meta;
    if (meta && meta.toastOnFinish) {
      snackbar.show(meta.toastOnFinish);
    }

    next(action);
  }
});

export default toastOnFinish;