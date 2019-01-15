import { h, Component } from 'preact';
import { route } from 'preact-router';
import styled from 'styled-components';
import container from './container';
import { Input, Dropdown } from '../../toolbox/components';
import Footer from './components/Footer';
import { Scene } from '../../components';
import omit from 'lodash/omit';
import ReactGA from 'react-ga';

/**
|--------------------------------------------------
| Container
|--------------------------------------------------
*/

const Container = styled.div`
	height: ${window.innerHeight}px;
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
| Subtitle
|--------------------------------------------------
*/

const Subtitle = styled.div`
	padding: 15px;
	text-align: center;
	font-size: 20px;
	color: #7986cb;
	background-color: #fafafa;
	margin-top: 10px;
`;

/**
|--------------------------------------------------
| Textarea
|--------------------------------------------------
*/

const Textarea = styled.textarea`
	padding: 15px;
	width: 100%;
	height: ${window.innerHeight - 196}px;
	font-size: 16px;
	outline: none;
	-webkit-appearance: none;
	border: none;
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
| NewRequest
|--------------------------------------------------
*/
class NewRequest extends Component {


	constructor(props) {
		super(props);

		this.state = {
			lawArea: props.selectedArea,
			description: '',
			areas: [],
			loaded: false
		};
	}



	handleAreaChange = (value) => {
		this.setState({ lawArea: value });
	};

	load = (lawAreas) => {
		if (!this.state.loaded) {
			const areas = lawAreas.map(item => ({ label: item.name, value: item._id }));
			this.setState({
				areas,
				loaded: true
			})
		}
	};

	render({ lawAreas, save, isUserSignedIn }) {
		return (
			<Scene sync private>
				<Container>
					<CloseButton className="material-icons" onClick={() => route('/home')} >close</CloseButton>
					<Title>Compartilhar Dúvida</Title>
					<Subtitle>
						Detalhe o problema<br />
						que você está enfrentando
					</Subtitle>

					<div style={{ maxWidth: 500, margin: 'auto' }} >
						<Padding>
							<If condition={lawAreas && lawAreas.length}>
								{this.load(lawAreas)}
								<Dropdown
									label="Área"
									source={this.state.areas}
									onChange={this.handleAreaChange}
									value={this.state.lawArea}
								/>
							</If>
						</Padding>
						<Textarea placeholder="Sua dúvida ou problema" onChange={({ target }) => this.setState({ description: target.value })} />
					</div>

					<Footer onClick={() => {
						ReactGA.event({ category: 'Navigation', action: 'Enviar_Duvida' });

						if (isUserSignedIn)
							save(omit(this.state, ['areas', 'loaded']));
						else {
							window.PENDING_NEW_REQUEST = omit(this.state, ['areas', 'loaded']);
							route('/search');
						}
					}} />
				</Container>
			</Scene>
		)
	}
};

export default container(NewRequest);
