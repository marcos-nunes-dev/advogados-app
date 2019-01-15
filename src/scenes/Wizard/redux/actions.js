import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
	setStep: ['value'],
	backStep: null,
	selectPlan: ['planId', 'payload']
},{
	prefix: 'WIZARD_'
});

export { Types };
export default Creators;