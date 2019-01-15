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

const redirectOnAuth = createLogic({
  type: 'SERVICES_AUTHENTICATION_AUTHENTICATE_FULFILLED',
  latest: true,
  process: ({ getState, action }, dispatch, next) => {

    const { lawyer } = action.payload;
    const meta = action.meta;
    if (meta && meta.redirectOnAuth) {

      if (lawyer) {
        route('/services');  
      } else {
        const nextRoute = getState().navigationHelper.routeOnAuth;
        route(nextRoute);
      }
      
    }

    next();
  }
});

export default redirectOnAuth;