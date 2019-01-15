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

const {
  LawyerServices, Plans, LawyerProfile
} = LocalDB;

const mapStateToProps = ({ services, lawyerProfile }) => ({
  page: services,
  subscription: get(lawyerProfile.store, 'records[0].subscription'),
  services: LawyerServices.find({
    $populate: 'lawArea(LawAreas)',
    status: '1',
    $order: 'createdAt(desc)',
    $not: {
      'touches.lawyer': get(lawyerProfile.store, 'records[0]._id'),
    },
  }),
  inProgressServices: LawyerServices.find({
    $populate: 'lawArea(LawAreas)',
    $order: 'createdAt(desc)',
    'touches.lawyer': get(lawyerProfile.store, 'records[0]._id'),
  }),
  freePlanConfig: Plans.find({ flagTrial: true })[0],
  userData: LawyerProfile.first(),
});

const mapDispatchToProps = {
  handleFixedTabChange: actions.handleFixedTabChange,
  toggleDrawer: drawerActions.toggleDrawer,
};

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
