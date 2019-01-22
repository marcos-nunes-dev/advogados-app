import { h, Component } from 'preact';
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


/**
|--------------------------------------------------
| Form
|--------------------------------------------------
**/

let inputMasked

class SignupForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      inputMasked: '',
    }
  }
  Mask = value => {
    this.setState({
      inputMasked: VMasker.toPattern(value, '(99) 9999-9999')
    })
    // inputMasked = VMasker.toPattern(value, '(99) 9999-9999');
    console.log(this.state.inputMasked)
  }
  render() {
    const InputField = ({ input, ...props }) => <Input {...input} {...props} />
    const InputFieldMask = ({ input, ...props }) => <Input {...input} {...props} value={this.state.inputMasked} onBlur={e => this.Mask(e.target.value)} />
    return (
      <form>
        <Field name="name" placeholder="Nome" component={InputField} type="text" />
        <Field name="email" placeholder="E-mail" component={InputField} type="text" />
        <Field name="phone" placeholder="Telefone" component={InputFieldMask} type="tel" />
        <Field name="password" placeholder="Senha" component={InputField} type="password" />
        <Field name="passwordConfirm" placeholder="Repita sua senha" component={InputField} type="password" />
      </form>
    );
  }
}


export default reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  enableReinitialize: true,
  pure: false
})(SignupForm);
