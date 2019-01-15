import { connect } from 'preact-redux';
import actions from './redux/actions';
import { services } from '../../feathers';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
});

export default (component) =>
	connect(mapStateToProps, mapDispatchToProps)(component);
