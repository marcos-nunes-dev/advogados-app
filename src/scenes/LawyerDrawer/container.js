import { connect } from 'preact-redux';
import { services, socketClient, restClient } from '../../feathers';
import actions from './redux/actions';
import get from 'lodash/get';

window.services = services;
window.socketClient = socketClient;
window.restClient = restClient;

const mapStateToProps = ({ lawyerDrawer, userProfile, lawyerProfile, application}) => ({
	state: lawyerDrawer,
	userProfile: get(userProfile.store, 'records[0]'),
	lawyerProfile: get(lawyerProfile.store, 'records[0]'),
	userData: application.userData
});

const mapDispatchToProps =  {
	toggleDrawer: actions.toggleDrawer,
	logout: services.authentication.logout
};

export default (component) =>
	connect(mapStateToProps, mapDispatchToProps)(component);