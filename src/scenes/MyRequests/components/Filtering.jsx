import { h } from 'preact';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';
import v from '../../../variables';

/**
|--------------------------------------------------
| FilteringWrapper
|--------------------------------------------------
*/

const FilteringWrapper = styled.div`
  font-size: 13px;
  background-color: #fff;
  margin-bottom: 5px;
`;

/**
|--------------------------------------------------
| Label
|--------------------------------------------------
*/

const Label = styled(Box)`
  flex: 1;
  justify-self: start;
  padding-left: 5px;
`;

/**
|--------------------------------------------------
| FilterItemWrapper
|--------------------------------------------------
*/

const FilterItemWrapper = styled.div`
  padding: 8px;
  border-top: 1px solid ${v.mc.grey._200}
`;

/**
|--------------------------------------------------
| FilterItem
|--------------------------------------------------
*/

const I = ({ name }) => (
  <i class="material-icons" style={{ fontSize: 15 }} >{name}</i>
)


const FilterItem = ({icon, label}) => (
  <FilterItemWrapper>
    <Flex justify="space-between" align="center">
      <Box> <I name={icon} /> </Box>
      <Label> {label}</Label>
      <Box> <I name="close" /> </Box>
    </Flex>
  </FilterItemWrapper>
);

/**
|--------------------------------------------------
| Filtering
|--------------------------------------------------
*/

const Filtering = ({filters}) => (
  <FilteringWrapper>
    {filters.map(filter =>
      <FilterItem icon={filter.icon} label={filter.label} />
    )}
  </FilteringWrapper>
)

export default Filtering;
