import styled from 'styled-components';
import { Link } from 'preact-router/match';
import v from '../variables';
/**
|--------------------------------------------------
| ToolbarWrapper
|--------------------------------------------------
*/

const ToolbarWrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  height: ${v.navbarHeight}px;
  width: 100%;
  top: ${v.navbarHeight}px;
  left: 0;
  background-color: #f7f9fd;
  color: ${v.mc.indigo._300};
  z-index: 1;
  padding: 25px;
  box-shadow: 0 0px 0px 0px rgba(0, 0, 0, 0.2), 0 0px 0px 0 rgba(0, 0, 0, 0.1),
    0 0px 5px 0 rgba(0, 0, 0, 0.1);
`;

const ToolbarItemWrapper = styled(Link)`
  height: 100%;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: inherit;
  text-decoration: none;
`;

const ToolbarItemTitle = styled.span`
  width: 100%;
  display: block;
  font-size: 11px;
`;

const ToolbarItem = ({ icon, title, ...props }) => (
  <ToolbarItemWrapper {...props}>
    <div style={{ textAlign: 'center' }}>
      {icon}
      <ToolbarItemTitle>{title}</ToolbarItemTitle>
    </div>
  </ToolbarItemWrapper>
);

/**
|--------------------------------------------------
| Toolbar
|--------------------------------------------------
*/

const Toolbar = ({ children }) => <ToolbarWrapper>{children}</ToolbarWrapper>;

export { Toolbar, ToolbarItem };
