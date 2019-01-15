import { h } from 'preact';
import styled from 'styled-components';
import { Link } from 'preact-router/match';
import { route } from 'preact-router';
import { Flex, Box } from 'reflexbox';
import v from '../../../variables';
import { Card, CardActions, Button, IconButton  } from '../../../toolbox/components';
import moment from 'moment';
import Markup from 'preact-markup';
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

const Articles = ({ articles }) => (
  <Container>
    {console.log(1, articles)}
    <If condition={ articles ||  articles.length !== 0 }>
      {articles.map(item => (
        <CardWrapper onClick={() => route(`/article/${item._id}`)}>
          <Card>
            <CardContent>
              <Flex style={{ fontSize: 11 }} >
                <Box>{moment(item.updatedAt).locale('pt').fromNow()}</Box>
              </Flex>

              <Title>{item.title}</Title>
              <Text><Markup markup={item.content} trim={false} type="html"/></Text>
            </CardContent>
          </Card>
        </CardWrapper>
      ))}
    </If>
    <If condition={ !articles ||  articles.length == 0}>
      <EmptyList text="nenhum artigo inserido" icon="help" pb={4} pf={2}/>
    </If>
  </Container>
);

export default Articles;