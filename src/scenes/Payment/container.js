import { connect } from 'preact-redux';
import get from 'lodash/get';
import LocalDb from '../../feathers/local-database';
import metalize from '../../helpers/metalize';
import interceptor from '../../helpers/interceptor';
import { services } from '../../feathers';

const { Plans } = LocalDb;

/**
|--------------------------------------------------
| Metas
|--------------------------------------------------
*/

const metas = {
  patchDegree: {
    confirmDialog: true,
  },
  errorAlert: true,
  validation: true,
};

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const mapStateToProps = ({ forms, application, lawyerProfile }) => ({
  form: forms.chagePaymentMetod,
  userData: application.userData,
  lawyerProfile: get(lawyerProfile, 'store.records[0]', {}),
  freePlanConfig: Plans.find({ flagTrial: true })[0],
  goldPlanConfig: Plans.find().find(plan => !plan.flagTrial),
});

const mapDispatchToProps = {
  patch: services.lawyers.patch,
};

export default component => connect(mapStateToProps, mapDispatchToProps)(component);
