import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Flex, Box } from 'reflexbox';
import styled from 'styled-components';
import container from './container';
import Footer from './components/Footer';
import trix from 'trix';
import 'trix/dist/trix.css';
import { services } from '../../feathers';

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

/**
|--------------------------------------------------
| TextArea
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

const InputField = styled.input`
  background-color: white;
  border-radius: 2px;
  border: none;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  outline: none;
  box-shadow: 0px 0px 4px 0px #00000024;
`;

/**
|--------------------------------------------------
| NewRequest
|--------------------------------------------------
*/
class EditArticle extends Component {

	shouldComponentUpdate = () => false;

	getValues = () => {
			return {
				title: document.getElementById('a').value,
				text: document.getElementById('x').value,
				lawyer: store.getState().lawyerProfile.store.records[0]._id
			}
	}

	componentDidMount() {	
		services.articles.get(this.props.id).payload.promise.then(function(value) {
			var Article = value;
			document.getElementById('a').value = Article.title;
			var element = document.querySelector("trix-editor");
			element.editor.insertHTML(Article.text);
		})	
	}


	render({ patch, id }) {
		return (
			<Container>
			<CloseButton className="material-icons" onClick={() => route('/profile')} >close</CloseButton>
			<Title>Editar Artigo</Title>
			<Padding>
				<InputField id="a" type="text" name="title" label="Titulo"/>
				<input id="x" type="hidden" name="text"/>
				<trix-editor contenteditable input="x"></trix-editor>
			</Padding>

			<Footer onClick={() => {
				if(document.getElementById('a').value && document.getElementById('x').value){
					patch(id, this.getValues())
				}else{
					alert("Preencha todos os dados!");
				}
			}}/>
			</Container>
		)
	}
};

export default container(EditArticle);
