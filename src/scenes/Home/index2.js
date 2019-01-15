import { h, Component } from 'preact';
import { route } from 'preact-router';
import styled from 'styled-components';
import get from 'lodash/get';
import { orderBy } from 'lodash';
import ReactGA from 'react-ga';
import snakeCase from 'lodash/snakeCase';
import container from './container';
import { restClient } from '../../feathers';

import Container from '../../components/Container';
import Navbar from '../../components/Navbar';
import ProblemItem from './components/ProblemItem';
import SearchInput from './components/SearchInput';
import { ArrowIcon } from '../../components/icons/icons';
import AppToolbar from '../AppToolbar';



/**
 |--------------------------------------------------
 | BG
 |--------------------------------------------------
 */

const RequestButton = styled.button`
  border: 1px solid white;
  background-color: transparent;
  color: white;
  padding: 12px 15px;
  font-size: 12px;
  margin: auto;
  display: block;
  margin-bottom: 30px;
  border-radius: 3px;
  outline: none;
  width: calc(100% - 90px);
  text-transform: uppercase;

  &:active {
    background-color: white;
    color: #3f5179;
  }
`;

const Bg = styled.div`
  background-color: #5c6bc0;
  background-attachment: fixed;
  min-height: ${window.innerHeight - 90}px;
  background-image: url('assets/images/bg.jpg');
  background-size: cover;
  background-position: center;
`;

const Title = styled.h3`
  color: white;
  margin: 0;
  padding: 10px;
  padding-top: 35px;
  text-align: center;
  font-size: 26px;
  font-weight: 500;
`;

const SeeMore = styled.div`
  font-size: 12px;
  padding: 16px 45px;
  color: white;
  border-top: 1px solid rgba(218, 218, 218, 0.3490196078431373);
  cursor: pointer;
`;



/**
 |--------------------------------------------------
 | Helpers
 |--------------------------------------------------
 */

const createRegEx = word => {
    const splittedWord = word.split('');

    const dictionary = ['Aaàáâãä', 'Eeèéêë', 'Iiìíîï', 'Ooòóôõö', 'Uuùúûü', 'Ccç', 'Nnñ', 'Yyýÿ'];

    const sets = splittedWord.reduce((previous, char) => {
        const set = dictionary.find(letters => ~letters.indexOf(char))
            || char.toLocaleUpperCase() + char.toLocaleLowerCase();
        return `${previous}[${set}]`;
    }, '');

    return new RegExp(`.*${sets}.*`, 'i');
};

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

const filterTerms = (areas, text) => {
    const terms = mapTerms(areas);
    const regex = createRegEx(text);
    const result = terms.filter(({ term, area }) => regex.test(term) || regex.test(area));
    const orderedResult = orderBy(result, 'searches', 'desc');
    return orderedResult.slice(0, 13);
};



/**
 |--------------------------------------------------
 | COMPONENT
 |--------------------------------------------------
 */

class Search2 extends Component {
    state = {
        searchText: '',
        canShow: false,
    };

    handleChange = ({ target }) => {
        this.setState({
            searchText: target.value,
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
               toggleDrawer, lawAreas, setArea,
           }) {
        return (
            <Container background="#eee" paddingBottom={2}>
                <If condition={this.state.canShow}>
                    <Navbar
                        left={<i className="material-icons ml-10">menu</i>}
                        leftClick={toggleDrawer}
                        title="Oi Advogado"
                    />

                    <AppToolbar withPublicServices />

                    <Bg>
                        <Title>
                            Encontre advogados,
                            <br />
                            garanta seus direitos
                        </Title>

                        <div style={{ maxWidth: 500, margin: 'auto' }}>
                            <SearchInput placeholder="Qual o seu problema?" onChange={this.handleChange} />

                            <RequestButton
                                onClick={() => {
                                    ReactGA.event({
                                        category: 'Navigation',
                                        action: 'Btn_Compartilhar_Duvida',
                                    });
                                    route('/requests');
                                }}
                            >
                                Ou compartilhe sua dúvida
                            </RequestButton>

                            {filterTerms(lawAreas, this.state.searchText).map(item => (
                                <ProblemItem
                                    onClick={() => {
                                        ReactGA.event({
                                            category: 'Navigation',
                                            action: `TemaAdv_${snakeCase(item.term)}`,
                                        });
                                        setArea(item);
                                        route(`/search?area=${item.id}`);
                                        this.incrementSearch(item);
                                    }}
                                    areaLabel={item.area}
                                    label={item.term}
                                />
                            ))}

                            <SeeMore
                                onClick={() => {
                                    ReactGA.event({
                                        category: 'Navigation',
                                        action: 'Btn_ListaCompleta_TemasAdv',
                                    });
                                    route('/lawareas');
                                }}
                            >
                                <ArrowIcon width={16} height={10} />
                                Ver lista completa
                            </SeeMore>

                            <br />
                        </div>
                    </Bg>
                </If>
            </Container>
        );
    }
}

export default container(Search2);
