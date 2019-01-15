import styled from 'styled-components';

/**
|--------------------------------------------------
| Component
|--------------------------------------------------
*/

const Header = styled.div`
  height: 150px;
  background-size: cover;
  background-image: url(${p => p.imagePath});
`;

export default Header;
