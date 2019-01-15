import { createLogic } from 'redux-logic';
import { route } from 'preact-router';
import templateSettings from 'lodash/templateSettings';
import template from 'lodash/template';

templateSettings.interpolate = /{([\s\S]+?)}/g;

/**
|--------------------------------------------------
| Redirect On Finish
|--------------------------------------------------
*/

const redirectOnFinish = createLogic({
  type: /FULFILLED$/,
  latest: true,
  process: ({ getState, action }, dispatch, next) => {

    const { name, message } = action.payload;
    const meta = action.meta;
    if (meta && meta.redirectOnFinish) {
      const compiled = template(meta.redirectOnFinish);
      route(compiled(action.payload));
    }

    next();
  }
});

export default redirectOnFinish;