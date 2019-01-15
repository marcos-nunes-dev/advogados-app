import { createLogic } from 'redux-logic';
import swal from 'sweetalert';
import snackbar from 'node-snackbar';

/**
|--------------------------------------------------
| Error Dialog
|--------------------------------------------------
*/

const errorAlert = createLogic({
  type: /REJECTED$/,
  latest: true,
  process({ getState, action }, dispatch, next) {

    const { name, message, className, errors } = action.payload;
    console.log(action.payload)
    const meta = action.meta;
    if (meta && meta.errorAlert) { 
        if(message === "Invalid login" && className === "not-authenticated"){
          snackbar.show({text: "Login inválido!", actionText: 'Fechar'});
        }else if(className === "conflict"){
          snackbar.show({text: `${Object.keys(errors)}: ${Object.values(errors)} - Já existe!`, actionText: 'Fechar'});
        }else{
          snackbar.show({text: `${message}`, actionText: 'Fechar'});
        } 
    }

    next();
  }
});

export default errorAlert;
