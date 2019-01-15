import styled from 'styled-components';

/**
|--------------------------------------------------
| FooterButton
|--------------------------------------------------
*/

const FooterButton = styled.div`
  text-align: center;
  background-color: #7E57C2;
  text-align: center;
  height: 55px;
  width: 100%;
  position: fixed;
  bottom: 0;
  color: white;
  line-height: 55px;
  cursor: pointer;
`;

/**
|--------------------------------------------------
| Title
|--------------------------------------------------
*/

const Title = styled.span`
  font-size: 13px;
`;

/**
|--------------------------------------------------
| Icon
|--------------------------------------------------
*/

const Icon = styled.i`
  position: absolute;
  right: 10px;
  top: 15px;
`

/**
|--------------------------------------------------
| Footer
|--------------------------------------------------
*/

const Footer = ({...props}) => (
  <FooterButton {...props} >
    <Title>QUERO ATENDER ESTE CLIENTE</Title>
  </FooterButton>
);

export default Footer;
