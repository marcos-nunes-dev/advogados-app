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

const Drawer = ({ state, toggleDrawer }) => (
  <div>
    <LogoBox> 
			<Logo height={60}/>
		</LogoBox>
    <SloganBox>
      Encontre advogados. <br/>
      Garanta seus Direitos.
    </SloganBox>

		<div className="cp">
			<MenuItem onClick={() => { route('/signin'); toggleDrawer() }} >Entrar na sua Conta</MenuItem>
			<MenuItem onClick={() => { route('/signintype'); toggleDrawer() }} >Cadastrar</MenuItem>
			<MenuItem onClick={() => {
				route('/hints'); toggleDrawer();
			}} >Como contratar corretamente um excelente advogado?</MenuItem>
			<MenuItem onClick={() => {
				route('/honorarios'); toggleDrawer();
			}} >Honorários Advocatícios</MenuItem>
			<Divider />
			<MenuItem onClick={() => {
				ReactGA.event({ category: 'Navigation', action: 'btnMenuApp_Inicio' });
				route('/'); toggleDrawer();
			}} >Início</MenuItem>
			<Divider />
		</div>

  </div>
);

export default Drawer;
