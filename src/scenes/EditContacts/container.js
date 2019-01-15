import { connect } from 'preact-redux';
import metalize from '../../helpers/metalize';
import { services } from '../../feathers';
import get from 'lodash/get';

/**
|--------------------------------------------------
| Metas
|--------------------------------------------------
*/

const metas = {
	save: {
		showPreloader: true,
		redirectOnFinish: '/profile'
	}
};

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const mapStateToProps = ({ userProfile, lawyerProfile}) => ({
	lawyerProfile: get(lawyerProfile.store, 'records[0]', {})
});

const mapDispatchToProps = {
	save: metalize(metas.save, services.lawyerProfile.patch)
};

export default (component) =>
	connect(mapStateToProps, mapDispatchToProps)(component);
