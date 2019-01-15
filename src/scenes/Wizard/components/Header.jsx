import styled from 'styled-components';

/**
|--------------------------------------------------
| HeaderWrapper
|--------------------------------------------------
*/

const HeaderWrapper = styled.div`
  position: relative;
  background-color: #5C6BC0;
  min-height: 200px;
`;

/**
|--------------------------------------------------
| CloseButton
|--------------------------------------------------
*/

const CloseButton = styled.i`
  position: absolute;
  color: #fff;
  padding: 15px;
  font-size: 28px!important;
  top: 0;
  left: 0;
  cursor: pointer;
`;

/**
|--------------------------------------------------
| Title
|--------------------------------------------------
*/

const Title = styled.h1`
  text-align: center;
  color: white;
  font-size: 22px;
  padding: 20px 20px;
  margin: 0;
  font-weight: 500;
`;

/**
|--------------------------------------------------
| Inputs
|--------------------------------------------------
*/

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
| Block
|--------------------------------------------------
*/

const Block = styled.div`
  padding: 0 20px;
`;

/**
|--------------------------------------------------
| SignUpButon
|--------------------------------------------------
*/

const SignUpButon = styled.button`
  background: none;
  border: 1px solid #fff;
  border-radius: 2px;
  padding: 10px;
  width: 100%;
  color: #fff;
  outline: none;
  margin-bottom: 20px;

  &:active {
    background-color: white;
    color: #5C6BC0;
  }
`;

/**
|--------------------------------------------------
| Header
|--------------------------------------------------
*/

const Header = () => (
  <HeaderWrapper>
    <CloseButton className="material-icons" >close</CloseButton>
    <Block>
      <Title>Informe seus dados para começar seu cadastro</Title>

      <Input type="text" placeholder="E-mail" />
      <Input type="password" placeholder="Senha" />
      <Input type="password" placeholder="Repita sua senha" />
      <SignUpButon>Cadastrar</SignUpButon>
    </Block>
  </HeaderWrapper>
)

export default Header;