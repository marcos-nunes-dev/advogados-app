import { connect } from 'preact-redux';
import LocalDb from '../../feathers/local-database';
import metalize from '../../helpers/metalize';
import { services } from '../../feathers';
import get from 'lodash/get';

const { LawAreas } = LocalDb;

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
	lawAreas: LawAreas.find({ $order: 'name(asc)' }),
	userProfile: get(userProfile.store, 'records[0]', {}),
	lawyerProfile: get(lawyerProfile.store, 'records[0]', {})
});

const mapDispatchToProps = {
	save: metalize(metas.save, services.lawyerProfile.patch)
};

export default (component) =>
	connect(mapStateToProps, mapDispatchToProps)(component);
