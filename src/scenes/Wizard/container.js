import { connect } from 'preact-redux';
import actions from './redux/actions';
import { services } from '../../feathers';
import LocalDb from '../../feathers/local-database';
import metalize from '../../helpers/metalize';
import intercept from '../../helpers/interceptor';

const { Cities, Plans, LawAreas } = LocalDb;

/**
|--------------------------------------------------
| Metas
|--------------------------------------------------
*/

const metas = {
  register: {
    completeAuthentication: true,
    goToTutorial: true,
    showPreloader: true,
    errorAlert: true,
    toastOnFinish: {
      text: 'Cadastro realizado com sucesso!',
      actionText: 'fechar',
    },
  },
};

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const mapStateToProps = ({ wizard }) => ({
  state: wizard,
  cities: Cities.find(),
  plans: Plans.find(),
  lawAreas: LawAreas.find({ $order: 'name(asc)' }),
  freePlanConfig: Plans.find({ flagTrial: true })[0],
});

const mapDispatchToProps = {
  setStep: actions.setStep,
  selectPlan: actions.selectPlan,
  register: metalize(metas.register, intercept(services.lawyers.create)),
};

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
