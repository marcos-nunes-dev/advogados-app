import { connect } from 'preact-redux';
import LocalDB from '../../feathers/local-database';
import searchActions from '../Search/redux/actions';

const { LawAreas } = LocalDB;



/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const mapStateToProps = () => ({
	lawAreas: LawAreas.find({ $order: 'name(asc)' })
});

const mapDispatchToProps = {
	setArea: searchActions.setArea
};

export default (component) =>
	connect(mapStateToProps, mapDispatchToProps)(component);
