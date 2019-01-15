import { connect } from 'preact-redux';

const mapStateToProps = ({application, authentication}) => ({
	application, authentication
});

const mapDispatchToProps = (dispatch) => ({});

export default (component) =>
	connect(mapStateToProps, mapDispatchToProps)(component);
