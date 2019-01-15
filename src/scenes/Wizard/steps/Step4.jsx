/* global window store */
/* eslint-disable-next-line */
import { h, Component } from 'preact';
import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'preact-redux';
import styled from 'styled-components';
import get from 'lodash/get';
import set from 'lodash/set';
import axios from 'axios';
import ViaCep from 'react-via-cep';
import Footer from '../components/Footer';
import Input from '../components/Input';
import actions from '../redux/actions';
import { Autocomplete, Dialog } from '../../../toolbox/components';
import Terms from '../../Terms';

window.changeForm = change;

const changeForm = (path, value) => {
  store.dispatch(changeForm('newLawyer', path, value));
};

const mapStateToProps = ({ wizard, forms }) => ({
  state: wizard,
  formState: get(forms, 'newLawyer.values'),
});

const mapDispatchToProps = {
  setStep: actions.setStep,
  backStep: actions.backStep,
};

const container = component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);

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

// const Subtitle = styled.div`
//   text-align: center;
//   color: #5c6bc0;
//   font-size: 16px;
//   padding: 0 30px;
//   margin-bottom: 30px;
// `;

const CloseIcon = styled.i`
  position: absolute;
  font-size: 30px !important;
  left: 10px;
  top: 10px;
`;

const SearchCepButton = styled.div`
  text-align: center;
  border: 1px solid #7d56c2;
  color: #7d56c2;
  border-radius: 3px;
  padding: 10px;
  cursor: pointer;
`;

/**
|--------------------------------------------------
| Step 1
|--------------------------------------------------
*/

let Form = ({ initialValues, onAddressUpdate, address }) => (
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

    <h4>Endereço</h4>

    <ViaCep cep={initialValues.cep} onSuccess={onAddressUpdate} lazy>
      {({
        data, loading, error, fetch,
      }) => (
        <div>
          <Field name="cep" label="CEP" component={Input} type="text" />
          <Field name="addressNumber" label="Número" component={Input} type="text" />
          <Field name="addressComplement" label="Complemento" component={Input} type="text" />
          <SearchCepButton onClick={fetch}>Pesquisar</SearchCepButton>

          <If condition={loading}>
            <p>procurando...</p>
          </If>

          <If condition={error && !data}>
            return
            <p>error</p>
          </If>

          <If condition={data && !loading && address && address.street}>
            <p>
              {`${data.logradouro} ${initialValues.addressNumber
                || ' '}, ${initialValues.addressComplement || ' '} - ${data.bairro}, ${
                data.localidade
              } - ${data.uf}`}
            </p>
          </If>
        </div>
      )}
    </ViaCep>

    <h4>Contatos</h4>
    <Field
      name="lawyerData.contacts.phone"
      editMask="/(dd/) d?dddd-dddd"
      label="Telefone"
      component={Input}
      type="tel"
    />
    {/* <Field
      name="lawyerData.contacts.skype"
      label="Skype"
      component={Input}
      type="text"
    /> */}
    <Field
      name="lawyerData.contacts.whatsapp"
      editMask="/(dd/) d?dddd-dddd"
      label="Whatsapp"
      component={Input}
      type="tel"
    />
    <Field
      name="lawyerData.birthdate"
      label="Data de nascimento"
      maskText="99/99/9999"
      component={Input}
      placeholder="Ex 10/10/2010"
      type="text"
    />
  </form>
);

Form = reduxForm({
  form: 'newLawyer',
  destroyOnUnmount: false,
  enableReinitialize: true,
  pure: false,
  updateUnregisteredFields: true,
})(Form);

// const getStates = list => list.map(({ nome, sigla }) => ({ label: nome, value: sigla }));

// const getCities = (uf, list) => list.find(i => i.sigla === uf).cidades.map(cityName => ({
//   label: cityName,
//   value: cityName,
// }));

const mapToDropdown = areas => areas.reduce(
  (state, curr) => ({
    ...state,
    [curr._id]: curr.name,
  }),
  {},
);

