import styled from 'styled-components';

const Wrapper = styled.div`
  color: white;
  padding: 16px 45px;
  border-top: 1px solid rgba(218, 218, 218, 0.3490196078431373);
  font-size: 14px;
  cursor: pointer;
`;

const Arealabel = styled.div`
  opacity: 0.5;
  text-transform: uppercase;
  font-size: 10px;
  margin-top: 5px;
`;

const ProblemItem = ({ label, areaLabel, ...props }) => (
  <Wrapper {...props}>
    {label}
    <Arealabel>{areaLabel}</Arealabel>
  </Wrapper>
);




const ColoredWrapper = styled.div`
  background-color: #DEDEEF;
  padding: 16px 45px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 10px;
`;


export const ColoredProblemItem = ({ label, areaLabel, ...rest }) => (
  <ColoredWrapper {...rest}>
    <span style={{ color: '#411f51', fontWeight: 'bold', fontSize: '16px' }}>{label}</span>
    <Arealabel style={{ marginTop: 0, fontSize: '14px', color: '#444', opacity: 1 }}>{areaLabel}</Arealabel>
  </ColoredWrapper>
);

export default ProblemItem;
