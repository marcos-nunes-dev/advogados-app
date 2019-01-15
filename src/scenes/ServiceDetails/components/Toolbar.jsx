import { h } from 'preact';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';
import { route } from 'preact-router';
import v from '../../../variables';

/**
|--------------------------------------------------
| Container
|--------------------------------------------------
*/

const Container = styled(Flex)`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
`;

/**
|--------------------------------------------------
| Item
|--------------------------------------------------
*/

const ItemWrapper = styled(Box)`
  background-color:white;
  z-index: 10;
  border-top: 1px solid ${v.mc.indigo._50};
  width: 100%;
  text-align: center;
  color: #5c6bc0;
  font-size: 10px;
  padding-top: 3px;
`;

const Item = ({icon, title, ...props}) => (
  <ItemWrapper {...props}>
    <i class="material-icons" style={{ fontSize: 28 }} >{icon}</i>
    <div>{title}</div>
  </ItemWrapper>
);

/**
|--------------------------------------------------
| Toolbar
|--------------------------------------------------
*/

const Toolbar = ({userId}) => (
  <Container justify="space-between" >
    <Item icon="chat_bubble" title="MENSAGEM" onClick={() => {
      route(`/chat/${userId}`)
    }} />
    {/* <Item icon="chat_bubble" title="SKYPE"/>
    <Item icon="phone" title="WHATSAPP"/>
    <Item icon="phone" title="LIGAR"/> */}
  </Container>
);

export default Toolbar;