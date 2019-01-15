import { h } from 'preact';
import styled from 'styled-components';
import container from './container';
import { Flex, Box } from 'reflexbox';

const CloseButton = styled.i`
	font-size: 30px !important;
	position: absolute;
	left: 10px;
	top: 10px;
	cursor: pointer;
`;

const Wrapper = styled.div`
	background-color: #f5f5f5;
	min-height: ${window.innerHeight}px;
`;

const Title = styled.h2`
	margin: 0;
	color: #212121;
	padding: 20px;
	padding-top: 70px;
	font-size: 22px;
`;

/**
|--------------------------------------------------
| Item
|--------------------------------------------------
*/

const List = styled.div`
	padding: 20px;
	color: #909090;
	font-size: 14px;
`;

const Item = ({label, number}) => (
	<Flex justify="space-between" style={{padding: '15px 0'}} >
		<Box>
			{label}
		</Box>
		<Box>
			{number}
		</Box>
	</Flex>
);

/**
|--------------------------------------------------
| COMPONENT
|--------------------------------------------------
*/

const FrequentProblems = () => (
	<Wrapper>
		<CloseButton className="material-icons">close</CloseButton>
		<Title>Problemas mais frequentes esse mês</Title>

		<List>
			<Item label="Pensão atrasada" number={23043}/>
			<Item label="Pensão atrasada" number={23043}/>
			<Item label="Pensão atrasada" number={23043}/>
			<Item label="Pensão atrasada" number={23043}/>
			<Item label="Pensão atrasada" number={23043}/>
			<Item label="Pensão atrasada" number={23043}/>
			<Item label="Pensão atrasada" number={23043}/>
			<Item label="Pensão atrasada" number={23043}/>
			<Item label="Pensão atrasada" number={23043}/>
			<Item label="Pensão atrasada" number={23043}/>
			<Item label="Pensão atrasada" number={23043}/>
		</List>
	</Wrapper>
);

export default container(FrequentProblems);