class Step4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      values: [],
      loaded: false,
      address: {},
    };
  }

  handleMultipleChange = value => {
    if (value.length > 3) {
      return alert('Você só pode escolher no máximo 3 áreas');
    }
    this.setState({
      values: value,
    });
  };

  handleToggle = () => {
    this.setState({
      active: !this.state.active,
    });
  };

  mapViaCepAddress = data => {
    const oabState = get(window.store.getState(), 'forms.newLawyer.values.lawyerData.oab.state');

    if (oabState !== data.uf) {
      return alert('O endereço deve ser do mesmo estado do seu registro da OAB!');
    }

    const address = {
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
      zipcode: data.cep,
    };
    this.setState({
      address,
    });
    return address;
  };

  getAddressCoords = addressObject => {
    const { street, city, state } = addressObject;
    const address = `${street} ${city} ${state} ${this.props.formState.addressNumber}`;
    return new Promise(resolve => {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCmPKWxyysvnjzCJ5e9xE7H_8HNzWLtn4s`,
        )
        .then(({ data }) => {
          console.log(data);
          if (data.results.length) {
            const [item] = data.results;
            const { lat, lng } = item.geometry.location;
            resolve([lat, lng]);
          }
          resolve([0, 0]);
        })
        .catch(() => {
          resolve([0, 0]);
        });
    });
  };

  load() {
    const { loaded } = this.state;
    if (!loaded) {
      this.setState({
        loaded: true,
      });
    }
  }

  render({
    freePlanConfig, setStep, formState, cities, register, state, lawAreas,
  }) {
    return (
      <div>
        <Container>
          <CloseIcon className="material-icons" onClick={() => setStep(1)}>
            arrow_back
          </CloseIcon>
          <Title>Informações Pessoais</Title>
          <div
            style={{
              maxWidth: 500,
              margin: 'auto',
            }}
          >
            <Form
              initialValues={formState}
              cities={cities}
              lawAreas={lawAreas}
              onAddressUpdate={this.mapViaCepAddress}
              address={this.state.address}
            />

            <h4>Áreas de atuação</h4>
            {this.load()}

            <Autocomplete
              direction="up"
              onChange={this.handleMultipleChange}
              label="Selecione as Área de Atuação"
              source={mapToDropdown(lawAreas)}
              value={this.state.values}
            />
          </div>
        </Container>

        <Dialog
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title="Termos e Condi&ccedil;&otilde;es de Uso e Pol&iacute;tica de Privacidade"
          actions={[
            {
              label: 'Cancelar',
              onClick: this.handleToggle,
            },
            {
              label: 'Aceitar e Cadastrar',
              onClick: () => {
                this.handleToggle();
                window.tempEmail = formState.email;
                window.tempPassword = formState.password;
                formState.planId = state.planId;
                formState.device_id = localStorage.getItem('local_device_id');
                formState.lawyerData.planConfig = get(freePlanConfig, 'rules');
                formState.lawyerData.areas = this.state.values;
                set(formState, 'lawyerData.location.address', this.state.address);
                set(formState, 'lawyerData.location.address.number', formState.addressNumber);
                set(
                  formState,
                  'lawyerData.location.address.complement',
                  formState.addressComplement,
                );
                this.getAddressCoords(this.state.address).then(coords => {
                  set(formState, 'lawyerData.location.geo.coordinates', coords || [0, 0]);
                  register(formState);
                });
              },
            },
          ]}
        >
          <Terms />
        </Dialog>

        <Footer
          onClick={() => {
            if (!formState.password || !formState.passwordConfirmation) {
              return alert('Preencha os campos de senha!');
            }

            if (!this.state.address || !this.state.address.street) {
              return alert('Você precisa informar seu CEP');
            }

            if (this.state.values.length === 0) {
              return alert('Selecione uma área de atuação');
            }
            this.handleToggle();
            return null;
          }}
        />
      </div>
    );
  }
}

export default container(Step4);
