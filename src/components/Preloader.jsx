import { h } from 'preact';
import Spinner from 'react-md-spinner';
import styled from 'styled-components';

/**
|--------------------------------------------------
| Backdrop
|--------------------------------------------------
*/

const Backdrop = styled.div`
  display: flex;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 10;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,.4);
`;

/**
|--------------------------------------------------
| Prloader
|--------------------------------------------------
*/

const Preloader = () => (
  <Backdrop>
    <Spinner size={50} singleColor="white" />
  </Backdrop>
);

export default Preloader;