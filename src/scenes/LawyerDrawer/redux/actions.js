import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
	toggleDrawer: null,
}, {prefix: 'USER_DRAWER_'});

export { Types };
export default Creators;
window.lawyerActions = Creators;