import { connect } from 'preact-redux';
import metalize from '../../helpers/metalize';
import intercept from '../../helpers/interceptor';
import { get } from 'lodash';
import { services } from '../../feathers';
import LocalDB from '../../feathers/local-database';

const { Articles } = LocalDB;

/**
|--------------------------------------------------
| Configure Metas
|--------------------------------------------------
*/

const metas = {
	patch: {
	    showPreloader: true,
		errorAlert: true,
		toastOnFinish: {
			text: 'Artigo modificado com sucesso!',
			actionText: 'fechar'
		},
		redirectOnFinish: '/profile'
	}
};

/**
|--------------------------------------------------
| Configure Props
|--------------------------------------------------
*/

const mapStateToProps = ({ forms, lawyerProfile }, ownProps) => ({
	...ownProps
});

/**
|--------------------------------------------------
| Configure Dispatch
|--------------------------------------------------
*/

const mapDispatchToProps = {
    patch: metalize(metas.patch, services.articles.patch)
};
export default (component) =>
	connect(mapStateToProps, mapDispatchToProps)(component);
