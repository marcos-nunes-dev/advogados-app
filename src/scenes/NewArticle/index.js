import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Flex, Box } from 'reflexbox';
import styled from 'styled-components';
import container from './container';
import Footer from './components/Footer';
import Input from './components/Input';
import trix from 'trix';
import 'trix/dist/trix.css';
import snackbar from 'node-snackbar';
import striptags from 'striptags';
import RichTextArea from 'preact-richtextarea';
import sanitizeHtml from 'sanitize-html';
import {Dialog} from "../../toolbox/components";
import ProblemItem from "../Home/components/ProblemItem";
import {SectionStandardButton as ToggleDialogButton} from "../Home/SectionComponents";
window.sanitizeHtml = sanitizeHtml;


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

/**
 |--------------------------------------------------
 | HtmlTextarea
 |--------------------------------------------------
 */
const HtmlTextArea = styled(RichTextArea)`
	padding: 15px;
	width: 100%;
	height: ${window.innerHeight - 300}px;
	font-size: 16px;
	outline: none;
	-webkit-appearance: none;
	border: none!important;
	resize: none!important;
	box-shadow: 0px 0px 4px 0px #00000024;
`;

const TextArea = styled.textarea`
	padding: 15px;
	width: 100%;
	height: ${window.innerHeight - 300}px;
	font-size: 16px;
	outline: none;
	-webkit-appearance: none;
	border: none!important;
	resize: none!important;
	box-shadow: 0px 0px 4px 0px #00000024;
`;

const Warning = styled.div`
	font-size: 13px;
	padding: 10px;
	line-height: 1.2;
	color: #7b7b7b;
	background: #f6f6f6;
	width:100%;
	outline: none;
	box-shadow: 0px 0px 4px 0px #00000024;
	font-weight:500;
`;

/**
 |--------------------------------------------------
 | NewRequest
 |--------------------------------------------------
 */
class NewArticle extends Component {

	state = {
		title: '',
		link: '',
		html: '',
		text: ''
	}

	handleChange = (fieldname) => ({target}) => {
		this.setState({
			[fieldname]: target.value
		})
	}

	TextChange = (fieldname) => ({target}) => {
		this.setState({
			[fieldname]: sanitizeHtml(target.outerHTML)
		});
	}

	onTextareaChange = (text) => {
		this.setState({text})
	}

	state = {
		dialogActive: false,
	};

	hiddenAreaLabel = false;

	toggleDialog = () => {
		this.setState((prevState) => ({ dialogActive: !prevState.dialogActive }))
	}

	render({ form, create, patch, id, edit, lawyerProfile, lawAreas, setArea }, { html }) {
		const { dialogActive } = this.state;
		return (
			<Container>
				<CloseButton className="material-icons" onClick={() => route('/profile')} >close</CloseButton>
				<Title>Novo Artigo</Title>

				<div style={{ maxWidth: 500, margin: 'auto' }} >
					<Padding>
						<span onClick={this.toggleDialog}>
							Área
						</span>
						<div>
							<Dialog
								title="Áreas do Direito"
								active={dialogActive}
								onEscKeyDown={this.toggleDialog}
								onOverlayClick={this.toggleDialog}
								style={{ height: 345 }}
							>
                    <span
						style={{
							cursor: 'pointer',
							position: 'absolute',
							top: 10,
							right: 30
						}}
						onClick={this.toggleDialog}
					>
                        x
                    </span>
								<div style={{ height: 345, overflowY: 'scroll' }}>

									{lawAreas.map((item) => (
										<ProblemItem
											onClick={() => {
												this.state.area_id = item;
												this.toggleDialog();
												this.state.area_name = item.name;
												this.hiddenAreaLabel = true;
											}}
											label={item.name}
											style={{ color: 'black' }}
										/>
									))}
								</div>
							</Dialog>
						</div>
						<h4 onClick={this.toggleDialog}><p style={ this.hiddenAreaLabel ? "display:none;" : "display:block;"}>Não informado</p>{this.state.area_name}</h4>

						<Input label="Título" value={this.state.title} onChange={this.handleChange('title')} />
						<p> Escreva ou cole seu artigo aqui: </p>
						<TextArea value={this.state.text} onChange={({target}) => this.onTextareaChange(target.value)} />
						{/* <HtmlTextArea label="Link" value={this.state.html} onInput={ this.TextChange('html') } /> */}
					</Padding>
				</div>

				<Footer onClick={() => {
					create({
						lawyer: lawyerProfile._id,
						area: this.state.area_id,
						title: this.state.title,
						link: null,
						content: this.state.text
					})
					// console.log(this.state)
				}} />

			</Container>
		)
	}
};

export default container(NewArticle);
