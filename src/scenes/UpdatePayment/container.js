import { connect } from 'preact-redux';
import get from 'lodash/get';
import LocalDb from '../../feathers/local-database';
import metalize from '../../helpers/metalize';
import interceptor from '../../helpers/interceptor';
import { services } from '../../feathers';

/**
|--------------------------------------------------
| Metas
|--------------------------------------------------
*/

const metas = {
  patch: {
    showPreloader: true,
    errorAlert: true,
    backOnFinish: true
  }
};

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const mapStateToProps = ({ forms, application, lawyerProfile }, ownProps) => ({
  form: forms.chagePaymentMetod,
  userData: application.userData,
  lawyer: get(lawyerProfile, 'store.records[0]')
});

const mapDispatchToProps = {
  patch: metalize(metas.patch,  services.changeCreditCard.patch),
};

export default (component) =>
  connect(mapStateToProps, mapDispatchToProps)(component);
