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
		toastOnFinish: {
			text: 'Senha alterada com sucesso!',
			actionText: 'fechar'
		},
		errorAlert: true,
		showPreloader: true,
		redirectOnFinish: '/home'
	}
};

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const mapStateToProps = ({ userProfile, lawyerProfile}) => ({
	userProfile: get(userProfile.store, 'records[0]')
});

const mapDispatchToProps = {
	save: metalize(metas.save, services.authManagement.create)
};

export default (component) =>
	connect(mapStateToProps, mapDispatchToProps)(component);
