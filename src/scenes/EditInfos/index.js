import { h, Component } from 'preact';
import { route } from 'preact-router';
import styled from 'styled-components';
import container from './container';
import Footer from './components/Footer';
import { Scene } from '../../components';
import Form from './form';
import set from 'lodash/set';

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
  background: #fafafa;
`;

/**
|--------------------------------------------------
| Thumnail
|--------------------------------------------------
*/

const Thumbnail = styled.div`
  text-align: center;
  padding: 70px 0px;
  border: 1px solid #e8e8e8;
  color: #969696;
  font-size: 14px;
  border-radius: 2px;
`;

/**
|--------------------------------------------------
| Warning
|--------------------------------------------------
*/

const Warning = styled.div`
  font-size: 13px;
  padding-left: 10px;
  line-height: 1.2;
  color: #7b7b7b;
`;

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

const Label = styled.div`
  margin: 20px 0px 20px;
  font-size: 13px;
`;

/**
|--------------------------------------------------
| NewRequest
|--------------------------------------------------
*/

const mergeProfiles = (user, lawyer) => ({ ...user, lawyer });

class EditInfos extends Component {
  state = {
    address: {}
  };

  onAddressUpdate = (number, complement) => data => {
    const address = {
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
      zipcode: data.cep,
      number,
      complement
    };
    this.setState({ address });
    console.log(number, address);
  };

  render({ userData, formData, cities, patch, lawyerProfile, userProfile }) {
    return (
      <Scene sync private>
        <Container>
          <If condition={lawyerProfile && userProfile}>
            <CloseButton
              className="material-icons"
              onClick={() => route('/profile')}
            >
              close
            </CloseButton>
          </If>

          <If condition={!lawyerProfile && userProfile}>
            <CloseButton
              className="material-icons"
              onClick={() => route('/profileuser')}
            >
              close
            </CloseButton>
          </If>
          <Title>Perfil</Title>

          <Padding>
            <div style={{ maxWidth: 500, margin: 'auto' }}>
              <Form
                initialValues={mergeProfiles(userProfile, lawyerProfile)}
                formData={formData}
                cities={cities}
                onAddressUpdate={this.onAddressUpdate}
              />
            </div>
          </Padding>

          <Footer
            onClick={() => {
              if (this.state.address && this.state.address.street) {
                set(
                  formData,
                  'lawyerData.location.address',
                  this.state.address
                );
              }

              if (formData.lawyer.description) {
                set(
                  formData,
                  'lawyerData.description',
                  formData.lawyer.description
                );
              }

              patch(userProfile._id, formData);
            }}
          />
        </Container>
      </Scene>
    );
  }
}

export default container(EditInfos);
