import { connect } from 'preact-redux';
import { services } from '../../feathers';
import get from 'lodash/get';
import LocalDB from '../../feathers/local-database';
import metalize from '../../helpers/metalize';

/**
|--------------------------------------------------
| Metas
|--------------------------------------------------
*/

const metas = {
	save: {
		showPreloader: true,
		redirectOnFinish: '/requests'
	}
}

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const { LawAreas } = LocalDB;

const mapStateToProps = (state) => ({
	isUserSignedIn: state.authentication.isSignedIn,
	lawAreas: LawAreas.find({ $order: 'name(asc)' }),
	selectedArea: get(state, 'search.area.id') || get(state, 'search.area._id'),
});

const mapDispatchToProps = {
	save: metalize(metas.save, services.requests.create)
};

export default (component) =>
	connect(mapStateToProps, mapDispatchToProps)(component);
