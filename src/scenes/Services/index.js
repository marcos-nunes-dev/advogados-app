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
import AppToolbar from '../AppToolbar';
// partials
import Empty from './partials/Empty';
// tabs
import OpenedServices from './tabs/Opened';
import InProgressServices from './tabs/InProgress';

// const Scroll = styled.div`
//   height: ${window.innerHeight - 195}px;
//   overflow-y: scroll;
//   -webkit-overflow-scrolling: touch;
// `;

const TabsWrapper = styled(Flex)`
  background-color: white;
`;

// const Credits = styled.div`
//   background-color: #5c6bc0;
//   width: 40px;
//   height: 40px;
//   border-radius: 100%;
//   color: white;
//   padding: 11px;
// `;

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

// const filters = [
//   { icon: 'search', label: 'Demissão sem justa causa' },
//   { icon: 'work', label: 'Direito Trabalhista' },
// ];

const MainContent = ({
  page,
  handleFixedTabChange,
  toggleDrawer,
  subscription,
  userData,
  ...props
}) => (
  <div>
    <TabsWrapper>
      <Box w={12 / 12}>
        <Tabs index={page.fixedIndex} onChange={handleFixedTabChange} fixed>
          <Tab label="Disponíveis" />
          <Tab label="Atendimento" />
        </Tabs>
      </Box>
    </TabsWrapper>

    <TabsContent>
      <Choose>
        <When condition={page.fixedIndex === 0}>
          {/* <Filtering filters={filters} /> */}
          <OpenedServices subscription={subscription} userData={userData} {...props} />
        </When>
        <When condition={page.fixedIndex === 1}>
          <InProgressServices subscription={subscription} userData={userData} {...props} />
        </When>
      </Choose>
    </TabsContent>
  </div>
);

const Services = ({
  userData,
  subscription,
  page,
  handleFixedTabChange,
  toggleDrawer,
  ...props
}) => (
  <Container background="#eee" paddingBottom={2}>
    <Navbar
      left={<i className="material-icons ml-10">menu</i>}
      title="Oi Advogado"
      leftClick={toggleDrawer}
    />

      <AppToolbar hideHomeWhenLawyer withPublicServices />

      <div style={{ maxWidth: 500, margin: 'auto' }}>
        <MainContent
          page={page}
            handleFixedTabChange={handleFixedTabChange}
            toggleDrawer={toggleDrawer}
            userData={userData}
            subscription={subscription}
          {...props}
        />
      </div>

    </Container>
  );

export default container(Services);
export { reducer };
