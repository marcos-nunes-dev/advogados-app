import { createLogic } from 'redux-logic';
import metalize from '../../helpers/metalize';
import swal from 'sweetalert';
import snackbar from 'node-snackbar';


const validation = createLogic({
  type: /^BEFORE_PROCCESS_FEATHERS_PAYLOAD$/,
  latest: true,
  process({ getState, action }, dispatch, next) {

    const { name, message, args } = action.payload;
    const meta = action.meta;
    const form = args[0];
    const validator = args[1];

    const continueAction = () => {
      dispatch(
        metalize(meta, action.payload.action)(...action.payload.args)
      );
      next();
    }
    
    if ( !form ) {
      snackbar.show({text: `Informe todos os dados!`, actionText: 'Fechar'});
      return next();
    }

    var prossig = true;

    Object.keys(validator).forEach(key => { 
      

        if(validator[key].required && validator[key].required.message !== ""){  
          if (!form.hasOwnProperty(key)) {
            snackbar.show({text: `${validator[key].required.message}`, actionText: 'Fechar'});
            prossig = false; 
          }
        }
        
        if(validator[key].email && validator[key].email.message){  
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form[key])) {
            snackbar.show({text: `${validator[key].email.message}`, actionText: 'Fechar'}); 
            prossig = false; 
          }
        }

        if(validator[key].equals && validator[key].equals.message && validator[key].equals.field){  
          if (form[key] !== form[validator[key].equals.field]) {
            snackbar.show({text: `${validator[key].equals.message}`, actionText: 'Fechar'}); 
            prossig = false; 
          }
        }
        
    })


    if(prossig){
      continueAction();
    }
    
  }
  
});

export default validation;
