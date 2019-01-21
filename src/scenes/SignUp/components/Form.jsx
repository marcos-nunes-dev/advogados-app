import { h } from 'preact';
import { Field, reduxForm } from 'redux-form';
import { createNumberMask } from 'redux-form-input-masks';
import styled from 'styled-components';
import get from 'lodash/get';

const Input = styled.input`
  background-color: white;
  border-radius: 2px;
  border: none;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  outline: none;
`;

const phoneMask = createTextMask({
  pattern: '(99) 9999-99999',
});

const InputField = ({ input, ...props }) => <Input {...input} {...props} />


/**
|--------------------------------------------------
| Form
|--------------------------------------------------
**/

const SignupForm = ({ cities, formData, ...props }) => (
  <form>
    <Field name="name" placeholder="Nome" component={InputField} type="text"/>
    <Field name="email" placeholder="E-mail" component={InputField} type="text" />
    <Field name="phone" placeholder="Telefone" component={InputField} type="tel" {...phoneMask}/>
    <Field name="password" placeholder="Senha" component={InputField} type="password" />
    <Field name="passwordConfirm" placeholder="Repita sua senha" component={InputField} type="password" />
  </form>
);

export default reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  enableReinitialize: true,
  pure: false
})(SignupForm);