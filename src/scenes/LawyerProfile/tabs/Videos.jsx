import { h } from 'preact';
import { Link } from 'preact-router/match';
import { route } from 'preact-router';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';
import v from '../../../variables';
import { Card, CardMedia, CardTitle, CardActions, Button, IconButton } from '../../../toolbox/components';
import FontIcon from 'react-toolbox/lib/font_icon';
import moment from 'moment';
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

const A = styled.a`
  text-decoration: none;
  color:initial ;
`;

/**
|--------------------------------------------------
| Videos
|--------------------------------------------------
*/

const Videos = ({ videos }) => (
  <Container>
    <If condition={ videos || videos.length !== 0 }>
      {videos.map(item => (
        <CardWrapper>
            <Card>
              <A href={item.url} target="_blank">
                <CardMedia aspectRatio="wide" image={item.photo}/>
                <CardTitle title={item.title} subtitle={moment(item.updatedAt).locale('pt').fromNow()} />
              </A>
            </Card>
        </CardWrapper>
      ))}
    </If>
    <If condition={ !videos || videos.length == 0}>
      <EmptyList text="nenhum vídeo inserido" icon="help" pb={4} pf={2} />
    </If>
  </Container>
);

export default Videos;