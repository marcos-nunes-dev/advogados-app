import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
	handleFixedTabChange: ['index'],
}, { prefix: 'PUBLIC_SERVICES_'});

export { Types };
export default Creators;