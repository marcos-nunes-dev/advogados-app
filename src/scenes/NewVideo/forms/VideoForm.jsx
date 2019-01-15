import { h, Component } from 'preact';
import { Input, RadioGroup, Dropdown } from '../../../components';
import { Field, FieldArray, FormSection, reduxForm } from 'redux-form';
import { RadioButton } from '../../../toolbox/components';
import styled from 'styled-components';
import { Card, CardText, CardTitle, CardActions, Button, IconButton } from '../../../toolbox/components';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';
import ReactDOMServer from 'react-dom/server';

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
  margin-bottom:10px;
`;

const componentConfig = { postUrl: 'no-url', iconFiletypes: ['.jpg', '.png', '.gif'] };


var djsConfig = {
	dictDefaultMessage: 'Clique para adicionar uma imagem',
	previewTemplate: ReactDOMServer.renderToStaticMarkup(
	  <div className="dz-preview dz-file-preview">
		<div className="dz-details">
				<img data-dz-thumbnail="true" width="40%"/>	
		</div>
		<div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress="true"></span></div>
		<div className="dz-error-message"><span data-dz-errormessage="true"></span></div>
	  </div>
	),
	autoProcessQueue: false
};

class VideoForm extends Component {

	 eventHandlers = { 
		addedfile: (file) => {
			let formData = new FormData();
			formData.append('uri', file);
			
			axios({
				method: 'post',
				url: 'https://mysterious-oasis-88871.herokuapp.com/common/upload',
				data: formData
			})
			.then(response => {
				this.props.onUpload(response.data.uri);
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
		}
	};

	render({ create, onUpload }) {
		return (
			<form onSubmit={create}> 
        <Field label="Insira o Título do vídeo abaixo" name="title" component={Input} type="text" /> 
      	<Field label="Insira o Link do Youtube abaixo" name="url" component={Input} type="url" /> 
        <Thumbnail>
          <DropzoneComponent config={componentConfig} eventHandlers={this.eventHandlers} djsConfig={djsConfig} />
        </Thumbnail>
      </form>	
		)
	}
};

const createReduxForm = reduxForm({
  form: 'videoForm'
});

VideoForm = createReduxForm(VideoForm);


export default VideoForm;
