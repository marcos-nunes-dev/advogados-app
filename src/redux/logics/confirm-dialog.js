import { createLogic } from 'redux-logic';
import metalize from '../../helpers/metalize';
import swal from 'sweetalert';


/**
|--------------------------------------------------
| confirm
|--------------------------------------------------
*/

const confirmDialog = createLogic({
  type: /^BEFORE_PROCCESS_FEATHERS_ACTION$/,
  latest: true,
  process({ getState, action }, dispatch, next) {

    const { name, message } = action.payload;
    const meta = action.meta;

    const continueAction = () => {
      dispatch(
        metalize(meta, action.payload.action)(...action.payload.args)
      );
      next();
    }

    if (!meta || !meta.confirmDialog) {
      return continueAction();
    }

    const dialog = {
      title: "Tem certeza?",
      text: "Uma vez deletado, você não será mais capaz de recuperar a informação.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    };

    swal(dialog)
      .then(confirmed => confirmed ? continueAction() : next());

  }
});

export default confirmDialog;