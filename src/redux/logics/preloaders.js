import { createLogic } from 'redux-logic';
import actions from '../reducers/preloader/actions';

/**
|--------------------------------------------------
| Show/Hide Preloader
|--------------------------------------------------
*/

const showPreloader = createLogic({
  type: /^SERVICES_([A-Z]*)_([A-Z]*)\b/,
  latest: true,
  process({ getState, action }, dispatch, next) {

    if (action.meta && action.meta.showPreloader) {
      dispatch(actions.showPreloader());
    }

    next(action);
  }
});

const hidePreloader = createLogic({
  type: /^SERVICES_(.*)_(.*)_(FULFILLED|REJECTED)$/,
  latest: true,
  process({ getState, action }, dispatch, next) {

    if (action.meta && action.meta.showPreloader) {
      dispatch(actions.hidePreloader());
    }

    next(action);
  }
});

export { showPreloader, hidePreloader };
