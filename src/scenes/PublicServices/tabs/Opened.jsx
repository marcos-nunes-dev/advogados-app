import styled from 'styled-components';
import { Card, CardText } from '../../../toolbox/components';
import { Flex, Box } from 'reflexbox';
import { route } from 'preact-router';
import Moment from 'react-moment';
import { EmptyList } from '../../../components';

const Wrapper = styled.div`
  padding: 10px;
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
  color: #9c9c9c;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const ServiceCard = ({id, time, description, areaName, userName}) => (
  <CardWrapper onClick={() => route(`/public-service/${id}`)} >
    <Card>
      <CardContet>
        <Flex justify="space-between" style={{fontSize: 11}} >
          <Box>{time}</Box>
        </Flex>

        <Title>{areaName}</Title>
        <Text>{description}</Text>
      </CardContet>
    </Card>
  </CardWrapper>
);

const RegButton = styled.div`
  width: 250px;
  margin: auto;
  border: 1px solid #5c6bc0;
  padding: 12px;
  border-radius: 3px;
  color: #5c6bc0;
`;

/**
|--------------------------------------------------
| OpenedServices
|--------------------------------------------------
*/

const OpenedServices = ({ services }) => (
  <Wrapper>
    <If condition={ services ||  services.length !== 0 }>   
      {services.map(item =>
        <ServiceCard
          id={item._id}
          time={<Moment fromNow date={new Date(item.createdAt)} />}
          description={item.description}
          areaName={(item.lawArea) ? item.lawArea.name : ''}
          userName={item.userName}
        />
      )}
    </If>
    <If condition={ !services || services.length == 0}>
      <EmptyList text="nenhum atendimento solicitado" icon="help" pb={4} pf={3}/>
      <RegButton
        onClick={() => route('/wizard')}
      >
        Cadastre-se como advogado
      </RegButton>
    </If>
  </Wrapper>
);

export default OpenedServices;