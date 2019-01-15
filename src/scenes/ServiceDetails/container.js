import { connect } from 'preact-redux';
import get from 'lodash/get';
import { services } from '../../feathers';
import LocalDB from '../../feathers/local-database';

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const { LawyerServices } = LocalDB;

const mapStateToProps = ({ lawyerProfile }, { id }) => ({
  request: LawyerServices.get({
    $populate: 'lawArea(LawAreas)',
    $order: 'createdAt(desc)',
  })(id),
  lawyerProfile: get(lawyerProfile.store, 'records[0]'),
  subscription: get(lawyerProfile.store, 'records[0].subscription'),
});

const mapDispatchToProps = {
  patch: services.lawyerServices.patch,
  update: services.lawyerServices.update,
};

export default component => connect(mapStateToProps, mapDispatchToProps)(component);
