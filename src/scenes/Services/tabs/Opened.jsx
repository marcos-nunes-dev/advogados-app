import styled from 'styled-components';
import { Card, CardText } from '../../../toolbox/components';
import { Flex, Box } from 'reflexbox';
import { route } from 'preact-router';
import Moment from 'react-moment';
import { EmptyList } from '../../../components';
import get from 'lodash/get';

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

const ServiceCard = ({id, time, description, areaName, userName, userData, inProgressServices, subscription, ...props}) => (
  <CardWrapper onClick={() => get(subscription, 'code') || inProgressServices.length < get(userData, 'planConfig.maxMonthlyServices', -1) ? route(`/service/${id}`) : route(`/payment`)} >
  {console.log(get(userData, 'services'))}
    <Card>
      <CardContet>
        <Flex justify="space-between" style={{fontSize: 11}} >
          <Box>
            <div>{get(subscription, 'code') || inProgressServices.length < get(userData, 'planConfig.maxMonthlyServices', -1) ? userName : "Contrate o plano para atender!"}</div>
          </Box>
          <Box>{time}</Box>
        </Flex>

        <Title>{areaName}</Title>
        <Text>{description}</Text>
      </CardContet>
    </Card>
  </CardWrapper>
);



/**
|--------------------------------------------------
| OpenedServices
|--------------------------------------------------
*/

const OpenedServices = ({ subscription, services, inProgressServices, userData, ...props }) => (
  <Wrapper>
    <If condition={ services ||  services.length !== 0 }>   
      {services.map(item =>
        <ServiceCard
          id={item._id}
          time={<Moment fromNow date={new Date(item.createdAt)} />}
          description={item.description}
          areaName={get(item, 'lawArea.name')}
          userName={item.userName}
          subscription={subscription}
          inProgressServices={inProgressServices}
          userData={userData}
          {...props}
        />
      )}
    </If>
    <If condition={ !services || services.length == 0}>
      <EmptyList text="nenhum atendimento solicitado" icon="help" pb={4} pf={3}/>
    </If>
  </Wrapper>
);

export default OpenedServices;