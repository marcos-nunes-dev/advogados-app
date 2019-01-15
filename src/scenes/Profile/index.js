import { h } from 'preact';
import styled from 'styled-components';
import { route } from 'preact-router';
import reducer from './redux/reducer';
import container from './container';
import v from '../../variables';
import get from 'lodash/get';

// Components
import { Scene } from '../../components';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from '../../toolbox/components';
import { Tab, Tabs } from '../../toolbox/components';
import { Flex, Box } from 'reflexbox';
import FontIcon from 'react-toolbox/lib/font_icon';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import AddTabs from './components/AddTabs';
import LinkedinButton from './components/LinkedinButton';
import axios from 'axios';



// Tabs
import About from './tabs/About';
import Articles from './tabs/Articles';
import Videos from './tabs/Videos';



/**
|--------------------------------------------------
| TabsContent
|--------------------------------------------------
*/

const tabHeight = window.innerHeight - 302;

const TabsContent = styled.div`
	height: ${tabHeight}px;
	overflow-y: scroll;
	background: rgba(92, 107, 192, 0.02);
	z-index: 1;
`;

const TabsHeader = styled(Tabs)`
	padding-left: 20px;
	padding-right: 20px;
	box-shadow: 0 5px 5px -5px ${v.mc.indigo._50};
	z-index: 10000;
`;

/**
|--------------------------------------------------
| Profile
|--------------------------------------------------
*/

const Profile = ({ page, handleFixedTabChange, userData, userProfile, editLawyer, editUser, lawyerProfile, videos, removeVideo, articles, removeArticle, ...props }) => (
	<Scene sync private>

		<If condition={userProfile && lawyerProfile}>
			<Header
				name={userProfile.name}
				userId={userProfile._id}
				lawyerProfile={lawyerProfile}
				id={lawyerProfile._id}
				oab={lawyerProfile.oab}
				address={`${lawyerProfile.location.address.city} - ${lawyerProfile.location.address.state}`}
				editLawyer={editLawyer}
				editUser={editUser}
				photo={userProfile.photo}
			/>

			<br />
			<TabsHeader index={page.fixedIndex} onChange={handleFixedTabChange} fixed>
				<Tab label='Sobre' userData={userProfile} />
				<Tab label='Artigos' />
				<Tab label='Vídeos' />
			</TabsHeader>
		
			
			<TabsContent>
				<Choose>
					<When condition={page.fixedIndex == 0} >
						{/* <LinkedinButton authenticate={authenticate} title="Facilite o preenchimento do seu perfil, clique aqui pra vincular sua conta do linkedin"/> */}
						<div style={{ maxWidth: 500, margin: 'auto' }} >
							<About profile={lawyerProfile} {...props} />
						</div>
					</When>
					<When condition={page.fixedIndex == 1} >
						<div style={{ maxWidth: 500, margin: 'auto' }} >
							{console.log(lawyerProfile)}
							<AddTabs title="Escreva um novo artigo" link={get(lawyerProfile, 'subscription') || get(lawyerProfile, 'planConfig.maxArticles', 1) > articles.length ? '/newarticle' : '/payment'} icon="add"/>
							<Articles articles={articles} removeArticle={removeArticle}/>
						</div>
					</When>
					<When condition={page.fixedIndex == 2} >
						<div style={{ maxWidth: 500, margin: 'auto' }} >
							<AddTabs title="Adicionar novo vídeo" link={get(lawyerProfile, 'subscription') || get(lawyerProfile, 'planConfig.maxVideos', 1) > videos.length ? '/newvideo' : '/payment'} icon="add"/>
							<Videos videos={videos} removeVideo={removeVideo} />
						</div>
					</When>
				</Choose>
			</TabsContent>

			<Toolbar profile={lawyerProfile} />

		</If>
	</Scene>
);

export default container(Profile);
export { reducer };


