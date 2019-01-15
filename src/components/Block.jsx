import styled from 'styled-components';

/**
|--------------------------------------------------
| Block
|--------------------------------------------------
*/

const defaults = {
  bgc: 'transparent'
};


const Block = styled.div`
  padding: ${p => p.padding || 15}px;
  background-color: ${p => p.background || defaults.bgc} ;
`;

export default Block;
