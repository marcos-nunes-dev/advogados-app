import { h, Component } from 'preact';
import styled from 'styled-components';
import { route } from 'preact-router';
import { connect } from 'preact-redux';
import { Field, reduxForm } from 'redux-form';
import get from 'lodash/get';
import snackbar from 'node-snackbar';
import Footer from '../components/Footer';
import Input from '../components/Input';
import actions from '../redux/actions';
// import { Dropdown } from '../../../components';
import { Autocomplete } from '../../../toolbox/components';

const mapStateToProps = ({ wizard, forms }) => ({
  state: wizard,
  formState: get(forms, 'newLawyer.values'),
});

const mapDispatchToProps = {
  setStep: actions.setStep,
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
  cursor: pointer;
`;

// const getStates = list => list.map(({ nome, sigla }) => ({ label: nome, value: sigla }));

const mapToDropdown = states => states.reduce(
  (state, curr) => ({
    ...state,
    [curr.sigla]: curr.nome,
  }),
  {},
);

let Form = ({ initialValues }) => (
  <form>
    <Field name="cpf" maskText="999.999.999-99" label="CPF" component={Input} type="tel" />
    <With selectedOabState={get(initialValues, 'lawyerData.oab.state')}>
      <Field name="lawyerData.oab.number" label="OAB Inscrição" component={Input} type="number" />
      {/* <Field
        name="lawyerData.oab.state"
        val={selectedOabState}
        label="OAB Estado"
        auto
        source={getStates(cities)}
        component={Dropdown}
      /> */}
    </With>
  </form>
);

Form = reduxForm({
  form: 'newLawyer',
  destroyOnUnmount: false,
  enableReinitialize: true,
  pure: false,
  updateUnregisteredFields: true,
})(Form);

const mod11 = num => num % 11;
const NOT = x => !x;
const isEqual = a => b => b === a;
const mergeDigits = (num1, num2) => `${num1}${num2}`;
const getTwoLastDigits = cpf => `${cpf[9]}${cpf[10]}`;
const getCpfNumeral = cpf => cpf.substr(0, 9).split('');

const isRepeatingChars = str => str.split('').every(elem => elem === str[0]);

const toSumOfProducts = multiplier => (result, num, i) => result + num * multiplier--;

const getSumOfProducts = (list, multiplier) => list.reduce(toSumOfProducts(multiplier), 0);

const getDigit = num => (num > 1 ? 11 - num : 0);

const getValidationDigit = multiplier => cpf => getDigit(mod11(getSumOfProducts(cpf, multiplier)));

const isRepeatingNumbersCpf = isRepeatingChars;

const isValidCPF = cpf => {
  const CPF = getCpfNumeral(cpf);
  const firstDigit = getValidationDigit(10)(CPF);
  const secondDigit = getValidationDigit(11)(CPF.concat(firstDigit));

  return isEqual(getTwoLastDigits(cpf))(mergeDigits(firstDigit, secondDigit));
};

const validate = CPF => NOT(isRepeatingNumbersCpf(CPF)) && isValidCPF(CPF);

class Step1 extends Component {
  state = {
    state: '',
  };

  validate = () => {
    let numberCpf = null;
    const cpf = get(this.props, 'formState.cpf', null);
    const oab = get(this.props, 'formState.lawyerData.oab', null);
    oab.state = this.state.state;

    if (cpf) {
      numberCpf = validate(cpf.replace(/[^0-9]/g, '').toString());
    }

    if (!numberCpf) {
      snackbar.show({ text: 'Informe um CPF válido!', actionText: 'Fechar' });
    } else if (!oab || !oab.number) {
      snackbar.show({
        text: 'Informe um número da OAB válida!',
        actionText: 'Fechar',
      });
    } else if (!oab || !oab.state) {
      snackbar.show({ text: 'Informe uma UF válida!', actionText: 'Fechar' });
    } else {
      this.props.setStep(4);
    }
  };

  handleSimpleChange = value => {
    this.setState({ state: value });
  };

  render({ formState, cities }) {
    return (
      <div>
        <Container>
          <CloseIcon className="material-icons" onClick={() => route('/home')}>
            close
          </CloseIcon>
          <Title>CPF e OAB</Title>
          <Subtitle>Por favor, informe seu CPF número de inscrição da OAB e UF</Subtitle>
          <div style={{ maxWidth: 500, margin: 'auto' }}>
            <Form initialValues={formState} cities={cities} />
            <Autocomplete
              direction="down"
              onChange={this.handleSimpleChange}
              label="OAB Estado"
              source={mapToDropdown(cities)}
              value={this.state.state}
              multiple={false}
            />
          </div>
        </Container>
        <Footer
          onClick={() => {
            this.validate();
          }}
        />
      </div>
    );
  }
}

export default container(Step1);
