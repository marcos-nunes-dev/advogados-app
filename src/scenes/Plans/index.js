/* global window history */
/* eslint-disable-next-line */
import { h, Component } from 'preact';
import styled from 'styled-components';
import { route } from 'preact-router';
import { connect } from 'preact-redux';
import axios from 'axios';
import snackbar from 'node-snackbar';
import currency from 'currency-formatter';
import get from 'lodash/get';
import actions from './redux/actions';
import reducer from './redux/reducer';
import metalize from '../../helpers/metalize';
import ItemPlans from './components/itemPlans';
import { Dialog } from '../../toolbox/components';
import { Scene } from '../../components';
import { services, restClient } from '../../feathers';
import LocalDb from '../../feathers/local-database';
import Form from './form';

const { Plans } = LocalDb;
window.LDB = LocalDb;

/**
|--------------------------------------------------
| Metas
|--------------------------------------------------
*/

const metas = {
  patch: {
    showPreloader: true,
    errorAlert: true,
    backOnFinish: true,
  },
};

const mapStateToProps = ({
  application, forms, lawyerProfile, changePlan,
}) => ({
  state: changePlan,
  plans: Plans.find(),
  form: forms.chagePaymentMetod,
  lawyerProfile: get(lawyerProfile, 'store.records["0"]'),
  userData: application.userData,
  subscription: get(lawyerProfile, 'store.records["0"].subscription'),
  id: get(lawyerProfile, 'store.records["0"]._id'),
});

const mapDispatchToProps = {
  selectPlan: actions.selectPlan,
  patch: metalize(metas.patch, services.changeCreditCard.patch),
};

const container = component => connect(mapStateToProps, mapDispatchToProps)(component);

/**
|--------------------------------------------------
| Title
|--------------------------------------------------
*/

const Container = styled.div`
  background-color: #f5f5f5;
  height: ${window.innerHeight - 55}px;
  padding: 20px;
  overflow-y: scroll;
`;

const Title = styled.div`
  text-align: center;
  color: #5c6bc0;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Subtitle = styled.div`
  text-align: center;
  color: #5c6bc0;
  font-size: 16px;
  padding: 0 30px;
  margin-bottom: 30px;
`;

/**
|--------------------------------------------------
| Step 1
|--------------------------------------------------
*/

const CloseIcon = styled.i`
  position: absolute;
  font-size: 30px !important;
  left: 10px;
  top: 10px;
`;

const Button = styled.div`
  text-align: center;
  background-color: #7e57c2;
  text-align: center;
  height: 55px;
  width: 100%;
  bottom: 0;
  color: white;
  line-height: 55px;
  cursor: pointer;
  margin-top: 5px;
