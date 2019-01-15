import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
	handleFixedTabChange: ['index'],
});

export { Types };
export default Creators;