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
			text: 'Código enviado para o seu email!'
		},
		errorAlert: true,
		showPreloader: true
	},
	reset: {
		toastOnFinish: {
			text: 'Senha resetada com sucesso!'
		},
		errorAlert: true,
		showPreloader: true,
		redirectOnFinish: '/signin'
	}
};

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const mapStateToProps = () => ({});

const mapDispatchToProps = {
	getToken: metalize(metas.save, services.authManagement.create),
	resetPassword: metalize(metas.reset, services.authManagement.create)
};

export default (component) =>
	connect(mapStateToProps, mapDispatchToProps)(component);