`;

class PlansSelect extends Component {
  state = {
    active: false,
    selectedPlan: null,
    lawyerProfile: this.props.userData,
  };

  componentDidMount() {
    setTimeout(() => {
      const { subscription } = this.props;

      if (subscription && get(subscription, 'code')) {
        this.setState({ selectedPlan: get(subscription, 'code') });
      }
    }, 500);
  }

  handleToggle = touch => () => {
    if (!touch || (touch && (touch.status === '1' || touch.status === '2'))) {
      this.setState({ active: !this.state.active });
    }
  };

  closeModal = () => {
    this.setState({ active: false });
  };

  suspend = () => {
    const { code } = this.props.subscription;

    const data = {
      costumerCode: code,
      _id: this.props.id,
    };

    axios({
      method: 'patch',
      url: 'https://mysterious-oasis-88871.herokuapp.com/suspend',
      data,
    })
      .then(() => {})
      .catch(() => {});
  };

  active = () => {
    const data = {
      costumerCode: '3c826ec0-35d4-11e8-a38d-a78badbcfffe',
      _id: this.props.id,
    };

    axios({
      method: 'patch',
      url: 'https://mysterious-oasis-88871.herokuapp.com/active',
      data,
    })
      .then(() => {})
      .catch(() => {});
  };

  selectPlan = id => () => {
    this.setState({ selectedPlan: id });
  };

  removePlan = data => {
    const changePlan = restClient.service('/change-plan');
    const { subscription } = this.props;
    changePlan
      .remove(subscription.subscriptionCode, { query: { lawyer: data.lawyerProfile.lawyer } })
      .then(() => {
        route('/home');
        snackbar.show({
          text: 'Assinatura removido com sucesso!',
          actionText: 'fechar',
          textColor: '#ffffff',
        });
      })
      .catch(err => {
        snackbar.show({
          text: err.message,
          actionText: 'fechar',
          textColor: '#ffffff',
        });
      });
  };

  changePlan = data => {
    const { subscription } = this.props;
    const changePlan = restClient.service('/change-plan');

    if (subscription && subscription.code) {
      changePlan
        .patch(subscription.subscriptionCode, { code: data.selectedPlan })
        .then(() => {
          route('/home');
          snackbar.show({
            text: 'Plano selecionado com sucesso!',
            actionText: 'fechar',
            textColor: '#ffffff',
          });
        })
        .catch(err => {
          snackbar.show({
            text: err.message,
            actionText: 'fechar',
            textColor: '#ffffff',
          });
        });
    } else {
      changePlan
        .create({
          code: data.selectedPlan,
          lawyerProfile: data.lawyerProfile,
          card: data.card,
          _cupom: this.state.cupom,
        })
        .then(() => {
          route('/home');
          snackbar.show({
            text: 'Plano selecionado com sucesso!',
            actionText: 'fechar',
            textColor: '#ffffff',
          });
        })
        .catch(err => {
          snackbar.show({
            text: err.message,
            actionText: 'fechar',
            textColor: '#ffffff',
          });
        });
    }
  };

  searchCoupon(code) {
    const results = Plans.find({ 'coupons.identifier': code });

    const [plan] = results;
    if (!plan) {
      alert('Cupom não existe');
    }

    const cupom = plan.coupons.find(c => c.identifier === code);

    this.setState({ cupom });
  }

  render({
    userData, plans, subscription, form, patch,
  }) {
    return (
      <Scene sync private style={{ height: '100%' }}>
        <Container style={{ height: '100%' }}>
          <div style={{ maxWidth: 500, margin: 'auto' }}>
            <CloseIcon className="material-icons" onClick={() => history.back()}>
              arrow_back
            </CloseIcon>
            <Title>Plano</Title>
            <Subtitle>Selecione o Plano Pago</Subtitle>

            <div style={{ margin: 'auto' }}>
              <Dialog
                active={this.state.active}
                onEscKeyDown={this.closeModal}
                onOverlayClick={this.closeModal}
                title="Alterar status do atendimento"
              />
              <If condition={plans.length && !this.state.selectedPlan}>
                {this.selectPlan(plans[0]._id)()}
              </If>
              {plans.map(plan => (
                <div>
                  <If condition={!plan.flagTrial}>
                    <ItemPlans
                      active={this.state.selectedPlan === plan._id}
                      key={plan._id}
                      title={plan.name}
                      price={`${plan.amount / 100}`}
                      atendimento={plan.rules.maxMonthlyServices}
                      artigos={plan.rules.maxArticles}
                      videos={plan.rules.maxVideos}
                      atuacao={plan.rules.maxAreas}
                      onClick={this.selectPlan(plan._id)}
                    />
                  </If>
                </div>
              ))}

              <div style={{ marginTop: 20 }}>
                <Form userData={userData} patch={patch} form={form} subscription={subscription} />
              </div>

              {plans.map(plan => (
                <div style={{ marginTop: 20 }}>
                  <If condition={plan.flagTrial}>
                    <ItemPlans
                      active={this.state.selectedPlan === plan._id}
                      key={plan._id}
                      title={plan.name}
                      price={`${plan.amount / 100}`}
                      atendimento={plan.rules.maxMonthlyServices}
                      artigos={plan.rules.maxArticles}
                      videos={plan.rules.maxVideos}
                      atuacao={plan.rules.maxAreas}
                      onClick={this.selectPlan(plan._id)}
                    />
                  </If>
                </div>
              ))}
              <If condition={this.state.cupom}>
                <div style={{ marginTop: 20 }}>
                  <div>
                    Cupom:
                    {this.state.cupom.identifier}
                  </div>
                  <div>{this.state.cupom.description}</div>
                  <div>
                    Valor Promocional:
                    <span style={{ fontWeight: '700' }}>
                      {currency.format(this.state.cupom.amount / 100, { code: 'BRL' })}
                    </span>
                  </div>
                  <button
                    type="button"
                    style={{
                      marginTop: 5,
                      background: '#7d57c2',
                      color: '#fff',
                      width: '100%',
                      lineHeight: '36px',
                      border: '1px solid #53358a',
                    }}
                    onClick={() => this.setState({ cupom: null })}
                  >
                    REMOVER CUPOM
                  </button>
                </div>
              </If>
              <If condition={!this.state.cupom}>
                <div style={{ marginTop: 20 }}>
                  <span>Tem cupom?</span>
                  <input
                    style={{
                      width: '100%',
                      lineHeight: '32px',
                      textAlign: 'center',
                      color: '#444444',
                    }}
                    placeholder="Inserir o código do cupom"
                    type="text"
                    value={this.state.cupomText}
                    onChange={({ target }) => this.setState({ cupomText: target.value })}
                  />
                  <button
                    type="button"
                    style={{
                      marginTop: 5,
                      background: '#7d57c2',
                      color: '#fff',
                      width: '100%',
                      lineHeight: '36px',
                      border: '1px solid #53358a',
                    }}
                    onClick={() => this.searchCoupon(this.state.cupomText)}
                  >
                    Aplicar Cupom
                  </button>
                </div>
              </If>
              <Button onClick={() => this.changePlan(Object.assign(this.state, form.values))}>
                Selecionar plano
              </Button>
              <If condition={subscription && subscription.code}>
                <Button
                  style={{ backgroundColor: 'red' }}
                  onClick={() => this.removePlan(Object.assign(this.state, subscription))}
                >
                  Remover assinatura
                </Button>
              </If>
            </div>
          </div>
        </Container>
      </Scene>
    );
  }
}
export default container(PlansSelect);
export { reducer };
