import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';

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
  cursor: pointer;
`;

/**
|--------------------------------------------------
| Title
|--------------------------------------------------
*/

const Title = styled.div`
  font-size: 13px;
  padding: 0 10px;
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

const Footer = ({ text, ...props }) => (
  <FooterButton {...props}>
    <Flex align="center" justify="space-around" style={{ height: '100%' }} >
      <Title>{text}</Title>
    </Flex>
  </FooterButton>
);

export default Footer;
