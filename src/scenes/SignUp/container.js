import { connect } from 'preact-redux';
import { services } from '../../feathers';
import metalize from '../../helpers/metalize';
import get from 'lodash/get';
import before from '../../helpers/before';

/**
|--------------------------------------------------
| Metas
|--------------------------------------------------
*/

const metas = {
	register: {
		completeAuthentication: true,
		showPreloader: true,
		errorAlert: true,
		validation: true
	},
	authenticate: {
		showPreloader: true,
		redirectOnAuth: true,
		errorAlert: true,
		toastOnFinish: {
			text: 'Cadastro realizado com sucesso!',
			actionText: 'fechar'
		},
	}
}

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const mapStateToProps = ({forms}) => ({
	formData: get(forms, 'signup.values')
});

const mapDispatchToProps = {
	register: metalize(metas.register, before(services.users.create)),
	authenticate: metalize(metas.authenticate, services.authentication.authenticate)
};

export default (component) =>
	connect(mapStateToProps, mapDispatchToProps)(component);
