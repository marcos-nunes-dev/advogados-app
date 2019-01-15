import { h } from 'preact';
import styled from 'styled-components';
import { route } from 'preact-router';
import { Flex, Box } from 'reflexbox';
import v from '../../../variables';
import {
  Chat, Skype, Whatsapp, Phone, Edit,
} from '../../../components/icons/icons';

/**
|--------------------------------------------------
| Container
|--------------------------------------------------
*/

const Container = styled(Flex)`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  padding: 13px;
  border-top: 1px solid ${v.mc.indigo._50};
  box-shadow: 0 -4px 4px -4px ${v.mc.indigo._50};
  background-color: white;
`;

/**
|--------------------------------------------------
| Item
|--------------------------------------------------
*/

const ItemWrapper = styled(Box)`
  z-index: 10;
  width: 25%;
  text-align: center;
  color: #5c6bc0;
  font-size: 10px;
  border-left: 1px solid ${v.mc.indigo._50};
`;

const Item = ({ icon, title, ...props }) => (
  <ItemWrapper {...props}>
    {icon}
    <div>{title}</div>
  </ItemWrapper>
);

/**
|--------------------------------------------------
| Toolbar
|--------------------------------------------------
*/

const Toolbar = ({ profile }) => (
  <Container justify="space-between">
    <If condition={profile.config.showChat}>
      <Item icon={<Chat with={23} height={23} />} style={{ borderLeft: 'none' }} title="MENSAGEM" />
    </If>
    {/* <If condition={profile.config.showSkype}>
      <Item icon={<Skype with={23} height={23} />} title="SKYPE"/>
    </If> */}
    <If condition={profile.config.showWhatsapp}>
      <Item icon={<Whatsapp with={23} height={23} />} title="WHATSAPP" />
    </If>
    <If condition={profile.config.showPhone}>
      <Item icon={<Phone with={23} height={23} />} title="LIGAR" />
    </If>
    <Item
      icon={<Edit with={23} height={23} />}
      title="EDITAR"
      onClick={() => route('/editcontacts')}
    />
  </Container>
);

export default Toolbar;
