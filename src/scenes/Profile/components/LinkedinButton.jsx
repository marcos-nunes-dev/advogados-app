import { h } from 'preact';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';
import { route } from 'preact-router';
import { Tab, Tabs } from '../../../toolbox/components';
import v from '../../../variables';
import FontIcon from 'react-toolbox/lib/font_icon';
import Ripple from 'react-toolbox/lib/ripple';
import theme from 'react-toolbox/lib/ripple/theme';
import { LinkedinIcon } from '../../../components/icons/icons';

/**
|--------------------------------------------------
| NavWrapper
|--------------------------------------------------
*/

const NavWrapper = styled(Flex) `
  background-color: #f5f3f6;
  color: #9871ab; 
  font-weight: 400; 
  border-bottom: 2px solid #ededed;
`;

const ButtonWrapper = styled(Flex) `
  background-color: #ffffff;
  color: #9871ab; 
  font-weight: 400; 
  border-radius:5px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1), 0 6px 20px 0 rgba(0,0,0,0.1);
`;

const Icon = (props) => (
  <Box w={1 / 12} p={0} {...props} style={{ position: 'relative' }}>{props.children}</Box>
);

const RippleIcon = Ripple({ spread: 2 })(Icon);

/**
|--------------------------------------------------
| AddTabs
|--------------------------------------------------
*/

const LinkedinButton = ({ title, authenticate }) => (
  <NavWrapper wrap align='center' w={1} pt={2} pb={2} pl={3} pr={3}>
    <ButtonWrapper align='center' w={1} pt={1} pb={1} pl={2} pr={2} onClick={() => {
      if (window.cordova) {
        cordova.plugins.LinkedIn.login(['r_emailaddress', 'r_basicprofile'], true,
          (result) => {
            console.log(result);
            cordova.plugins.LinkedIn.getActiveSession(function (session) {
              if (session) {
                authenticate({
                  strategy: 'linkedin-token',
                  access_token: session.accessToken
                })
                console.log('Access token is: ', session.accessToken);
              } else {
                console.log('There is no active session, we need to call the login method');
              }
            });
          }, console.log);
      } else {
        window.location.replace('http://192.168.0.19:3030/auth/linkedin')
      }
    }}>
      <RippleIcon><LinkedinIcon /></RippleIcon>
      <Box w={11 / 12} p={1} style={{ textAlign: 'left', fontSize: '.85em', paddingLeft: '1.5em', lineHeight: '1.3', fontWeight: '400' }} onClick={() => route(link)}>{title}</Box>
    </ButtonWrapper>
  </NavWrapper>
);


export default LinkedinButton;