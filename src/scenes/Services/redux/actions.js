import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
	handleFixedTabChange: ['index'],
}, { prefix: 'AKFLA_'});

export { Types };
export default Creators;