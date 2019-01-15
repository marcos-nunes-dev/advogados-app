import { h } from 'preact';
import styled from 'styled-components';
import { route } from 'preact-router';
import Footer from './components/Footer';
import { connect } from 'preact-redux';
import { Field, reduxForm } from 'redux-form';
import get from 'lodash/get';
import Input from './Input';
import { services } from '../../feathers';


import LocalDB from '../../feathers/local-database';

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
| Padding
|--------------------------------------------------
*/

const Padding = styled.div`
	padding: 15px;
	background: #fafafa;
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

let Form = ({ form, patch, userData, subscription }) => (
  <form onSubmit={patch} >

    <div style={{ maxWidth: 500, margin: 'auto' }} >
      <Padding>
        <h4>Dados do Cartão</h4>
        <Field name="card.number" mask="1111 1111 1111 1111" label="Número do Cartão" component={Input} type="text" />
        <Field name="card.expiration" mask="11/11" label="Validade" component={Input} type="text" />
        <Field name="card.code" label="CVV" component={Input} type="text" />
        <Field name="card.holder_name" label="Nome no Cartão" component={Input} type="text" />
      </Padding>
    </div>
    
    <Footer onClick={() => {        
      patch(userData.lawyer, form.values)
    }}/>

  </form>
);

Form = reduxForm({
  form: 'chagePaymentMetod'
})(Form)

export default Form;