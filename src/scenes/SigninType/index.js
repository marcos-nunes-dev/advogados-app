import { h } from 'preact';
import styled from 'styled-components';
import { route } from 'preact-router';
import container from './container';

const Container = styled.div`
  background-color: #7986cb;
  background-image: url('assets/images/bg.jpg');
  background-size: cover;
  background-position: center;
  height: ${window.innerHeight}px;
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
`;

const Icon = styled.img`
  display: block;
  margin: auto;
  margin-bottom: 10px;
`;

/**
|--------------------------------------------------
| Component
|--------------------------------------------------
*/

const SigninType = () => (
  <Container>
    <Title>Qual o seu objetivo?</Title>
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <Card
        onClick={() => {
          route('/signup');
        }}
      >
        <Icon src="assets/images/user-profile.png" />
        Estou em busca de
        <br />
        de um advogado
      </Card>
      <Card
        onClick={() => {
          route('/wizard');
        }}
      >
        <Icon src="assets/images/lawyer-profile.png" />
        Quero me cadastrar
        <br />
        como advogado
      </Card>
    </div>
  </Container>
);

export default container(SigninType);
