import { connect } from 'preact-redux';
import get from 'lodash/get';

import actions from './redux/actions';
import drawerActions from '../LawyerDrawer/redux/actions';
import LocalDB from '../../feathers/local-database';

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const { LawyerServices } = LocalDB;

const mapStateToProps = ({ services }) => ({
  page: services,
  services: LawyerServices.find({
    $populate: 'lawArea(LawAreas)',
    status: '1',
    $order: 'createdAt(desc)'
  })
});

const mapDispatchToProps = {
  handleFixedTabChange: actions.handleFixedTabChange,
  toggleDrawer: drawerActions.toggleDrawer,
};

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
