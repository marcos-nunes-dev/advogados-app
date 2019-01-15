import { h } from 'preact';
import styled from 'styled-components';
import { Link } from 'preact-router/match';
import { route } from 'preact-router';
import { Flex, Box } from 'reflexbox';
import v from '../../../variables';
import { Card, CardActions, Button, IconButton  } from '../../../toolbox/components';
import moment from 'moment';
import Markup from 'preact-markup';
import FontIcon from 'react-toolbox/lib/font_icon';
import { EmptyList } from '../../../components';

const redirectTo = (to, id) => () => {
  route(`${to}/${id}`)
}

const Container = styled.div`
  padding: 10px;
`;

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

const Text = styled.div`
  margin-top: 10px;
  color: #9c9c9c;
`;

/**
|--------------------------------------------------
| Articles
|--------------------------------------------------
*/

const Articles = ({ removeArticle, articles }) => (
  <Container>
    <If condition={ articles ||  articles.length !== 0 }>
      {articles.map(item => (
        <CardWrapper>
          <Card>
            <CardContent>
              <Flex style={{ fontSize: 11 }} >
                <Box>{moment(item.updatedAt).locale('pt').fromNow()}</Box>
              </Flex>

              <Title>{item.title}</Title>
              <CardActions>
                {/* <Button label="Editar" /> */}
                <Button label="Remover" onClick={ () => removeArticle(item._id) }  />
              </CardActions>
            </CardContent>
          </Card>
        </CardWrapper>
      ))}
    </If>

    <If condition={ !articles ||  articles.length == 0}>
      <EmptyList text="nenhum artigo inserido" icon="help" pb={3} pf={1} />
    </If>
  </Container>
);

export default Articles;