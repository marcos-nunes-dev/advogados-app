import { h, Component } from 'preact';
import { route } from 'preact-router';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';
import { Logo } from '../../../components/icons/icons';
import ReactGA from 'react-ga';
//setup

const Avatar = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 100%;
`;

const OABNumber = styled.div`
	font-size: 11px;
`;

const Name = styled.div`
	margin-top: 5px;
	font-weight: 600;
	color: #7986CB;
`;

const HeaderWrapper = styled(Flex) `
	padding: 10px;
	border-bottom: 1px solid #eaeaea;
`;

const Divider = styled.div`
	border-bottom: 1px solid #eaeaea;
	margin: 5px 0;
`;

const MenuItem = styled.div`
	color: #7986CB;
	padding: 15px 25px;
	font-size: 14px;
`;

const Header = ({ userProfile, lawyerProfile}) => (
  <If condition={userProfile}>
    <HeaderWrapper align="center" >
      <Box w={1 / 5} >
        <Avatar src={userProfile.photo} />
      </Box>
      <Box w={4 / 5}>
        <OABNumber>{`${lawyerProfile.oab.number}/${lawyerProfile.oab.state}`}</OABNumber>
        <Name>{userProfile.name}</Name>
      </Box>
    </HeaderWrapper>
  </If>
);

const LogoBox = styled.div`
	width: 100%;
	background: #fafaff;
	padding: 1em 5.5em;
`;

const SloganBox = styled.div`
  background: #fafaff;
  padding: 0px 15px 25px 15px;
  border-bottom: 1px solid #eaeaea;
	color: #9FA8DA;
	text-align: center;
`;


const Drawer = ({ state, toggleDrawer, logout, userProfile, lawyerProfile }) => (
  <div>
    <LogoBox> 
			<Logo height={60}/>
		</LogoBox>
    <SloganBox>
      Encontre advogados. <br/>
      Garanta seus Direitos.
    </SloganBox>
    <Header userProfile={userProfile} lawyerProfile={lawyerProfile} />

    <div className="cp">
      <MenuItem onClick={() => { route('/profile'); toggleDrawer() }}>Editar seu perfil</MenuItem>
      <MenuItem onClick={() => {
        ReactGA.event({ category: 'Navigation', action: 'btnMenuApp_Mensagens' });
        route('/chats'); toggleDrawer();
      }} >Mensagens</MenuItem>
      <MenuItem onClick={() => { route('/newarticle'); toggleDrawer() }}>Publicar Artigo</MenuItem>
      <MenuItem onClick={() => { route('/payment'); toggleDrawer() }}>Assinaturas e Planos</MenuItem>
      <MenuItem onClick={() => { logout(); toggleDrawer() }} >Sair</MenuItem>

      <Divider />
      <MenuItem onClick={() => {
        ReactGA.event({ category: 'Navigation', action: 'btnMenuApp_Inicio' });
        route('/services'); toggleDrawer();
      }} >Início</MenuItem>
      <Divider />
    </div>

  </div>
);

export default Drawer;
