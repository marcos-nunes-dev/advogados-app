import { h } from 'preact';
import { route } from 'preact-router';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';
import get from 'lodash/get';
import container from './container';
import reducer from './redux/reducer';
import { Tab, Tabs } from '../../toolbox/components';
import Container from '../../components/Container';
import Navbar from '../../components/Navbar';
import Header from './components/Header';
import PersonList from './components/PersonList';
import PersonListItem from './components/PersonListItem';
import Filtering from './components/Filtering';
import AppToolbar from '../AppToolbar';
import Footer from './components/Footer';

// partials
import Empty from './partials/Empty';
import InProgressServices from './partials/InProgress';

const Scroll = styled.div`
  height: ${window.innerHeight - 195}px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

const TabsWrapper = styled(Flex)`
  background-color: white;
`;

const Credits = styled.div`
  background-color: #5c6bc0;
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
  height: ${window.innerHeight - 138}px;
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
  { icon: 'work', label: 'Direito Trabalhista' },
];

const Services = ({ toggleDrawer, requests }) => (
  <Container background="#fafafa" paddingBottom={2}>
    <Navbar
      left={<i className="material-icons ml-10">menu</i>}
      title="Oi Advogado"
      leftClick={toggleDrawer}
    />

    <AppToolbar />

    <Choose>
      <When condition={requests.length}>
        <div style={{ maxWidth: 500, margin: 'auto' }}>
          <InProgressServices requests={requests} />
        </div>
        <Footer onClick={() => route('/newrequest')} />
      </When>
      <Otherwise>
        <Empty onButtonClick={() => route('/newrequest')} />
      </Otherwise>
    </Choose>
  </Container>
);

export default container(Services);
export { reducer };
