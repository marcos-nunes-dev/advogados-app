import { connect } from 'preact-redux';
import LocalDB from '../../feathers/local-database';
import metalize from '../../helpers/metalize';
import { services } from '../../feathers';
import get from 'lodash/get';

/**
|--------------------------------------------------
| Metas
|--------------------------------------------------
*/

const metas = {
	update: {
		showPreloader: true,
		redirectOnFinish: '/profile'
	}
};

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const { LawAreas } = LocalDB;

const mapStateToProps = ({ lawyerProfile, forms }) => ({
	lawAreas: LawAreas.find({ $order: 'name(asc)' }),
	lawyerProfile: get(lawyerProfile.store, 'records[0]', {}),
	formData: get(forms, 'newQualification.values')
});

const mapDispatchToProps = {
	update: metalize(metas.update, services.lawyerProfile.patch)
};

export default (component) =>
	connect(mapStateToProps, mapDispatchToProps)(component);
