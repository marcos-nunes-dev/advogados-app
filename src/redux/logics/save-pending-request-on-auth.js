import { createLogic } from 'redux-logic';
import metalize from '../../helpers/metalize';



const savePendingRequestOnAuth = createLogic({
    type: /SET_USER/,
    latest: true,
    process({ action }, dispatch, next) {
        const { payload } = action;

        console.log('SET_USER', payload)

        if (payload.isVerified && window.PENDING_NEW_REQUEST) {
            const action = metalize({ showPreloader: true, redirectOnFinish: '/search' }, services.requests.create);
            dispatch(action({ ...window.PENDING_NEW_REQUEST }));

        }

        next();
    }
});


const onSavePendingRequest = createLogic({
    type: /SERVICES_REQUESTS_CREATE_FULFILLED/,
    latest: true,
    process(action, dispatch, next) {
        console.log('services done', action);
        window.PENDING_NEW_REQUEST = null;
        next();
    }
});


export default [savePendingRequestOnAuth, onSavePendingRequest];
