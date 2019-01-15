/* global window */
/* eslint-disable-next-line */
import { h, Component } from 'preact';
import React from 'react';
import { route } from 'preact-router';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import container from './container';
import Footer from './components/Footer';
import { Input } from '../../components';
import { Dropdown } from '../../toolbox/components';

/**
|--------------------------------------------------
| Container
|--------------------------------------------------
*/

const Container = styled.div`
  height: ${window.innerHeight}px;
  background-color: #fafafa;
`;

/**
|--------------------------------------------------
| CloseButon
|--------------------------------------------------
*/

const CloseButton = styled.i`
  position: absolute;
  left: 15px;
  top: 15px;
  font-size: 30px;
  cursor: pointer;
`;

/**
|--------------------------------------------------
| Title
|--------------------------------------------------
*/

const Title = styled.div`
  padding: 15px;
  text-align: center;
  font-size: 22px;
  color: #7986cb;
  font-weight: 500;
`;

/**
|--------------------------------------------------
| Padding
|--------------------------------------------------
*/

const Padding = styled.div`
  padding: 15px;
  padding: ${p => p.value}px;
`;

/**
|--------------------------------------------------
| Thumnail
|--------------------------------------------------
*/

// const Thumbnail = styled.div`
//   text-align: center;
//   padding: 70px 0px;
//   border: 1px solid #e8e8e8;
//   color: #969696;
//   font-size: 14px;
//   border-radius: 2px;
// `;

/**
|--------------------------------------------------
| Warning
|--------------------------------------------------
*/

// const Warning = styled.div`
//   font-size: 13px;
//   padding-left: 10px;
//   line-height: 1.2;
//   color: #7b7b7b;
// `;

// const Textarea = styled.textarea`
//   padding: 15px;
//   width: 100%;
//   height: ${window.innerHeight - 196}px;
//   font-size: 16px;
//   outline: none;
//   -webkit-appearance: none;
//   border: none;
// `;

// const Label = styled.div`
//   margin: 20px 0px 20px;
//   font-size: 13px;
// `;

/**
|--------------------------------------------------
| NewRequest
|--------------------------------------------------
*/

const formationTypes = [
  { value: '1', label: 'Bacharelado' },
  { value: '2', label: 'Licenciatura' },
  { value: '3', label: 'Pós-Graduação' },
  { value: '4', label: 'Mestrado' },
  { value: '5', label: 'Doutorado' },
];

class NewQualification extends Component {
  state = {
    formationType: null,
    area: null,
    areas: [],
    loaded: false,
  };

  handleFormationTypeChange = value => {
    this.setState({ formationType: value });
  };

  handleAreaChange = value => {
    this.setState({ area: value });
  };

  load = lawAreas => {
    if (!this.state.loaded) {
      const areas = lawAreas.map(item => ({ label: item.name, value: item._id }));
      this.setState({
        areas,
        loaded: true,
      });
    }
  };

  filterAreas = (type, data) => {
    const otherArea = { label: 'Outra Área', value: 'other' };
    if (type === 1) {
      return [{ label: 'Direito', value: 'direito' }];
    }
    return [...data, otherArea];
  };

  render({
    formData, update, lawyerProfile, lawAreas,
  }) {
    return (
      <Container>
        <CloseButton className="material-icons" onClick={() => route('/profile')}>
          close
        </CloseButton>
        <Title>Nova Formação</Title>

        <Padding>
          <div style={{ maxWidth: 500, margin: 'auto' }}>
            <Field name="endYear" label="Ano de conclusão" component={Input} type="text" />
            <Field name="institution" label="Instituição de Ensino" component={Input} type="text" />
            <Dropdown
              source={formationTypes}
              label="Tipo de Formação"
              onChange={this.handleFormationTypeChange}
              value={this.state.formationType}
            />
            <If condition={lawAreas && lawAreas.length}>
              {this.load(lawAreas)}
              <Dropdown
                source={this.filterAreas(this.state.formationType, this.state.areas)}
                label="Área"
                onChange={this.handleAreaChange}
                value={this.state.area}
              />
            </If>

            <If condition={this.state.formationType != 1 && this.state.area === 'other'}>
              <Field name="area" label="Título da Área" component={Input} type="text" />
            </If>
          </div>
        </Padding>

        <If
          condition={
            formData
            && formData.endYear
            && formData.institution
            && this.state.formationType
            && this.state.area
          }
        >
          <Footer
            onClick={() => {
              console.log(this.state);
              formData.formationType = formationTypes[this.state.formationType - 1].label;
              const area = this.state.areas.find(({ value }) => value == this.state.area);

              if (!(this.state.area === 'other')) {
                formData.area = this.state.area === 'direito' ? 'Direito' : area.label;
              }

              update(lawyerProfile._id, {
                $push: {
                  graduate: formData,
                },
              });
            }}
          />
        </If>
      </Container>
    );
  }
}

const Form = reduxForm({
  form: 'newQualification',
  destroyOnUnmount: false,
  enableReinitialize: true,
  pure: false,
})(NewQualification);

export default container(Form);
