import styled from 'styled-components';

const Container = styled.div`
  background-image: url('assets/images/bg.jpg');
  background-size: cover;
  background-attachment: fixed;
  height: ${window.innerHeight - 90}px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

const Title = styled.div`
  color: white;
  text-align: center;
  font-size: 21px;
  font-weight: 500;
  padding: 40px 10px;
`;

const Description = styled.div`
  color: white;
  padding: 0 30px;
  text-align: center;
  font-size: 14px;
  line-height: 1.5;
`;

const Button = styled.button`
  border: 1px solid white;
  background-color: transparent;
  color: white;
  padding: 15px 53px;
  font-size: 12px;
  margin: auto;
  display: block;
  margin-top: 30px;
  border-radius: 3px;
  outline: none;

  &:active {
    background-color: white;
    color: #3f5179;
  }
`;

const Empty = ({ onButtonClick}) => (
  <Container>
    <Title>
      Tire suas dúvidas<br/>
      com advogados
    </Title>
    <Description>
      Além de procurar por advogados, você também pode
      compartilhar o seu problema para que advogados especialistas
      entrem em contato.
    </Description>
    <Button onClick={onButtonClick} >COMPARTILHAR SUA DÚVIDA</Button>
  </Container>
);

export default Empty;
