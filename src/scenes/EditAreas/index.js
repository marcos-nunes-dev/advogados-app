import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Flex, Box } from 'reflexbox';
import styled from 'styled-components';
import container from './container';
import Footer from './components/Footer';
import Input from './components/Input';
import { Autocomplete } from '../../toolbox/components';
import { Scene } from '../../components';
import get from 'lodash/get';

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
	background: #fafafa;
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
	height: 100px;
	font-size: 13px;
	outline: none;
	-webkit-appearance: none;
	border: none;
	margin-bottom: 65px;
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

const mapToDropdown = (areas) =>
	areas.reduce((state, curr) => {
		return {
			...state,
			[curr._id]: curr.name
		};
	},{})

class EditInfos extends Component {

	state = {
		values: [],
		loaded: false
	};

	handleMultipleChange = (value) => {
		const maxAreas = get(this.props, 'lawyerProfile.planConfig.maxAreas', 3);
		if (value.length <= maxAreas) {
			this.setState({ values: value });
		} else {
			alert(`Você só pode adicionar ${maxAreas} áreas.`);
		}
	};

	componentDidMount() {
		setTimeout(() => {
			const { lawyerProfile } = this.props;
			console.log(lawyerProfile)
			this.setState({ values: lawyerProfile.areas });
		}, 1000);
	}

	load() {
		if (!this.state.loaded) {
			const { lawyerProfile } = this.props;
			this.setState({ values: lawyerProfile.areas, loaded: true });
		}
	}

	render({ lawAreas, lawyerProfile, save }) {
		return (
			<Scene>
				<Container>
					<CloseButton className="material-icons" onClick={() => route('/profile')} >close</CloseButton>
					
					<Title>Áreas de Atuação</Title>

					<div style={{ maxWidth: 500, margin: 'auto' }} >
						<If condition={lawyerProfile && lawyerProfile.areas}>
							{this.load()}
							<Padding>
								<Autocomplete
									direction="down"
									onChange={this.handleMultipleChange}
									label="Selecione as Área de Atuação"
									source={mapToDropdown(lawAreas)}
									value={this.state.values}
								/>
							</Padding>
						</If>
					</div>


					<Footer onClick={() => {
						save(lawyerProfile._id, { areas: this.state.values });
					}} />
				</Container>
			</Scene>
		)
	}
};

export default container(EditInfos);
