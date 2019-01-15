import { connect } from 'preact-redux';
import actions from './redux/actions';
import get from 'lodash/get';
import LocalDb from '../../feathers/local-database';
import metalize from '../../helpers/metalize';
import interceptor from '../../helpers/interceptor';
import { services } from '../../feathers';

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
	}
};

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const { LawAreas, Videos, Articles, Requests } = LocalDb;

const mapStateToProps = ({ application, profile, userProfile, lawyerProfile, searchLawyers}, {id}) => ({
	page:	profile,
	userData: application.userData,
	result: searchLawyers.queryResult,
	getLawArea: LawAreas.get(),
	getArticle: Articles.get(),
	requestsToReview: Requests.find({
		'touches.lawyer': id,
		'touches.reviewed': { $ne: true }
	})
});

const mapDispatchToProps = {
	getLawyer: services.searchLawyers.find,
	handleFixedTabChange: actions.handleFixedTabChange,
	patchDegree: metalize(metas.patchDegree, interceptor(services.lawyerProfile.patch))
};

export default (component) =>
	connect(mapStateToProps, mapDispatchToProps)(component);