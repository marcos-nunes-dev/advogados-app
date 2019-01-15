import { connect } from 'preact-redux';
import actions from './redux/actions';
import get from 'lodash/get';
import LocalDb from '../../feathers/local-database';
import metalize from '../../helpers/metalize';
import interceptor from '../../helpers/interceptor';
import { services } from '../../feathers';

const { LawAreas, Videos, Articles } = LocalDb;

/**
|--------------------------------------------------
| Metas
|--------------------------------------------------
*/

const metas = {
	patchDegree: {
		confirmDialog: true
	},
	videos: {
		errorAlert: true,
		showPreloader: true,
		toastOnFinish: {
			text: 'Grupo de produto deletado com sucesso!',
			actionText: 'fechar'
		},
		confirmDialog: {
		  title: 'Delete Plano',
		  message: 'Deseja realmente deletar?'
		}
	},
	article: {
		errorAlert: true,
		showPreloader: true,
		toastOnFinish: {
			text: 'Grupo de produto deletado com sucesso!',
			actionText: 'fechar'
		},
		confirmDialog: {
		  title: 'Delete Plano',
		  message: 'Deseja realmente deletar?'
		}
	},
	editLawyer: {
		showPreloader: true,
		redirectOnFinish: '/profileuser'
	}
};

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const mapStateToProps = ({application, profile, userProfile, lawyerProfile}) => ({
	page: profile,
	userData: application.userData,
	userProfile: get(userProfile.store, 'records[0]'),
	videos: Videos.find(),
	articles: Articles.find()
});

const mapDispatchToProps = {
	handleFixedTabChange: actions.handleFixedTabChange,
	patchDegree: metalize(metas.patchDegree, interceptor(services.lawyerProfile.patch)),
	removeVideo: metalize(metas.videos, interceptor(services.videos.remove)),
	removeArticle: metalize(metas.articles, interceptor(services.articles.remove)),
	editUser: metalize(metas.editLawyer, services.users.patch)
};

export default (component) =>
	connect(mapStateToProps, mapDispatchToProps)(component);