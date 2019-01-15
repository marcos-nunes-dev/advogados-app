import { h, Component } from 'preact';
import styled from 'styled-components';
import { route } from 'preact-router';
import reducer from './redux/reducer';
import container from './container';
import get from 'lodash/get';

// Components
import { Scene } from '../../components';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from '../../toolbox/components';
import { Tab, Tabs } from '../../toolbox/components';
import { Flex, Box } from 'reflexbox';
import FontIcon from 'react-toolbox/lib/font_icon';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import AddTabs from './components/AddTabs';
import { Dialog } from '../../toolbox/components';
import Terms from '../Terms';

/**
|--------------------------------------------------
| TabsContent									  |
|--------------------------------------------------
*/

const tabHeight = window.innerHeight - 302;

const TabsContent = styled.div`
	height: ${tabHeight}px;
	overflow-y: scroll;
	background: rgba(92, 107, 192, 0.02);
`;

/**
|--------------------------------------------------
| Divider									  |
|--------------------------------------------------
*/

const Divider = styled.div`
	border-bottom: 2px solid #f7f7f7;
	margin: 10px 0;
`;

/**
|--------------------------------------------------
| MenuItem									  |
|--------------------------------------------------
*/

const MenuItem = styled.div`
	color: #9b9b9b;
	padding: 10px 25px;
	font-size: 14px;
`;

const linkStyle = {
	color: 'inherit',
	textDecoration: 'none'
}

/**
|--------------------------------------------------
| Profile										  |
|--------------------------------------------------
*/

class Profile extends Component {

	state = {
		active: false
	};

	handleToggle = () => {
		this.setState({ active: !this.state.active });
	}

	render({ page, handleFixedTabChange, userData, userProfile, videos, removeVideo, articles, removeArticle, editUser, ...props }) {
		return (
			<Scene sync private>
				<If condition={userProfile}>
					<Header
						photo={userProfile.photo}
						editUser={editUser}
						id={userProfile._id}
						name={userProfile.name}
					/>
					<br />

					<div style={{ maxWidth: 500, margin: 'auto' }} >
						<Divider />

						<MenuItem onClick={() => { route('/resetpassword') }}>Mudar de senha</MenuItem>

						<Divider />
						<MenuItem onClick={this.handleToggle} >Termos de Uso e Política de Privacidade</MenuItem>
						<MenuItem >
							<Choose>
								<When condition={get(window, 'cordova.plugins.email')}>
									<span
										onClick={() => {
											const data = {
												to: ['ajuda@oiadvogado.com.br'],
												subject: 'Suporte Oi Advogado',
												body: "",
												isHtml: true
											};
											window.cordova.plugins.email.open(data, function () {
												console.log('email callback');
											})
										}}
									>
										Suporte Helena
									</span>
								</When>
								<Otherwise>
									<a style={linkStyle} href="mailto:ajuda@oiadvogado.com.br?Subject=Suporte%20Oi%20Advogado" target="_top">
										Suporte Helena
									</a>
								</Otherwise>
							</Choose>
						</MenuItem>
					</div>

					<Dialog
						active={this.state.active}
						onEscKeyDown={this.handleToggle}
						onOverlayClick={this.handleToggle}
						title='Termos de Uso'
						actions={[{ label: "OK", onClick: this.handleToggle }]}
					>
						<Terms />
					</Dialog>


				</If>
			</Scene>
		);
	}
}

export default container(Profile);
export { reducer };
