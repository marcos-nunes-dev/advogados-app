import styled from 'styled-components';
import v from '../variables';
/**
|--------------------------------------------------
| NavbarWrapper
|--------------------------------------------------
*/

const NavbarWrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  height: ${v.navbarHeight}px;
  width: inherit;
  top: 0;
  left: 0;
  background: ${v.colors.primary};
  background: ${p => p.background};
  color: ${v.mc.indigo._400};
  color: ${p => p.color};
  z-index: 2;
  border-bottom: 1px solid ${v.mc.indigo._50};
  /* box-shadow: 0 0px 0px 0px rgba(0,0,0,.2), 0 0px 0px 0 rgba(0,0,0,.1), 0 0px 5px 0 rgba(0,0,0,.1); */
`;

/**
|--------------------------------------------------
| Left
|--------------------------------------------------
*/

const Left = styled.div`
  flex: 1;
  display: flex;
  min-width: -webkit-min-content;
  padding-left:10px;
`;

/**
|--------------------------------------------------
| Center
|--------------------------------------------------
*/

const Center = styled.div`
  text-align: center;
`;

/**
|--------------------------------------------------
| Right
|--------------------------------------------------
*/

const Right = styled.div`
  flex: 1;
  display: flex;
  min-width: -webkit-min-content;
  justify-content: flex-end;
`;

/**
|--------------------------------------------------
| Title
|--------------------------------------------------
*/

const Title = styled.div`
  font-weight: bold;
`;

/**
|--------------------------------------------------
| Subtitle
|--------------------------------------------------
*/

const Subtitle = styled.div`
  font-size: 12px;
`;

/**
|--------------------------------------------------
| Navbar
|--------------------------------------------------
*/

const Navbar = ({left, center, right, title, subtitle, leftClick, rightClick, centerClick, ...props }) => (
  <NavbarWrapper {...props} >
    <Left onClick={leftClick} >{left}</Left>
    <Center onClick={centerClick}>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Center>
    <Right onClick={rightClick} >{right}</Right>
  </NavbarWrapper>
);

export default Navbar;
