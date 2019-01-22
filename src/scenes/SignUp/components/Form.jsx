import { h } from 'preact';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import VMasker from 'vanilla-masker';
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

let inputMasked;

const Mask = value => {
 inputMasked = VMasker.toPattern(value, '(99) 9999-9999');
 console.log(inputMasked)
}

const InputField = ({ input, ...props }) => <Input {...input} {...props} />

const InputFieldMask = ({ input, ...props }) => <Input {...input} {...props} value={inputMasked} onChange={e => Mask(e.target.value)}/>


/**
|--------------------------------------------------
| Form
|--------------------------------------------------
**/

const SignupForm = ({ cities, formData, ...props }) => (
  <form>
    <Field name="name" placeholder="Nome" component={InputField} type="text"/>
    <Field name="email" placeholder="E-mail" component={InputField} type="text" />
    <Field name="phone" placeholder="Telefone" component={InputFieldMask} type="tel" />
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