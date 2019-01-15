import { h, Component } from 'preact';
import styled from 'styled-components';
import { route } from 'preact-router';
import reducer from './redux/reducer';
import container from './container';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Footer from './components/Footer';
import v from '../../variables';

// Components
import { Scene } from '../../components';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from '../../toolbox/components';
import { Tab, Tabs } from '../../toolbox/components';
// Tabs
import About from './tabs/About';
import Articles from './tabs/Articles';
import Videos from './tabs/Videos';
import Reviews from './tabs/Reviews';
import ReactGA from 'react-ga';
import get from 'lodash/get';



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
// name, photo, oab, stars, address

class Profile extends Component {
	
	componentDidMount() {
		const { getLawyer, id, article } = this.props;
		
		
		getLawyer({
			query: {
				_id: id,
				$populate: [
					'user',
					'videos',
					'articles'
				]
			}
		});

		ReactGA.event({ category: 'Navigation', action: `AdvPerfil_visualizar` });
		
	}
	

	render({ page, handleFixedTabChange, id, userData, getLawyer, result, getArticle, ...props }) {

		return (
			<Scene sync>
				<If condition={result && result.data.length}>
					<With userProfile={result.data[0].user} lawyerProfile={result.data[0]}>


						<If condition={userProfile && lawyerProfile}>
							<Header
								lawyerProfile={lawyerProfile}
								name={userProfile.name}
								photo={userProfile.photo}
								oab={lawyerProfile.oab}
								address={`${lawyerProfile.location.address.city} - ${lawyerProfile.location.address.state}`}
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
										<div style={{ maxWidth: 500, margin: 'auto' }} >
											<About profile={lawyerProfile} {...props} />
										</div>
									</When>
									<When condition={page.fixedIndex == 1} >
										<div style={{ maxWidth: 500, margin: 'auto' }} >
											<Articles getArticle={getArticle} articles={get(result, 'data[0].articles')}/>
										</div>
									</When>
									<When condition={page.fixedIndex == 2} >
										<div style={{ maxWidth: 500, margin: 'auto' }} >
											<Videos videos={result.data[0].videos}/>
										</div>
									</When>
								</Choose>
							</TabsContent>

							<If condition={store.getState().authentication.isSignedIn}>
								<Toolbar profile={lawyerProfile} userProfile={userData} onClick={() => {
									ReactGA.event({ category: 'Navigation', action: 'Btn_Contato_Adv_JaLogado' });
								}}  />
							</If>

							<If condition={!store.getState().authentication.isSignedIn}>
								<Footer
									text="Clique e cadastre-se para entrar em contato com o advogado"
									onClick={() => {
										ReactGA.event({ category: 'Navigation', action: 'Btn_Contato_Adv_NaoLogado' });
										window.redirectToLawyer = lawyerProfile._id;
										route('signup');
									}}
								/>
							</If>

						</If>
					</With>
				</If>
			</Scene>
		);
	}
}

export default container(Profile);
export { reducer };
