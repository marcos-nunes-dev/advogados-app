import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Flex, Box } from 'reflexbox';
import styled from 'styled-components';
import container from './container';
import { Switch } from '../../toolbox/components';
import { Scene } from '../../components';
import Form from './form';

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


class editPayment extends Component {

  render({ 	userData, patch, form, subscription, get }) {
    return (
      <Scene sync private>
        <Container>
          <CloseButton className="material-icons" onClick={() => history.back()} >close</CloseButton>
          <Title>Alterar Cartão de Crédito</Title>
          <Form  userData={userData} patch={patch} form={form} subscription={subscription}/>
        </Container>
      </Scene>
    )
  }
};

export default container(editPayment);