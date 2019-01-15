import { h } from 'preact';
import { route } from 'preact-router';
import container from './container';
import reducer from './redux/reducer';
import styled from 'styled-components';
import { Tab, Tabs } from '../../toolbox/components';
import { Flex, Box } from 'reflexbox';
import get from 'lodash/get';
import Container from '../../components/Container';
import Navbar from '../../components/Navbar';
import Header from './components/Header';
import PersonList from './components/PersonList';
import PersonListItem from './components/PersonListItem';
import Filtering from './components/Filtering';
import AppToolbar from '../AppToolbar';
// partials
import Empty from './partials/Empty';
// tabs
import OpenedServices from './tabs/Opened';
import InProgressServices from './tabs/InProgress';

const Scroll = styled.div`
	height: ${window.innerHeight - 90}px;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
`;

const MainBox = styled.div`
	height: ${window.innerHeight - 90}px;
`;

const TabsWrapper = styled(Flex)`
	background-color: white;
`;

const Credits = styled.div`
	background-color: #5C6BC0;
	width: 40px;
	height: 40px;
	border-radius: 100%;
	color: white;
	padding: 11px;
`;

/**
|--------------------------------------------------
| TabsContent
|--------------------------------------------------
*/

const TabsContent = styled.div`
	height: ${window.innerHeight - 90}px;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	background: rgba(92, 107, 192, 0.02);
`;

/**
|--------------------------------------------------
| Component
|--------------------------------------------------
*/

const filters = [
	{ icon: 'search', label: 'Demissão sem justa causa' },
	{ icon: 'work', label: 'Direito Trabalhista' }
];

const MainContent = ({ page, handleFixedTabChange, toggleDrawer, ...props }) => (
	<MainBox>
		<OpenedServices {...props} />
	</MainBox>
);

const Services = ({ page, handleFixedTabChange, toggleDrawer, ...props }) => (
	<Container background="#eee" paddingBottom={2}>
		<Navbar
			left={<i class="material-icons ml-10">menu</i>}
			title="Oi Advogado"
			leftClick={toggleDrawer}
		/>

		<AppToolbar withPublicServices />

		<div style={{ maxWidth: 500, margin: 'auto' }} >
			<MainContent
				page={page}
				handleFixedTabChange={handleFixedTabChange}
				toggleDrawer={toggleDrawer}
				{...props}
			/>
		</div>

	</Container>
);

export default container(Services);
export { reducer };
