import { createLogic } from 'redux-logic';

/**
|--------------------------------------------------
| Back On Finish
|--------------------------------------------------
*/

const backOnFinish = createLogic({
  type: /FULFILLED$/,
  latest: true,
  process({ getState, action }, dispatch, next) {

    const meta = action.meta;
    if (meta && meta.backOnFinish) {
      history.back();
    }

    next(action);
  }
});

export default backOnFinish;