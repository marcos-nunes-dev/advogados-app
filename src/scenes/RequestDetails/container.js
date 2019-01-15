import { connect } from 'preact-redux';
import LocalDB from '../../feathers/local-database';
import { services } from '../../feathers';
import metalize from '../../helpers/metalize';


/**
|--------------------------------------------------
| Metas
|--------------------------------------------------
*/

const metas = {
	patch: {
		showPreloader: true
	}
};

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const { Requests } = LocalDB;

const mapStateToProps = ({ lawyers }, {id}) => ({
	request: Requests.get({
		$populate: 'lawArea(LawAreas)'
	})(id),
	result: lawyers.queryResult,
});

const mapDispatchToProps = {
	getLawyer: services.lawyers.find,
	patch: metalize(metas.patch, services.requests.patch)
};

export default (component) =>
	connect(mapStateToProps, mapDispatchToProps)(component);
