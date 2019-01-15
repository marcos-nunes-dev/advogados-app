import { h, Component } from 'preact';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../../components';
import styled from 'styled-components';
import get from 'lodash/get';
import ViaCep from 'react-via-cep';

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/

const Textarea = styled.textarea`
  padding: 15px;
  width: 100%;
  height: 100px;
  font-size: 13px;
  outline: none;
  -webkit-appearance: none;
  border: none;
  margin-bottom: 65px;
`;

const SearchCepButton = styled.div`
  text-align: center;
  border: 1px solid #7d56c2;
  color: #7d56c2;
  border-radius: 3px;
  padding: 10px;
`;

const TextareaField = ({ input, val, ...props }) => (
  <Textarea {...input} {...props} value={val} />
);

/**
|--------------------------------------------------
| Helpers
|--------------------------------------------------
*/

// const getStates = list =>
//   list.map(({ nome, sigla }) => ({ label: nome, value: sigla }));

// const getCities = (uf, list) =>
//   list
//     .find(i => i.sigla === uf)
//     .cidades.map(cityName => ({ label: cityName, value: cityName }));

/**
|--------------------------------------------------
| Form
|--------------------------------------------------
*/

class UserInfosForm extends Component {
  state = {
    address: {}
  };

  onAddressUpdate = data => {
    const address = {
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
      zipcode: data.cep
    };
    this.setState({ address });
    console.log(address);
  };

  addressToString(address) {
    return `${address.street} ${address.number}, ${address.complement} - ${
      address.neighborhood
    }, ${address.city} - ${address.state}`;
  }

  render({ cities, formData, ...props }) {
    return (
      <form>
        <Field
          name="name"
          label="Nome Completo"
          component={Input}
          type="text"
        />

        <If condition={get(formData, 'lawyer._id')}>
          <h4>Endereço</h4>

          <p>
            {this.addressToString(get(formData, 'lawyer.location.address'))}
          </p>

          <p style={{ fontSize: 12, color: '#888888' }}>
            Para alterar o endereço basta pesquisar o CEP no campo abaixo:
          </p>

          <ViaCep
            cep={formData.cep}
            onSuccess={props.onAddressUpdate(get(formData, 'addressNumber'), get(formData, 'addressComplement'))}
            lazy
          >
            {({ data, loading, error, fetch }) => (
              <div>
                <Field name="cep" label="CEP" component={Input} type="text" />
                <Field
                  name="addressNumber"
                  label="Número"
                  component={Input}
                  type="text"
                />
                <Field
                  name="addressComplement"
                  label="Complemento"
                  component={Input}
                  type="text"
                />
                <SearchCepButton onClick={fetch}>Pesquisar</SearchCepButton>

                <If condition={loading}>
                  <p>procurando...</p>
                </If>

                <If condition={error && !data}>
                  return <p>error</p>
                </If>

                <If condition={data && !loading}>
                  <p>{`${data.logradouro} ${formData.addressNumber ||
                    ' '}, ${formData.addressComplement || ' '} - ${
                    data.bairro
                  }, ${data.localidade} - ${data.uf}`}</p>
                </If>
              </div>
            )}
          </ViaCep>

          <h4>Descrição</h4>
          <Field
            name="lawyer.description"
            component={TextareaField}
            val={get(formData, 'lawyer.description')}
          />
        </If>
      </form>
    );
  }
}

export default reduxForm({
  form: 'editInfos',
  destroyOnUnmount: false,
  enableReinitialize: true,
  pure: false
})(UserInfosForm);
