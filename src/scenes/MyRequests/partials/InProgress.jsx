import styled from 'styled-components';
import { Card, CardText } from '../../../toolbox/components';
import { Flex, Box } from 'reflexbox';
import Moment from 'react-moment';
import { route } from 'preact-router';

const Wrapper = styled.div`
  padding: 10px;
  padding-bottom: 55px;
  min-height: ${window.innerHeight - 145}px;
`;

/**
|--------------------------------------------------
| ServiceCard
|--------------------------------------------------
*/

const CardWrapper = styled.div`
  margin-bottom: 10px;
`;

const CardContet = styled.div`
  padding: 10px;
`;

const Title = styled.div`
  margin-top: 10px;
  font-size: 15px;
  color: #5c6bc0;
  font-weight: bold;
`;

const Text = styled.div`
  margin-top: 10px;
  color: #424242;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const Time = styled.div`
  font-size: 12px;
  color: #bdbdbd;
`;

const Lawyers = styled.div`
  font-size: 12px;
  color: #bdbdbd;
  margin-top: 7px;
`;

const ServiceCard = ({id, time, description, touches}) => (
  <CardWrapper onClick={() => route(`/request/${id}`)}>
    <Card>
      <CardContet>
        <Time>{time}</Time>
        <Text>{description}</Text>
        <Lawyers>{touches.length} advogados entraram em contato</Lawyers>
      </CardContet>
    </Card>
  </CardWrapper>
);

const Status = styled.div`
  padding: 15px 0 5px;
  font-size: 13px;
  color: #a0a0a0;
  font-weight: 500;
`;

/**
|--------------------------------------------------
| OpenedServices
|--------------------------------------------------
*/

const OpenedServices = ({requests}) => (
  <Wrapper>
    <Status>Minhas dúvidas enviadas</Status>
    {requests.map(request =>
      <ServiceCard
        id={request._id}
        time={<Moment fromNow date={new Date(request.createdAt)} />}
        description={request.description}
        touches={request.touches}
      />
    )}
  
  </Wrapper>
);

export default OpenedServices;