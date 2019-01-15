import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
	setLocation: ['payload'],
	setArea: ['payload'],
	setLoading: ['payload'],
},{
	prefix: 'SEARCH_'
});

export { Types };
export default Creators;