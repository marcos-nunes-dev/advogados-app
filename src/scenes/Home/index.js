import { h, Component } from 'preact';
import ReactGA from 'react-ga';
import { Link, route } from 'preact-router';
import styled from 'styled-components';
import get from 'lodash/get';
import snakeCase from 'lodash/snakeCase';
import { orderBy } from 'lodash';
import { remove as removeDiacritics } from 'diacritics';
import container from './container';
import { restClient } from '../../feathers';

import Container from '../../components/Container';
import Navbar from '../../components/Navbar';
import AppToolbar from '../AppToolbar';


import SearchSection from './SearchSection';
import LawAreasSection from './LawAreasSection';
import CommonProblemSection from './CommonProblemsSection';
import ProblemNotFoundSection from './ProblemNotFoundSection';
import navigationHelperActions from '../../redux/reducers/navigation_helper/actions';

const Box = styled.div`
  text-align: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 10px;
  padding: 10px;
`;

/**
 |--------------------------------------------------
 | BG
 |--------------------------------------------------
 */

const Bg = styled.div`
  background-color: #5c6bc0;
  background-attachment: fixed;
  min-height: ${window.innerHeight - 90}px;
  background-image: url('assets/images/bg.jpg');
  background-size: cover;
  background-position: center;
`;


const Divider = styled.hr`
  margin-top: 70px;
  margin-bottom: 70px;
`;


/**
 |--------------------------------------------------
 | Helpers
 |--------------------------------------------------
 */

const mapTerms = list => list.reduce((state, curr) => {
  const terms = get(curr, 'terms', []);
  const mappedTerms = terms.map(term => ({
    term: term.title,
    termId: term._id,
    area: curr.name,
    id: curr._id,
    searches: term.searches || 0,

  }));
  return [...state, ...mappedTerms];
}, []);

const filterTerms = (areas, text, getNum) => {
  if (!text && typeof getNum === 'undefined') return [];

  const terms = mapTerms(areas);

  const searchQuery = removeDiacritics(text)
    .toLowerCase()
    .split(' ')
    .map((s) => new RegExp(`.*${s}.*`, 'i'));

  const result = terms.filter(({ term, area }) => {
    const normalizedTerm = removeDiacritics(term).toLowerCase();
    const normalizedArea = removeDiacritics(area).toLowerCase();

    return searchQuery.some((q) => q.test(normalizedTerm) || q.test(normalizedArea));
  });

  const orderedResult = orderBy(result, 'searches', 'desc');
  return getNum === 0
    ? orderedResult
    : orderedResult.slice(0, getNum || 13);
};

const onSignUpBySearchClick = () => {
  store.dispatch(navigationHelperActions.changeAuthRoute('/home'));
};

let UnsignedUserPanel = () => (
  <Box style={{ backgroundColor: '#DEDEEF', padding: '16px 45px' }}>
    <h2>
      {window.PENDING_NEW_REQUEST ? 'Dúvida postada com sucesso' : 'Que pena, você não está cadastrado!'}
    </h2>
    <h3>
      {window.PENDING_NEW_REQUEST ? (
        <span>
          Seu problema está a um passo de ser visualizado pelos advogados, você só precisa se
          {' '}
          <Link href="/signup" onClick={onSignUpBySearchClick}>cadastrar</Link>
          {' '}
              ou fazer
          {' '}
          <Link href="/signin" onClick={onSignUpBySearchClick}>login</Link>
          {' '}
              no sistema!
        </span>
      ) : (
        <span>
          Para visualizar a lista de advogados, se
          {' '}
          <Link href="/signintype" onClick={onSignUpBySearchClick}>cadastre</Link>
          {' '}
              ou faça
          {' '}
          <Link href="/signin" onClick={onSignUpBySearchClick}>login</Link>
          {' '}
              no sistema!
        </span>
      )}
    </h3>
  </Box>
);

UnsignedUserPanel = styled(UnsignedUserPanel)`
  & > h2 {
    color: #411f51;
    font-weight: bold;
  }
  & > h3 {
    color: #444;
  }
`;


/**
 |--------------------------------------------------
 | COMPONENT
 |--------------------------------------------------
 */


class Search extends Component {
  state = {
    areas: [],
    canShow: false,
  };

  onProblemSearch = (searchQuery) => {
    this.setState({
      areas: filterTerms(this.props.lawAreas, searchQuery),
    });
  };

  incrementSearch = item => {
    const Areas = restClient.service('app/law-areas');

    const query = {
      _id: item.id,
      'terms._id': item.termId,
    };

    const data = {
      $inc: { 'terms.$.searches': 1 },
    };

    Areas.patch(null, data, { query });
  };

  goToArea = (area = {}) => {
    if (area.term) {
      ReactGA.event({
        category: 'Navigation',
        action: `TemaAdv_${snakeCase(area.term)}`,
      });
      this.incrementSearch(area);
    }
    this.props.setArea(area);
    route('/newrequest');
  }

  componentWillMount() {
    const { application } = store.getState();
    const { userData } = application;
    if (userData.lawyer) {
      route('/services');
      setTimeout(() => {
        route('/services');
      }, 100);
    } else {
      this.setState({ canShow: true });
    }
  }

  render({
    toggleDrawer, lawAreas,
  }) {
    const { areas } = this.state;

    return (
      <Container background="#eee" paddingBottom={2}>
        <If condition={this.state.canShow}>
          <Navbar
            left={<i className="material-icons ml-10">menu</i>}
            leftClick={toggleDrawer}
            title="Oi Advogado"
          />

          <AppToolbar withPublicServices />

          <Choose>
            <When condition={store.getState().authentication.isSignedIn}>
              <div style={{
                maxWidth: 500, margin: 'auto', paddingTop: 20, paddingLeft: 10, paddingRight: 10,
              }}
              >

                <div style={{
                  display: 'flex', justifyContent: 'flex-start', alignItems: 'center', paddingBottom: 40, fontSize: 16,
                }}
                >
                  <span style={{ color: '#9999cc', paddingRight: 5, cursor: 'pointer' }}  onClick={() => history.back(-1)}>
                    {'<'}
                    {' '}
VOLTAR |
                  </span>

                  <span style={{ fontWeight: 'bold', color: '#3c55a7' }}>Estou em busca de um advogado</span>
                </div>

                <SearchSection onSearch={this.onProblemSearch} areas={areas} setArea={this.goToArea} />
                <Divider />
                <LawAreasSection areas={lawAreas} setArea={this.goToArea} />
                <Divider />
                <CommonProblemSection allProblems={filterTerms(lawAreas, '', 0)} setArea={this.goToArea} />
                <Divider />
                <ProblemNotFoundSection onClick={() => this.goToArea()} />

              </div>
            </When>

            <Otherwise>
              <UnsignedUserPanel />
            </Otherwise>
          </Choose>

        </If>
      </Container>
    );
  }
}

export default container(Search);
