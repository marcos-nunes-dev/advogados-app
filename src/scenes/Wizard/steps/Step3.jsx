import { h } from 'preact';
import styled from 'styled-components';
import { route } from 'preact-router';
import Footer from '../components/Footer';
import Input from '../components/Input';
import actions from '../redux/actions';
import { connect } from 'preact-redux';
import { Field, reduxForm } from 'redux-form';
import get from 'lodash/get';

const mapStateToProps = ({ wizard, forms }) => ({
  state: wizard,
  formState: get(forms, 'newLawyer.values')
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

let Form = () => (
  <form>
    {/* <Field name="plan" label="Plano Selecionado" component={Input} type="text" /> */}
    {/* <Field name="paymentMethod" label="Forma de Pagamento" component={Input} type="text" /> */}
    <h4>Dados do Cartão</h4>
    <Field name="card.number" maskText="9999 9999 9999 9999" label="Número do Cartão" component={Input} type="tel" />
    <Field name="card.expiration" maskText="99/99" label="Validade" component={Input} type="tel" />
    <Field name="card.code" label="CVV" component={Input} type="tel" />
    <Field name="card.holdername" label="Nome no Cartão" component={Input} type="text" />
  </form>
);

Form = reduxForm({
  form: 'newLawyer',
  destroyOnUnmount: false,
  enableReinitialize: true
})(Form)


const Step3 = ({ backStep, setStep, formState}) => (
  <div>
    <Container>
      <CloseIcon className="material-icons" onClick={backStep}>arrow_back</CloseIcon>
      <Title>Pagamento</Title>
      <div style={{ maxWidth: 500, margin: 'auto' }} >
        <Form initialValues={formState} />
      </div>
    </Container>
    <Footer onClick={() => {
      setStep(4);
    }} />
  </div>
);

export default container(Step3);