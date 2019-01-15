import { connect } from 'preact-redux';
import get from 'lodash/get';
import drawerActions from '../LawyerDrawer/redux/actions';
import searchActions from '../Search/redux/actions';
import LocalDB from '../../feathers/local-database';
import { services } from '../../feathers';

const { LawAreas } = LocalDB;

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const mapStateToProps = ({ lawyerProfile }) => ({
  lawAreas: LawAreas.find({ $order: 'name(asc)' }),
  subscription: get(lawyerProfile.store, 'records[0].subscription'),
});

const mapDispatchToProps = {
  toggleDrawer: drawerActions.toggleDrawer,
  setArea: searchActions.setArea,
  patchArea: services.lawAreas.patch,
};

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
