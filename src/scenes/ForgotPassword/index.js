import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Flex, Box } from 'reflexbox';
import styled from 'styled-components';
import container from './container';
import Footer from './components/Footer';
import Input from './components/Input';
import { Switch } from '../../toolbox/components';
import { Scene } from '../../components';

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

const Explanation = styled.div`
	padding: 15px;
	text-align: center;
	font-size: 13px;
	color: #cfd0d8;
	font-weight: 500;
	margin-top:10px;
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
| Button
|--------------------------------------------------
*/

const Button = styled.div`
  text-align: center;
  background-color: #7E57C2;
  text-align: center;
  height: 55px;
  width: 100%;
  bottom: 0;
  color: white;
  line-height: 55px;
  cursor: pointer;
  margin-top:5px;
`;



/**
|--------------------------------------------------
| ResetPassword
|--------------------------------------------------
*/
class ResetPassword extends Component {

	state = {
		action: 'resetPwdShort',
		value: {
			user: { email: '' },
			token: '',
			password: ''
		},
		disabled: false
	};

	handleInputChange = (field) => ({ target }) => {
		this.setState({
			...this.state,
			value: {
				...this.state.value,
				[field]: target.value,
			}
		});
	}

	stepShow = () => {
		this.setState({
			...this.state,
			disabled: true
		});
	}

	handleInputChangeEmail = (field) => ({ target }) => {
		this.setState({
			...this.state,
			value: {
				...this.state.value,
				user: { 
					...this.state.value.user,
					[field]: target.value,
				}
			}
		});
	}


	render({ getToken, resetPassword }) {
		return (
			<Scene sync private>
				<Container>
					<CloseButton className="material-icons" onClick={() => route('/signin')} >close</CloseButton>
					<Title>Recuperar Senha</Title>
					<div style={{ maxWidth: 500, margin: 'auto' }} >
						<If condition={!this.state.disabled} >
							<Padding>
								<Input label="Insira seu E-mail" value={ this.state.value.user.email } onChange={this.handleInputChangeEmail('email')}/>
								<Button onClick={() => {
									getToken({ 
										action: 'sendResetPwd',
										value: { email: this.state.value.user.email },
										notifierOptions: { preferredComm: 'email' }, 
										});
								}}>
									Solicitar código
								</Button>
							
								<Button onClick={() => this.stepShow()}>
									Já possui o código?
								</Button>

							</Padding>
						</If>

						<If condition={this.state.disabled} >
							<Padding>	
								<Input label="Insira seu E-mail" value={ this.state.value.user.email } onChange={this.handleInputChangeEmail('email')}/>	
								<Input label="Código" value={ this.state.value.token } type="number" onChange={this.handleInputChange('token')}/>
								<Input label="Senha"  value={ this.state.value.password } type="password" onChange={this.handleInputChange('password')}/>
							</Padding>

							<Footer onClick={() => {
								resetPassword(this.state);
							}} />
						</If>
					</div>
					
				</Container>
			</Scene>
		)
	}
};

export default container(ResetPassword);
