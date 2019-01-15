import styled from 'styled-components';
import { route } from 'preact-router';

/**
|--------------------------------------------------
| FooterWrapper
|--------------------------------------------------
*/

const FooterWrapper = styled.div`
  text-align: center;
`;

/**
|--------------------------------------------------
| Label
|--------------------------------------------------
*/

const Label = styled.div`
  margin: 15px 10px;
  font-size: 14px;
`;

/**
|--------------------------------------------------
| Divider
|--------------------------------------------------
*/

const Divider = styled.div`
  border-bottom: 1px solid #c3c3c3;
`;

/**
|--------------------------------------------------
| SignUpButton
|--------------------------------------------------
*/

const SignUpButton = styled.button`
  margin-bottom: 10px;
  background: #fff;
  color: #673AB7;
  border: none;
  font-size: 14px;
`;

/**
|--------------------------------------------------
| Footer
|--------------------------------------------------
*/

const Footer = () => (
  <FooterWrapper>
    <Label onClick={() => route('terms')} >Termos de Uso e Politica de Privacidade</Label>
  </FooterWrapper>
);

export default Footer;
