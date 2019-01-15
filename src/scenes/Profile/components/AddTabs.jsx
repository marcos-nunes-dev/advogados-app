import { h } from 'preact';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';
import { route } from 'preact-router';
import { Tab, Tabs } from '../../../toolbox/components';
import v from '../../../variables';
import FontIcon from 'react-toolbox/lib/font_icon';
import Ripple from 'react-toolbox/lib/ripple';
import theme from 'react-toolbox/lib/ripple/theme';

/**
|--------------------------------------------------
| NavWrapper
|--------------------------------------------------
*/

const NavWrapper = styled(Flex)`
  background-color: #f5f3f6;
  color: #9871ab; 
  font-weight: 400; 
  border-bottom: 2px solid #ededed;
`;

const Icon = (props) => (
  <Box w={1/12} p={0} {...props} style={{position: 'relative'}}>{props.children}</Box>
);

const RippleIcon = Ripple({spread: 2})(Icon);

/**
|--------------------------------------------------
| AddTabs
|--------------------------------------------------
*/

const AddTabs = ({ title, link, icon }) => (
  <NavWrapper wrap align='center' w={1} p={2}>
    <Box w={11/12} p={1} onClick={() => route(link)}>{ title }</Box>
    <RippleIcon onClick={() => route(link)}><FontIcon value={icon}/></RippleIcon>
  </NavWrapper>
);


export default AddTabs;