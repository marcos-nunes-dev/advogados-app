import { h, Component } from 'preact';
import styled from 'styled-components';
import { route } from 'preact-router';
import { Flex, Box } from 'reflexbox';
import container from './container';
import Footer from './components/Footer';
import Toolbar from './components/Toolbar';
import {Scene} from '../../components';
import { restClient } from '../../feathers';
import sift from 'sift';
import { Dialog } from '../../toolbox/components';

/**
|--------------------------------------------------
| Nav
|--------------------------------------------------
*/

const Nav = styled(Flex)`
	width: 100%;
  height: 50px;
  background: linear-gradient(to right, rgba(83,108,254,1) 0%, rgba(103,58,183,1) 100%);
  box-shadow: inset 0px -5px 6px -6px black;
  padding: 0px 10px;
  color: #fff;
`;

const Credits = styled.div`
	background-color: #5C6BC0;
	width: 40px;
	height: 40px;
	border-radius: 100%;
	color: white;
	padding: 11px;
`;

/**
|--------------------------------------------------
| Header
|--------------------------------------------------
*/

const ChangeStatusButton = styled.div`
	text-align: center;
	padding: 10px;
	font-size: 17px;
	border-bottom: 1px solid #d4d4d4;
	border-top: 1px solid #d4d4d4;
`;

const HeaderWrapper = styled.div`
	padding: 10px;
`;

const Title = styled.div`
	font-size: 19px;
	font-weight: 500;
	margin-bottom: 5px;
`;

const Subtitle = styled.div`
	font-size: 12px;
	padding-right: 40px;
`;

const Avatar = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 100%;
`;

class Header extends Component {

	state = {
		user: null
	}

	componentDidMount() {
		const { request } = this.props;
		restClient.service('app/user-profile')
			.get(request.user)
			.then(user => {
				this.setState({user})
			})
	}
	

	render({ areaName, userName, request }) {
		return (
			<HeaderWrapper>
				<Flex>
					<Box w={1 / 5}>
						<If condition={this.state.user}>
							<Avatar src={this.state.user.photo} />
						</If>
					</Box>
					<Box w={4 / 5}>
						<Title>{areaName}</Title>
						<Subtitle>Esse usuário tem interesse em tirar duvidas e ingressar em um processo.</Subtitle>
					</Box>
				</Flex>
			</HeaderWrapper>
		);
	}
}

const DescriptionLabel = styled.div`
	padding: 15px;
	font-size: 13px;
	color: #212121;
	font-weight: 500;
`;

const Description = styled.div`
	padding: 15px;
	padding-top: 0;
	font-size: 15px;
	color: #737373;
	line-height: 1.4;
`;

const Content = styled.div`
	background-color: #fafafa;
	height: ${window.innerHeight - 178}px;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
`;

const ChangeStatus = styled.div`
	color: white;
	font-size: 12px;
`;

const status = {
	'1': 'Pendente ▾',
	'2': 'Em Andamento ▾',
	'4': 'Cancelado ▾',
	'8': 'Finalizado ▾'
}

class ServiceDetails extends Component {

	render({ request, patch, update, lawyerProfile }) {
		return (
			<Scene>
				<If condition={request}>
					<Nav justify="space-between" align="center">
						<Box onClick={() => window.history.back()}>
							<i class="material-icons">arrow_back</i>
						</Box>
					</Nav>

					<div style={{ maxWidth: 500, margin: 'auto' }} >
						<Header areaName={request.lawArea.name} userName={request.userName} request={request} />

						<Content>
							<DescriptionLabel>Descrição do Problema</DescriptionLabel>
							<Description>{request.description}</Description>
						</Content>
					</div>

					<Footer
						text="Clique e registre-se como advogado para iniciar um atendimento"
						onClick={() => route('wizard')}
					/>

				</If>
			</Scene>
		);
	}
}

export default container(ServiceDetails);
