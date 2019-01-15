import { h } from 'preact';
import Input from './components/Input';
import { Dropdown } from '../../components';
import { Field, reduxForm } from 'redux-form';

const getStates = list =>
  list.map(({ nome, sigla }) => ({ label: nome, value: sigla }));

let Form = ({ cities }) => (
  <form>
    <h4>Conta</h4>
    <Field name="name" label="Nome Completo" component={Input} type="text" />
    <Field name="email" label="E-mail" component={Input} type="text" />
    <Field name="password" label="Senha" component={Input} type="password" />
    <Field
      name="passwordConfirmation"
      label="Confirmação de Senha"
      component={Input}
      type="password"
    />
    <h4>Contatos</h4>
    <Field
      mask="/(dd/) d?dddd-dddd"
      name="lawyerData.contacts.phone"
      label="Telefone"
      component={Input}
      type="text"
    />
    {/* <Field name="lawyerData.contacts.skype" label="Skype" component={Input} type="text" /> */}
    <Field
      mask="/(dd/) d?dddd-dddd"
      name="lawyerData.contacts.whatsapp"
      label="Whatsapp"
      component={Input}
      type="text"
    />
    <h4>Cidade</h4>
    <Field
      name="location.address.state"
      label="Estado"
      auto
      type="text"
      source={getStates(cities)}
      component={Dropdown}
    />
  </form>
);

const createReduxForm = reduxForm({
  form: 'optional'
});

const UserForm = createReduxForm(Form);

export default UserForm;
