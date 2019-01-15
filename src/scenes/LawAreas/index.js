import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Flex, Box } from 'reflexbox';
import styled from 'styled-components';
import container from './container';
import Footer from './components/Footer';
import Input from './components/Input';
import { Switch } from '../../toolbox/components';
import { Scene } from '../../components';
import { EmptyList } from '../../components';
import ProblemItem from './components/ProblemItem';
import SearchInput from './components/SearchInput';
import get from 'lodash/get';
import { restClient } from '../../feathers';
import { orderBy } from 'lodash';

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
  top: 12px;
  font-size: 30px;
  color: #5c6bc0;
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
  color: #5c6bc0;
  font-weight: 500;
`;

const Explanation = styled.div`
  padding: 15px;
  text-align: center;
  font-size: 13px;
  color: #cfd0d8;
  font-weight: 500;
  margin-top: 10px;
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
  height: ${window.innerHeight - 196}px;
  font-size: 16px;
  outline: none;
  -webkit-appearance: none;
  border: none;
`;

const Label = styled.div`
  margin: 20px 0px 20px;
  font-size: 13px;
`;

/**
|--------------------------------------------------
| Button
|--------------------------------------------------
*/

const Button = styled.div`
  text-align: center;
  background-color: #7e57c2;
  text-align: center;
  height: 55px;
  width: 100%;
  bottom: 0;
  color: white;
  line-height: 55px;
  cursor: pointer;
  margin-top: 5px;
`;

/**
|--------------------------------------------------
| Helpers
|--------------------------------------------------
*/

const createRegEx = word => {
  const splittedWord = word.split('');

  const dictionary = [
    'Aaàáâãä',
    'Eeèéêë',
    'Iiìíîï',
    'Ooòóôõö',
    'Uuùúûü',
    'Ccç',
    'Nnñ',
    'Yyýÿ'
  ];

  const sets = splittedWord.reduce((previous, char) => {
    const set =
      dictionary.find(letters => ~letters.indexOf(char)) ||
      char.toLocaleUpperCase() + char.toLocaleLowerCase();
    return `${previous}[${set}]`;
  }, '');

  return new RegExp(`.*${sets}.*`, 'i');
};

const mapTerms = list =>
  list.reduce((state, curr) => {
    const terms = get(curr, 'terms', []);
    const mappedTerms = terms.map(term => ({
      term: term.title,
      termId: term._id,
      area: curr.name,
      id: curr._id,
      searches: term.searches || 0
    }));
    return [...state, ...mappedTerms];
  }, []);

const filterTerms = (areas, text) => {
  const terms = mapTerms(areas);
  const regex = createRegEx(text);
  const result = terms.filter(
    ({ term, area }) => regex.test(term) || regex.test(area)
  );
  const orderedResult = orderBy(result, 'term', 'asc');
  return orderedResult;
};

/**
|--------------------------------------------------
| LawAreas
|--------------------------------------------------
*/
class LawAreas extends Component {
  state = {
    searchText: ''
  };

  handleChange = ({ target }) => {
    restClient;
    this.setState({
      searchText: target.value
    });
  };

  incrementSearch = item => {
    const Areas = restClient.service('app/law-areas');

    const query = {
      _id: item.id,
      'terms._id': item.termId
    };

    const data = {
      $inc: { 'terms.$.searches': 1 }
    };

    Areas.patch(null, data, { query });
  };

  render({ lawAreas, setArea }) {
    return (
      <Scene sync private>
        <Container>
          <CloseButton
            className="material-icons"
            onClick={() => route('/home')}
          >
            close
          </CloseButton>
          <Title>Área de Atuação</Title>
          <div style={{ maxWidth: 500, margin: 'auto' }}>
            <If condition={lawAreas || lawAreas.length !== 0}>
              <SearchInput
                placeholder="Qual o seu problema?"
                onChange={this.handleChange}
              />
              {console.log(lawAreas)}
              {filterTerms(lawAreas, this.state.searchText).map(item => (
                <ProblemItem
                  onClick={() => {
                    setArea(item);
                    route(`/search?area=${item.id}`);
                    this.incrementSearch(item);
                  }}
                  areaLabel={item.area}
                  label={item.term}
                />
              ))}
            </If>

            <If condition={!lawAreas}>
              <EmptyList
                text="nenhuma área inserido"
                icon="help"
                pb={4}
                pf={4}
              />
            </If>
          </div>
        </Container>
      </Scene>
    );
  }
}

export default container(LawAreas);
