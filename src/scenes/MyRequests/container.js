import { connect } from 'preact-redux';
import actions from './redux/actions';
import drawerActions from '../LawyerDrawer/redux/actions';
import LocalDB from '../../feathers/local-database';

const { Requests, Chat } = LocalDB;

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const mapStateToProps = ({ services, userProfile }) => ({
  page: services,
  requests: Requests.find(),
});

const mapDispatchToProps = {
  handleFixedTabChange: actions.handleFixedTabChange,
  toggleDrawer: drawerActions.toggleDrawer,
};

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
