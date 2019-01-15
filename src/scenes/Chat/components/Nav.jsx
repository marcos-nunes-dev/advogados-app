import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';

const Nav = styled(Flex) `
	width: 100%;
  min-height: 50px;
  background: linear-gradient(to right, rgba(83,108,254,1) 0%, rgba(103,58,183,1) 100%);
  box-shadow: inset 0px -5px 6px -6px black;
  padding: 6px 10px;
  color: #fff;
`;

export default Nav;
