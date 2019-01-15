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
| ResetPassword
|--------------------------------------------------
*/
class ResetPassword extends Component {

	state = {
		action: 'passwordChange',
		value: {
			user: { email: '' },
			oldPassword: '',
			password: ''
		}
	};

	handleInputChange = (field) => ({ target }) => {
		console.log(this.props.userProfile.email);
		this.setState({
			...this.state,
			value: {
				...this.state.value,
				[field]: target.value,
				user: { email: this.props.userProfile.email}
			}
		});
	}


	render({ save, userProfile }) {
		return (
			<Scene sync private>
				<Container>
					<CloseButton className="material-icons" onClick={() => route('/home')} >close</CloseButton>
					<Title>Mudar Senha</Title>
						<Padding>
							<div style={{ maxWidth: 500, margin: 'auto' }} >
								<Input label="Senha antiga" value={this.state.value.oldPassword} type="password" onChange={this.handleInputChange('oldPassword')}/>
								<Input label="Senha nova"  value={this.state.value.password} type="password" onChange={this.handleInputChange('password')}/>
							</div>
						</Padding>
						
						<Footer onClick={() => {
							save( this.state );
						}} />
					
				</Container>
			</Scene>
		)
	}
};

export default container(ResetPassword);
