/* eslint-disable semi */
import { h, Component } from 'preact';
import {Link, route} from 'preact-router';
import styled from 'styled-components';
import get from 'lodash/get';
import axios from 'axios';
import container from './container';
import reducer from './redux/reducer';
import Container from '../../components/Container';
import Navbar from '../../components/Navbar';
import PersonList from './components/PersonList';
import PersonListItem from './components/PersonListItem';
import Filtering from './components/Filtering';
import AppToolbar from '../AppToolbar';
import { EmptyList, Loading, Preloader } from '../../components';
import actions from '../../redux/reducers/preloader/actions';
import navigationHelperActions from '../../redux/reducers/navigation_helper/actions';

/**
 |--------------------------------------------------
 | Coords Distance Calculation
 |--------------------------------------------------
 */

const distance = (coord1, coord2, unit = 'K') => {
  if (!coord2) {
    return false;
  }
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;
  const radlat1 = Math.PI * lat1 / 180;
  const radlat2 = Math.PI * lat2 / 180;
  const theta = lon1 - lon2;
  const radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2)
        + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === 'K') {
    dist *= 1.609344;
  }
  if (unit === 'N') {
    dist *= 0.8684;
  }
  return `${dist.toFixed(1)}km`;
};

const distance2 = (dist) => {
  dist /= 1000;

  return `${dist.toFixed(2)}km`;
};

window.distance = distance;

/**
 |--------------------------------------------------
 | Component
 |--------------------------------------------------
 */

const Scroll = styled.div`
  height: ${window.innerHeight - 170}px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

const Box = styled.div`
  text-align: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 10px;
  padding: 10px;
`;

const calcStars = (reviews = []) => {
  const sum = reviews.reduce((a, b) => a + b.rate, 0);
  const avg = sum / reviews.length;
  return avg || 5;
};

const filters = [
  { icon: 'search', label: 'Demissão sem justa causa' },
  { icon: 'location_on', label: 'São Paulo, SP' },
  { icon: 'work', label: 'Direito Trabalhista' },
];

const onSignUpBySearchClick = () => {
  store.dispatch(navigationHelperActions.changeAuthRoute('/search'));
}


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


class Search extends Component {
  state = {};

  location = {};

  area = {};

  oldResult = {};

  loading = true;

    lati = 0;

    lng = 0;

    componentDidMount() {
      this.search();
    }

    componentWillReceiveProps(props) {
      (() => {
        const { location, area } = props.search;

        if (area.area !== this.area.area) {
          setTimeout(() => {
            return this.search();
          }, 100);
        }
        // if (area.area.id !== this.area.area.id) {
        //   return this.search();
        // }
        if (location.city !== this.location.city) {
          return this.search();
        }
        if (location.state !== this.location.state) {
          return this.search();
        }

        return null;
      })();
    }

    getAddressCoords = addressObject => {
      const { logradouro, localidade, uf } = addressObject;
      const address = `${logradouro} ${localidade} ${uf}`;
      store.dispatch(actions.showPreloader());
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCmPKWxyysvnjzCJ5e9xE7H_8HNzWLtn4s`,
        )
        .then(({ data }) => {
          store.dispatch(actions.hidePreloader());
        });
    };

    onSuccessGeo(position) {
      // this.lat = position.coords.latitude;
      // this.lng = position.coords.longitude;

      return 1
    }

    onErrorGeo(error) {
      alert(`code: ${error.code}\n`
            + `message: ${error.message}\n`);
    }

    search() {
      this.loading = true;
      const { searchLawyers, search, result } = this.props;
      this.location = search.location;
      this.area = search.area;
      try {
        if(this.area.id == undefined) {
          route('/lawyer-drawer');
        }
      }
      catch(err) {
        route('/lawyer-drawer');
      }

      // this.getAddressCoords();
      navigator.geolocation.getCurrentPosition((position) => {
        const query = {
          areas: {
            $in: [search.area.id],
          },
          'location.address.state': search.location.state,
          'location.address.city': search.location.city,
          latTmp: position.coords.latitude,
          lngTmp: position.coords.longitude,
          $populate: 'user areas',
        };

        searchLawyers({ query }).payload.promise.then(result => {
          this.loading = false;
        });
        // this.loading = false;
      }, () => {
        const query = {
          areas: {
            $in: [search.area.id],
          },
          'location.address.state': search.location.state,
          'location.address.city': search.location.city,
          latTmp: -23.533773,
          lngTmp: -46.625290,
          $populate: 'user areas',
        };

        searchLawyers({ query }).payload.promise.then(result => {
          this.loading = false;
        });
        // this.loading = false;
      });
    }

    render({
      toggleDrawer, search, result, chatsUnread, isUserSignedIn
    }) {

      return (
        <Container background="#eee" paddingBottom={2}>
          <Navbar
            left={<i className="material-icons ml-10">menu</i>}
            leftClick={toggleDrawer}
            title="Oi Advogado"
          />

          <AppToolbar withPublicServices />

          <div style={{ maxWidth: 500, margin: 'auto' }}>
            <Choose>

              <When condition={isUserSignedIn}>
                <Filtering filters={filters} search={search} />

                <Scroll>
                  <If condition={result && result.data.length && !this.loading}>
                    <PersonList>
                      {result.data
                        .filter(l => l.user)
                        .map(lawyer => (
                          <PersonListItem
                            key={lawyer._id}
                            image={
                                                        lawyer.user && lawyer.user.photo
                                                          ? lawyer.user.photo
                                                          : 'https://s3.amazonaws.com/dra-helena-bucket/user-profile.png'
                                                    }
                            title={lawyer.user.name}
                            description={lawyer.areas.map(area => `${area.name}, `)}
                            href={`/lawyer/${lawyer._id}`}
                            stars={calcStars(lawyer.reviews)}
                            reviews={lawyer.reviews.length}
                            videos={lawyer.videos.length}
                            articles={lawyer.articles.length}
                            oab={lawyer.oab}
                            distance={distance2(
                              lawyer.dist.calculated,
                            )}
                          />
                        ))}
                    </PersonList>
                  </If>

                  <If condition={(!result || !result.data || !result.data.length) && !this.loading}>
                    <EmptyList text="nenhum advogado encontrado" icon="help" pb={4} pf={4} />
                  </If>

                  <If condition={ this.loading }>
                    <Loading text="Pesquisando..." icon="help" pb={4} pf={4} />
                  </If>
                </Scroll>
              </When>

              <Otherwise>
                <UnsignedUserPanel />
              </Otherwise>

            </Choose>
          </div>
        </Container>
      );
    }
}

export default container(Search);
export { reducer };
