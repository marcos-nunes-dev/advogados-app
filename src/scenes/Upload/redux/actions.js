import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
	accept: ['index']
});

export { Types };
export default Creators;