import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Flex, Box } from 'reflexbox';
import styled from 'styled-components';
import container from './container';
import Footer from './components/Footer';
import Input from './components/Input';
import { Switch } from '../../toolbox/components';
import { Scene } from '../../components';
import InputEditMask from 'react-editmask';

/**
|--------------------------------------------------
| Container
|--------------------------------------------------
*/

const Container = styled.div`
	height: ${window.innerHeight}px;
	background-color: #fafafa;
`;

/**
|--------------------------------------------------
| CloseButon
|--------------------------------------------------
*/

const CloseButton = styled.i`
	position: absolute;
	left: 15px;
	top: 15px;
	font-size: 30px;
	cursor: pointer;
`;

/**
|--------------------------------------------------
| Title
|--------------------------------------------------
*/

const Title = styled.div`
	padding: 15px;
	text-align: center;
	font-size: 22px;
	color: #7986cb;
	font-weight: 500;
`;


/**
|--------------------------------------------------
| Padding
|--------------------------------------------------
*/

const Padding = styled.div`
	padding: 15px;
	padding: ${p => p.value}px;
`;

/**
|--------------------------------------------------
| Thumnail
|--------------------------------------------------
*/

const Thumbnail = styled.div`
	text-align: center;
	padding: 70px 0px;
	border: 1px solid #e8e8e8;
	color: #969696;
	font-size: 14px;
	border-radius: 2px;
`;

/**
|--------------------------------------------------
| Warning
|--------------------------------------------------
*/

const Warning = styled.div`
	font-size: 13px;
	padding-left: 10px;
	line-height: 1.2;
	color: #7b7b7b;
`;

const Textarea = styled.textarea`
	padding: 15px;
	width: 100%;
	height: ${window.innerHeight - 196}px;
	font-size: 16px;
	outline: none;
	-webkit-appearance: none;
	border: none;
`;

const Label = styled.div`
	margin: 20px 0px 20px;
  font-size: 13px;
`;

/**
|--------------------------------------------------
| NewRequest
|--------------------------------------------------
*/
class NewContacts extends Component {

	state = {
		config: {
			showChat: true,
			showPhone: true,
			showSkype: true,
			showWhatsapp: true
		},
		contacts: {
			phone: '',
			skype: '',
			whatsapp: ''
		},
		loaded: false
	};

	handleSwitchChange = (field, value) => {
		this.setState({
			...this.state,
			config: {
				...this.state.config,
				[field]: value
			}
		});
	};

	handleInputChange = (field) => ({ target }) => {
		this.setState({
			...this.state,
			contacts: {
				...this.state.contacts,
				[field]: target.value
			}
		});
	}

	load() {
		if (!this.state.loaded) {
			const { lawyerProfile } = this.props;
			this.setState({
				contacts: lawyerProfile.contacts,
				config: lawyerProfile.config,
				loaded: true
			});
		}
	}

	serializeNumbers = (number = '') => {
		return number.replace(/\(/, '').replace(/\)/, '').replace(/-/, '').replace(/ /, '');
	}


	render({ lawyerProfile, save }) {
		return (
			<Scene sync private>
				<Container>
					<CloseButton className="material-icons" onClick={() => route('/profile')} >close</CloseButton>
					<Title>Contatos</Title>

					<div style={{ maxWidth: 500, margin: 'auto' }} >
						<If condition={lawyerProfile && lawyerProfile.contacts} >
							{this.load()}
							<Padding>
								{/* <Input label="Skype" value={this.state.contacts.skype} onChange={this.handleInputChange('skype')} /> */}
								<Input mask='/(dd/) d?dddd-dddd' label="Telefone" value={this.serializeNumbers(this.state.contacts.phone)} onChange={this.handleInputChange('phone')}/>
								<Input mask='/(dd/) d?dddd-dddd' label="Whatsapp" value={this.serializeNumbers(this.state.contacts.whatsapp)} onChange={this.handleInputChange('whatsapp')}/>

								<Label>
									Deixar contatos visíveis
								</Label>

								<Switch
									checked={this.state.config.showChat}
									label="Aplicativo Oi Advogados"
									onChange={this.handleSwitchChange.bind(this, 'showChat')}
								/>
								<Switch
									checked={this.state.config.showSkype}
									label="Skype"
									onChange={this.handleSwitchChange.bind(this, 'showSkype')}
								/>
								<Switch
									checked={this.state.config.showPhone}
									label="Telefone"
									onChange={this.handleSwitchChange.bind(this, 'showPhone')}
								/>
								<Switch
									checked={this.state.config.showWhatsapp}
									label="Whatsapp"
									onChange={this.handleSwitchChange.bind(this, 'showWhatsapp')}
								/>

							</Padding>
							
							<Footer onClick={() => {
								save(lawyerProfile._id, this.state);
							}} />
						</If>
					</div>
					
				</Container>
			</Scene>
		)
	}
};

export default container(NewContacts);
