import { h } from 'preact';
import styled from 'styled-components';
import { route } from 'preact-router';
import ReactGA from 'react-ga';
import container from './container';

const Container = styled.div`
  background-color: #7986cb;
  background-image: url('assets/images/bg.jpg');
  background-size: cover;
  background-position: center;
  height: ${window.innerHeight}px;
  min-height: 700px;
  padding: 30px;
`;

const Title = styled.div`
  color: white;
  text-align: center;
  font-size: 25px;
  font-weight: 500;
  padding-top: 15px;
  margin-bottom: 30px;
`;

const Card = styled.div`
  background-color: white;
  padding: 30px 10px;
  text-align: center;
  color: #606ba4;
  border-radius: 3px;
  margin-top: 15px;
  font-size: 20px;
  cursor: pointer;
`;

const Icon = styled.img`
  display: block;
  margin: auto;
  margin-bottom: 10px;
`;
const IconLeft = styled.img`
  @media only screen and (min-width: 530px) {
    display: block;
    margin: auto;
    margin-bottom: 10px;
    max-width: 200px;
    float: left;
  }
  @media only screen and (max-width: 529px) {
    display: block;
    margin: auto;
    margin-bottom: 10px;
    max-width: 200px;
  }
`;
const IconRight = styled.img`
  @media only screen and (min-width: 530px) {
    display: block;
    margin: auto;
    margin-bottom: 10px;
    max-width: 200px;
    float: right;
  }
  @media only screen and (max-width: 529px) {
    display: block;
    margin: auto;
    margin-bottom: 10px;
    max-width: 200px;
  }
`;

const redirect = (user, { isSignedIn }) => {
  if (isSignedIn) {
    if (user && user.lawyer) {
      route('services');
    } else {
      route('home');
    }
  }
};

/**
|--------------------------------------------------
| Component
|--------------------------------------------------
*/

const SigninType = ({ application, authentication }) => (
  <Container>
    {redirect(application.userData, authentication)}
    <Title>Qual o seu objetivo?</Title>
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <Card
        onClick={() => {
          ReactGA.event({ category: 'Navigation', action: 'Buscando_Advogado' });
          route('/home');
        }}
      >
        <Icon src="assets/images/user-profile.png" />
        Estou em busca de
        <br />
        de um advogado
      </Card>
      <Card
        onClick={() => {
          ReactGA.event({ category: 'Navigation', action: 'Sou_Advogado' });
          route('/public-services');
        }}
      >
        <Icon src="assets/images/lawyer-profile.png" />
        Sou um
        <br />
        Advogado
      </Card>
    </div>
    <If condition={!window.cordova}>
      <div style={{ maxWidth: 500, margin: 'auto', padding: '20px 35px 0 35px' }}>
        <IconLeft
          src="assets/images/appstore.png"
          onClick={() => window.open(
            'https://itunes.apple.com/br/app/oi-advogado/id1372083216?l=pt&ls=1&mt=8',
            '_blank',
          )
          }
        />
        <IconRight
          src="assets/images/playstore.png"
          onClick={() => window.open(
            'https://play.google.com/store/apps/details?id=com.web4you.oiadvogado',
            '_blank',
          )
          }
        />
      </div>
    </If>
  </Container>
);

export default container(SigninType);
