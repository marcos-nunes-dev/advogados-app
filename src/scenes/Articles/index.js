import { h, Component } from 'preact';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';
import { route } from 'preact-router';
import moment from 'moment';
import get from 'lodash/get';
import container from './container';
import { Scene } from '../../components';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import AppToolbar from '../AppToolbar';
import {
  Card, CardActions, Button, IconButton,
} from '../../toolbox/components';
import { EmptyList } from '../../components';

/**
 |--------------------------------------------------
 | Helpers
 |--------------------------------------------------
 */

const getLastMessage = messages => {
  const l = messages.reduce((newer, curr) => {
    const time = new Date(curr.createdAt).getTime();
    return time > new Date(newer.createdAt).getTime() ? curr : newer;
  });

  console.log(l.text);
  return l.text;
};

/**
 |--------------------------------------------------
 | Styled Components
 |--------------------------------------------------
 */

const CardWrapper = styled.div`
  margin-bottom: 10px;
`;

const CardContent = styled.div`
  padding: 10px;
`;

const Title = styled.div`
  margin-top: 10px;
  font-size: 18px;
  color: #212121;
`;

const Scroll = styled.div`
  height: ${window.innerHeight - 15}px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  padding: 5px;
`;

const ChatWrapper = styled.div`
  padding: 10px;
  border-bottom: 1px solid #fafafa;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

const UserName = styled.div`
  font-weight: bolder;
  margin-left: 10px;
  font-size: 14px;
`;
const LastMessage = styled.div`
  font-size: 14px;
  margin-left: 10px;
  color: #7b7b7b;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

/**
 |--------------------------------------------------
 | Chats
 |--------------------------------------------------
 */

class Article extends Component {
    state = {
      articles: [],
    };

    componentDidMount() {
      const { getArticles } = this.props;

      getArticles({
        query: {
          $populate: [{
            path: 'lawyer',
            populate: {
              path: 'user',
            },
          },
            {
              path: 'area'
            }
          ],
          $sort: {
            createdAt: -1,
          },
          $limit: 50,
        },
      }).payload.promise.then(result => {
        console.log('articles result', result);
        this.setState({ articles: result.data });
      });
    }

    render({
      chats, articles, toggleDrawer, subscription, chatsUnread, ...props
    }) {
      return (
        <Scene sync private>
          <Container paddingBottom={2}>
            <Navbar
              left={<i className="material-icons ml-10">menu</i>}
              leftClick={toggleDrawer}
              title="Oi Advogado"
            />

            <AppToolbar hideHomeWhenLawyer withPublicServices />

            <div style={{ maxWidth: 500, margin: 'auto' }}>
              <Scroll>
                <If condition={this.state.articles || this.state.articles.length !== 0}>
                  {this.state.articles.map(item => (
                    <CardWrapper
                      onClick={() => {
                        // if (item.link) {
                        // 	return window.open(item.link, '_system');
                        // } else {
                        // 	route(`/article/${item._id}`)
                        // }
                        route(`/article/${item._id}`);
                      }}
                    >
                      <Card>
                        <CardContent>
                          <Flex style={{ fontSize: 11 }}>
                            <Box>
                              { item.area ? item.area.name + ": " : ""} {get(item, 'lawyer.user.name')}
                              {' '}
                                                        -
                              {' '}
                            </Box>
                            <Box>
                              {moment(item.updatedAt)
                                .locale('pt')
                                .fromNow()}
                            </Box>
                          </Flex>

                          <Title>{item.title}</Title>
                          {/* <Text><Markup markup={item.text} trim={false} type="html"/></Text> */}
                        </CardContent>
                      </Card>
                    </CardWrapper>
                  ))}
                </If>

                <If condition={!this.state.articles || this.state.articles.length == 0}>
                  <EmptyList text="nenhum artigo inserido" icon="help" pb={4} pf={4} />
                </If>

                  <div style="width: 100%; height:80px;"></div>
              </Scroll>
            </div>
          </Container>
        </Scene>
      );
    }
}

export default container(Article);
