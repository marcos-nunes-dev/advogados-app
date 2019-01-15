import { connect } from 'preact-redux';
import { services } from '../../feathers';
import get from 'lodash/get';
import LocalDb from '../../feathers/local-database';
import metalize from '../../helpers/metalize';

const { Cities } = LocalDb;

/**
|--------------------------------------------------
| Metas
|--------------------------------------------------
*/

const metas = {
	patch: {
		showPreloader: true,
		backOnFinish: true
	}
}

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const mapStateToProps = ({ application, forms, userProfile, lawyerProfile}) => ({
	userData: application.userData,
	userProfile: get(userProfile.store, 'records[0]'),
	lawyerProfile: get(lawyerProfile.store, 'records[0]'),
	formData: get(forms, 'editInfos.values', {}),
	cities: Cities.find()
});

const mapDispatchToProps = {
	patch: metalize(metas.patch, services.users.patch)
};

export default (component) =>
	connect(mapStateToProps, mapDispatchToProps)(component);
