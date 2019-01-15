import { Provider } from 'preact-redux';
import ReactGA from 'react-ga';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import moment from 'moment';

import 'node-snackbar/dist/snackbar.css';
import 'antd/dist/antd.min.css';

import configureStore from './redux/store';

moment.locale('pt-br');

import { configureOfflineFirstRealtime, sync } from './feathers';
import Root from './Root';

import theme from './toolbox/theme';

import './style';
import './style/normalize';
import './style/icons';
import './toolbox/theme.css';

/**
|--------------------------------------------------
| Google Analytics
|--------------------------------------------------
*/
const trackingIDWeb = 'UA-120916784-2';
const trackingIDApp = 'UA-126551462-1';

ReactGA.initialize(window.cordova ? trackingIDApp : trackingIDWeb, {
  storage: 'none',
});
ReactGA.set({ checkProtocolTask: null });

window.ReactGA = ReactGA;

/**
|--------------------------------------------------
| Configure Redux Store
|--------------------------------------------------
*/

export const store = configureStore();

/**
|--------------------------------------------------
| Configure realtime & connect it to services
|--------------------------------------------------
*/

sync(store).then(authData => {
  configureOfflineFirstRealtime(store, authData);
});

/**
|--------------------------------------------------
| Render Root Component
|--------------------------------------------------
*/

const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Root />
    </Provider>
  </ThemeProvider>
);

export default App;
