import { h } from 'preact';
import styled from 'styled-components';
import { route } from 'preact-router';
import Footer from '../components/Footer';
import PlanItem from '../components/PlanItem';
import { connect } from 'preact-redux';
import actions from '../redux/actions';

const mapStateToProps = ({ wizard }) => ({
  state: wizard
});

const mapDispatchToProps = {
  setStep: actions.setStep,
  backStep: actions.backStep,
};

const container = (component) =>
  connect(mapStateToProps, mapDispatchToProps)(component);



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
  color: #5C6BC0;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Subtitle = styled.div`
  text-align: center;
  color: #5C6BC0;
  font-size: 16px;
  padding: 0 30px;
  margin-bottom: 30px;
`

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

const Step2 = ({ setStep, backStep, plans = [], state, selectPlan}) => (
  <div>
    <Container>
      <CloseIcon className="material-icons" onClick={backStep}>arrow_back</CloseIcon>
      <Title>Plano</Title>

      <If condition={plans.length > 1}>
        <Subtitle>
          Selecione um dos nossos planos
        </Subtitle>
      </If>

      <div style={{ maxWidth: 500, margin: 'auto' }} >
        <If condition={plans.length}>

          <If condition={!state.planId}>
            {selectPlan(plans[0]._id, plans[0])}
          </If>

          {plans.map(plan =>
            <PlanItem
              active={state.planId == plan._id}
              title={plan.name}
              price={plan.amount / 100}
              plan={plan}
              onClick={() => selectPlan(plan._id, plan) }
            />
          )}

          <p style={{fontSize: 12}} > *A cobrança só será efetuada quando o período de teste concluir. </p>
        </If>
      </div>


    </Container>
    <Footer onClick={() => {
      setStep(3)
    }} />
  </div>
);

export default container(Step2);