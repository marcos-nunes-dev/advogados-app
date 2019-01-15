import { createLogic } from 'redux-logic';
import snackbar from 'node-snackbar';
import { route } from 'preact-router';
import LocalDB from '../../feathers/local-database';
const { Orders } = LocalDB;

/**
|--------------------------------------------------
| Redirect On Finish
|--------------------------------------------------
*/

const syncSnapshot = createLogic({
  type: 'SERVICES_ORDERS_ON_PATCHED',
  latest: true,
  process: ({ getState, action }, dispatch, next) => {

    const { data } = action.payload.data;
    const order = Orders.get()(data._id);

    const defaultConfig = {
      actionText: 'VER',
      pos: 'top-center',
      onActionClick: (element) => {
        element.style.opacity = 0;
        setTimeout(() => {
          route(`/orders/${data._id}`);
        });
      }
    };

    if (order.status !== data.status ) {
      switch (data.status) {
        case 4:
          snackbar.show({ text: 'Seu pedido está sendo preparado!', ...defaultConfig});
          break;
        case 8:
          snackbar.show({ text: 'Seu pedido saiu para entrega!', ...defaultConfig });
          break;
        default:
          break;
      }
    }

    next(action);
  }
});

export default syncSnapshot;