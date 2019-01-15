import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
	reset: null,
});

export { Types };
export default Creators;