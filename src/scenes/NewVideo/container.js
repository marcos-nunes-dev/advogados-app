import { connect } from 'preact-redux';
import metalize from '../../helpers/metalize';
import intercept from '../../helpers/interceptor';
import { get } from 'lodash';
import { services } from '../../feathers';
import LocalDB from '../../feathers/local-database';

const { Videos } = LocalDB;

/**
|--------------------------------------------------
| Configure Metas
|--------------------------------------------------
*/

const metas = {
	create: {
		showPreloader: true,
		toastOnFinish: {
			text: 'Video inserido com sucesso!',
			actionText: 'fechar'
		},
		errorAlert: true,
		redirectOnFinish: '/profile'
	},
	patch: {
	    showPreloader: true,
		errorAlert: true,
		toastOnFinish: {
			text: 'Video modificado com sucesso!',
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
	form: get(forms.videoForm, 'values', []),
		lawyerProfile: get(lawyerProfile.store, 'records[0]._id'),
		getVideo: Videos.get(),
	...ownProps
});

/**
|--------------------------------------------------
| Configure Dispatch
|--------------------------------------------------
*/

const mapDispatchToProps = {
	create: metalize(metas.create, services.videos.create),
    patch: metalize(metas.patch, services.videos.patch)
};

export default (component) =>
	connect(mapStateToProps, mapDispatchToProps)(component);
