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
			text: 'Vídeo deletado com sucesso!',
			actionText: 'fechar'
		},
		confirmDialog: {
		  title: 'Delete Vídeo',
		  message: 'Deseja realmente deletar?'
		}
	},
	article: {
		errorAlert: true,
		showPreloader: true,
		toastOnFinish: {
			text: 'Artigo deletado com sucesso!',
			actionText: 'fechar'
		},
		confirmDialog: {
		  title: 'Delete Artigo',
		  message: 'Deseja realmente deletar?'
		}
	},
	editLawyer: {
		showPreloader: true,
		redirectOnFinish: '/profile'
	},
	authenticate:{
		showPreloader: true,
		toastOnFinish: {
			text: 'LinkedIn vinculado com sucesso!',
			actionText: 'fechar'
		}
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
	lawyerProfile: get(lawyerProfile.store, 'records[0]'),
	getLawArea: LawAreas.get(),
	videos: Videos.find(),
	articles: Articles.find()
});

const mapDispatchToProps = {
	handleFixedTabChange: actions.handleFixedTabChange,
	patchDegree: metalize(metas.patchDegree, interceptor(services.lawyerProfile.patch)),
	removeVideo: metalize(metas.videos, interceptor(services.videos.remove)),
	removeArticle: metalize(metas.articles, interceptor(services.articles.remove)),
	editLawyer: metalize(metas.editLawyer, services.lawyerProfile.patch),
	editUser: metalize(metas.editLawyer, services.userProfile.patch),
	authenticate: metalize(metas.authenticate, services.authentication.authenticate)
};

export default (component) =>
	connect(mapStateToProps, mapDispatchToProps)(component);