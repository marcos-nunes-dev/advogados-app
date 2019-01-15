import { h, Component } from 'preact';
import styled from 'styled-components';
import { route } from 'preact-router';
import { Flex, Box } from 'reflexbox';
import v from '../../../variables';
import { Chat, Skype, Whatsapp, Phone, Edit } from '../../../components/icons/icons';
import Dialog from 'react-toolbox/lib/dialog';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import get from 'lodash/get';
import snackbar from 'node-snackbar';
import ReactGA from 'react-ga';


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
  background-color:white;
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

const Item = ({icon, title,profile, ...props}) => (

  <ItemWrapper {...props} >
    {icon}
    <div>{title}</div>
  </ItemWrapper>
);


const toWaNumber = (number) => {
  return number
    .replace(/\(/, '')
    .replace(/\)/, '')
    .replace(/\-/, '')
    .replace(/ /gi, '');
}

/**
|--------------------------------------------------
| Toolbar
|--------------------------------------------------
*/

class Toolbar extends Component {

  state = {value: 'some\ntext', copied: false};

  onChange = ({target: {value}}) => {
    this.setState({value, copied: false});
  };

  onClick = ({target: {innerHTML}}) => {
    console.log(`Clicked on "${innerHTML}"!`); // eslint-disable-line
  };

  onCopy = (text) => {
    this.setState({copied: true});
    snackbar.show({text: `Copiado com sucesso: ${text}`, actionText: 'Fechar'});
  };

  render ({profile, userProfile}) {

    return (
    <Container justify="space-between">
      <If condition={profile.config.showChat}>
        <Item icon={<Chat with={23} height={23} />} style={{borderLeft: 'none'}} title="MENSAGEM" onClick={() => route(`/chat/${profile.user._id}`)}/>
      </If>
      {/* <If condition={profile.config.showSkype && profile.contacts.skype}>
        <CopyToClipboard onCopy={this.onCopy} text={get(profile, 'contacts.skype', '')}>
          <Item icon={<Skype with={23} height={23} />} profile={profile} title="SKYPE"
            onClick={() => {
              ReactGA.event({ category: 'Navigation', action: 'ContatoAdv_Skype' });
            }}
          />
        </CopyToClipboard>
      </If> */}
      <If condition={profile.config.showWhatsapp && profile.contacts.whatsapp} >
        <Item icon={<Whatsapp with={23} height={23} />} profile={profile} title="WHATSAPP"
          onClick={() => {
            ReactGA.event({ category: 'Navigation', action: 'ContatoAdv_WhatsApp' });
            cordova.InAppBrowser.open(`https://wa.me/55${toWaNumber(profile.contacts.whatsapp)}?text=Oi! Meu nome é ${userProfile.name}. Estou cadastrado(a) na plataforma Oi Advogado. E tenho uma dúvida que gostaria de compartilhar com o doutor(a).`, '_system', 'location=yes');
          }}
        />
      </If>
      <If condition={profile.config.showPhone && profile.contacts.phone}>
        <Choose>
          <When condition={get(window, 'plugins.CallNumber')}>
              <Item icon={<Phone with={23} height={23} />} profile={profile} title="LIGAR"
                onClick={() => {
                  ReactGA.event({ category: 'Navigation', action: 'ContatoAdv_Telefone' });
                  window.plugins.CallNumber.callNumber(console.log, console.log, toWaNumber(profile.contacts.phone));
                }}
              />
          </When>
          <Otherwise>
            <CopyToClipboard onCopy={this.onCopy} text={get(profile, 'contacts.phone', '')}>
              <Item icon={<Phone with={23} height={23} />} profile={profile} title="LIGAR"
                onClick={() => {
                  ReactGA.event({ category: 'Navigation', action: 'ContatoAdv_Telefone' });
                }}
              />
            </CopyToClipboard>
          </Otherwise>
        </Choose>
      </If>

    </Container>

  );
  }
}
export default Toolbar;