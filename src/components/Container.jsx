import styled from 'styled-components';
import v from '../variables';
/**
|--------------------------------------------------
| Container
|--------------------------------------------------
*/

const defaults = {
  background: '#fff'
};

const Container = styled.div`
  padding: ${v.navbarHeight * 2}px 0;
  min-height: 100%;
  width: 100%;
  background-color: ${ p => p.background || defaults.background };
  padding-bottom: ${p => p.noPaddingBottom ? 0 : null };
  padding-bottom: ${p => p.paddingBottom ? p.paddingBottom+'px' : null };
  margin-top: 5px;
`;

export default Container;
