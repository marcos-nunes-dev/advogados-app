import omit from 'lodash/omit';

export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	}
	catch (error) {
		return undefined;
	}
};

export const saveState = (state, options) => {
	try {
		const serializedState = JSON.stringify(omit(state, options.omit));
		localStorage.setItem('state', serializedState);
	}
	catch (error) {
		// Ignore write errors
	}
};