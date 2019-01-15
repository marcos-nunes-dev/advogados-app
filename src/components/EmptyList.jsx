import { h } from 'preact';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';
import FontIcon from 'react-toolbox/lib/font_icon';

/**
|--------------------------------------------------
| EmptyList
|--------------------------------------------------
*/

const EmptyList = ({ text, icon, pf, pb }) => (
  <Flex 
    style={{ fontSize: 16, color: "#9b9b9b" }} 
    align='center'
    justify='space-around'
    w={1}
    p={pf}
  >      
    <Box p={pb} w={1} style={{textAlign: "center", lineHeight: "1.2em"}}> 
      <FontIcon value={icon} style={{ fontSize: 60, marginBottom: ".3em" }} /> <br />
      {text}
    </Box>
    
  </Flex>
);


export default EmptyList;