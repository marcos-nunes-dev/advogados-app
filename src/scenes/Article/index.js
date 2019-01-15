import { h, Component } from 'preact';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';
import { route } from 'preact-router';
import moment from 'moment';
import get from 'lodash/get';
import Markup from 'preact-markup';
import container from './container';
import { Scene } from '../../components';
import Navbar from '../../components/Navbar';
import { Toolbar, ToolbarItem } from '../../components/Toolbar';
import Container from '../../components/Container';
import {
  Card, CardActions, Button, IconButton,
} from '../../toolbox/components';

/**
|--------------------------------------------------
| Styled Components
|--------------------------------------------------
*/

const Title = styled.div`
  margin-top: 50px;
  font-size: 24px;
  color: #212121;
  font-weight: bold;
`;

const Padding = styled.div`
  padding: 10px;
  height: 100vh;
  background-color: #fff;
`;

const CloseIcon = styled.i`
  position: absolute;
  font-size: 30px !important;
  left: 10px;
  top: 10px;
  cursor: pointer;
`;
/**
|--------------------------------------------------
| Chats
|--------------------------------------------------
*/

class Article extends Component {
  state = {
    article: null,
  };

  componentDidMount() {
    const { getArticles, id } = this.props;

    getArticles({
      query: {
        _id: id,
        $populate: {
          path: 'lawyer',
          populate: {
            path: 'user',
          },
        },
      },
    }).payload.promise.then(result => {
      this.setState({ article: result.data[0] });
    });
  }

  renderIframe() {
    const { article } = this.state;
    const src = String(article.link)
      .replace('‪', '')
      .replace(' ', '');
    console.log(src);
    return (
      <iframe
        src={src}
        style={{
          width: '100%',
          height: '70vh',
          margin: 0,
          padding: 0,
          border: 'none',
        }}
      />
    );
  }

  render({
    chats, articles, toggleDrawer, ...props
  }) {
    const { article } = this.state;
    return (
      <Scene sync private>
        <CloseIcon className="material-icons" onClick={() => history.back()}>
          close
        </CloseIcon>
        <div style={{ maxWidth: 600, margin: 'auto' }}>
          <Padding>
            <If condition={article}>
              <Title>{article.title}</Title>
              <br />
              <pre className="article-pre" style={{ whiteSpace: 'pre-wrap' }}>
                <div>{article.content}</div>
              </pre>
            </If>
          </Padding>
        </div>
      </Scene>
    );
  }
}

export default container(Article);
