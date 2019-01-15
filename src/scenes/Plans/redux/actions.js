import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
	selectPlan: ['planId']
},{
	prefix: 'PLANS_'
});

export { Types };
export default Creators;