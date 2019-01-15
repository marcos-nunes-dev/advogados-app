import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Flex, Box } from 'reflexbox';
import styled from 'styled-components';
import container from './container';
import Footer from './components/Footer';
import Input from './components/Input';
import { Checkbox } from '../../toolbox/components';
import { change, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';
import ReactDOMServer from 'react-dom/server';


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
	padding: 10px 10px;
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

const componentConfig = { postUrl: 'no-url', iconFiletypes: ['.jpg', '.png', '.gif'] };

const eventHandlers = { 
	addedfile: (file) => {
		let formData = new FormData();
		formData.append('uri', file);
		
		axios({
			method: 'post',
			url: 'https://mysterious-oasis-88871.herokuapp.com/common/upload',
			data: formData
		})
		.then(response => {
			console.log(response);
		})
		.catch(error => {
			console.log(error);
		});
	}
};

var djsConfig = {
	previewTemplate: ReactDOMServer.renderToStaticMarkup(
	  <div className="dz-preview dz-file-preview">
		<div className="dz-details">
			<Thumbnail>
				<img data-dz-thumbnail="true" width="100%"/>	
			</Thumbnail>
		</div>
		<div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress="true"></span></div>
		<div className="dz-error-message"><span data-dz-errormessage="true"></span></div>
	  </div>
	),
	autoProcessQueue: false
  };

/**
|--------------------------------------------------
| NewRequest
|--------------------------------------------------
*/
class Upload extends Component {

	render({ upload }) {
		return (
			<Container>
				<CloseButton className="material-icons" onClick={() => route('/profile')} >close</CloseButton>
				<Title>Upload</Title>
				
				<Padding>

				 <DropzoneComponent config={componentConfig}
                       eventHandlers={eventHandlers}
                       djsConfig={djsConfig} />
					<br/>
					
				</Padding>
				
			</Container>
		)
	}
};

export default container(Upload);

