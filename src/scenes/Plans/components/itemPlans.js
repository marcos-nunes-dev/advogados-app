import styled from 'styled-components';
import currency from 'currency-formatter';
import { Flex, Box } from 'reflexbox';

/**
|--------------------------------------------------
| SimplePlanItem
|--------------------------------------------------
*/

const SimpleItemWrapper = styled.div`
  padding: 10px;
  background: #fff;
  line-height: 30px;
  border-radius: 2px;
  margin-bottom: 5px;
`;

const Title = styled.span`
  color: #424242;
  font-size: 15px;
`;

const Free = styled.span`
  color: #424242;
  font-size: 13px;
`;

const Price = styled.span``;

const PerMonth = styled.span`
  font-size: 11px;
`;

const PlanHeader = ({ title, price, ...props }) => (
  <Flex justify="space-between" {...props}>
    <Box>
      <Title>{title}</Title>
    </Box>
    <Box>
      <Choose>
        <When condition={price}>
          <Price>
            {currency.format(price, { code: 'BRL' })}
            <PerMonth>/mês</PerMonth>
          </Price>
        </When>
        <Otherwise>
          <Free>Gratuito</Free>
        </Otherwise>
      </Choose>
    </Box>
  </Flex>
);

const SimplePlanItem = ({ title, price }) => (
  <SimpleItemWrapper>
    <PlanHeader title={title} price={price} />
  </SimpleItemWrapper>
);

/**
|--------------------------------------------------
| SubItem
|--------------------------------------------------
*/

const SubItemWrapper = styled.div`
  border-top: 1px solid #efefef;
  padding-left: 5px;
`;

const SubItemText = styled(Box)`
  font-size: 13px;
  line-height: 30px;
  padding-left: 5px;
`;

const SubItemIcon = styled.i`
  min-width: 24px;
`;

const SubItemList = styled.div`
  margin-top: 15px;
`;

const Subitem = ({ icon, title, ...props }) => (
  <SubItemWrapper {...props}>
    <Flex align="center">
      <Box>
        <SubItemIcon className="material-icons">{icon}</SubItemIcon>
      </Box>
      <SubItemText align="center">{title}</SubItemText>
    </Flex>
  </SubItemWrapper>
);

/**
|--------------------------------------------------
| CompletePlanItem
|--------------------------------------------------
*/

const CompleteItemWrapper = styled.div`
  padding: 10px;
  background: #fff;
  border-radius: 2px;
  margin-bottom: 5px;
  border: 2px solid #5c6bc0;
`;
// border-right-width: 25px;

const CompletePlanItem = ({
  title, price, atendimento, atuacao, artigos, videos, ...props
}) => (
  <CompleteItemWrapper {...props}>
    <PlanHeader title={title} price={price} />
    <SubItemList>
      <Subitem icon="check" title="Destaque no resultado de busca pelo cliente" />
      <Subitem icon="check" title={`${atendimento} atendimentos por mês`} />
      <Subitem icon="check" title={`Inserir até ${atuacao || 1} áreas de atuação`} />
      <Subitem icon="check" title={`Publicar até ${artigos} artigos por mês`} />
      <Subitem icon="check" title={`Publicar até ${videos} vídeos por mês `} />
    </SubItemList>
  </CompleteItemWrapper>
);

/**
|--------------------------------------------------
| PlantItem
|--------------------------------------------------
*/

const PlanItem = ({ active, onClick, ...props }) => (
  <div role="presentation" onClick={onClick}>
    <Choose>
      <When condition={active}>
        <CompletePlanItem {...props} />
      </When>
      <Otherwise>
        <SimplePlanItem {...props} />
      </Otherwise>
    </Choose>
  </div>
);

export default PlanItem;
