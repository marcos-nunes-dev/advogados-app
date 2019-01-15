import { combineReducers } from 'redux';
import { reducers } from '../../feathers';
import { reducer as formReducer } from 'redux-form'

/**
|--------------------------------------------------
| Scenes Reducers
|--------------------------------------------------
*/

import { reducer as profileReducer } from '../../scenes/Profile';
import { reducer as servicesReducer } from '../../scenes/Services';
import { reducer as publicServicesReducer } from '../../scenes/PublicServices';
import { reducer as lawyerDrawerReducer } from '../../scenes/LawyerDrawer';
import { reducer as wizardReducer } from '../../scenes/Wizard';
import { reducer as searchReducer } from '../../scenes/Search';
import { reducer as plansReducer } from '../../scenes/Plans';

import preloaderReducer from './preloader/reducer';
import applicationReducer from './application/reducer';
import navigationHelperReducer from './navigation_helper/reducer';

export default combineReducers({
  application: applicationReducer,
  profile: profileReducer,
  services: servicesReducer,
  publicServices: publicServicesReducer,
  lawyerDrawer: lawyerDrawerReducer,
  wizard: wizardReducer,
  forms: formReducer,
  search: searchReducer,
  changePlan: plansReducer,
  preloader: preloaderReducer,
  navigationHelper: navigationHelperReducer,
  ...reducers
});
