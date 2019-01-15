import { h, Component } from 'preact';
import { route } from 'preact-router';

// setup
import container from './container';
import reducer from './redux/reducer';

// components
import { Flex, Box } from 'reflexbox';
import styled from 'styled-components';
import Footer from './components/Footer';
import Input from './components/Input';
import { Checkbox } from '../../toolbox/components';
import VideoForm from './forms/VideoForm';

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
| Warning
|--------------------------------------------------
*/

const Warning = styled.div`
	font-size: 12px;
	padding-left: 0;
	line-height: 1.2;
	color: #7b7b7b;
	text-align:center;
`;

/**
|--------------------------------------------------
| NewVideo
|--------------------------------------------------
*/

class NewVideo extends Component {

	state = {
		photo: null,
	}

	render({ form, updateForm, create, patch, id, edit, getVideo, lawyerProfile }) {
		return (
			<Container>
				<CloseButton className="material-icons" onClick={() => route('/profile')} >close</CloseButton>
				<Title>{edit ? "Editar vídeo" : "Novo vídeo"}</Title>
				<Padding>
					<div style={{ maxWidth: 500, margin: 'auto' }} >
						<VideoForm create={create} initialValues={ Object.assign( {lawyer: lawyerProfile}, getVideo(id) ) } onUpload={ photo => this.setState({photo}) }/>
						<Flex align="center">
							<Box>
								<Warning>
									Ao cadastrar, confirmo que o conteúdo é de minha autoria, não responsabilizo os Advogados por nenhuma publicação indevida
								</Warning>
							</Box>
						</Flex>
					</div>
				</Padding>
				
				<Footer onClick={() => {
					if(this.state.photo) { form.photo = this.state.photo };
					edit ? patch(id, form) : create(form);
				}}/>
			</Container>
		)
	}
};

export default container(NewVideo);
export { reducer };

