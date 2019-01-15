import styled from 'styled-components';
import v from '../../../variables';

/**
|--------------------------------------------------
| Item
|--------------------------------------------------
*/

const Item = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin: 15px 0;
  color: ${v.mc.grey._800};
  color: ${p => p.selected ? v.mc.red._500 : null };
`;

/**
|--------------------------------------------------
| CategoriesList
|--------------------------------------------------
*/

const CategoriesList = ({list, onClick}) => (
  <div>
    <Item onClick={onClick} selected>Burguers</Item>
    <Item onClick={onClick}>Saladas</Item>
    <Item onClick={onClick}>Sopas</Item>
    <Item onClick={onClick}>Sanduíches</Item>
    <Item onClick={onClick}>Almoço</Item>
    <Item onClick={onClick}>Jantar</Item>
    <Item onClick={onClick}>Fritas</Item>
    <Item onClick={onClick}>Sobremesas</Item>
    <Item onClick={onClick}>Bebidas</Item>
    <Item onClick={onClick}>Drinks</Item>
    <Item onClick={onClick}>Café da Manhã</Item>
  </div>
);

export default CategoriesList;