import styled from 'styled-components';

const Wrapper = styled.div`
  color: #5c6bc0;
  padding: 16px 45px;
  border-top: 1px solid rgba(218,218,218,0.3490196078431373);
  font-size: 14px;
  background: #fafafa;
  font-weight: 700;
`;

const Arealabel = styled.div`
  opacity: 0.5;
  text-transform: uppercase;
  font-size: 10px;
  margin-top: 5px;
  color: #9b9b9b;
  font-weight: 500;
`;

const ProblemItem = ({ label, areaLabel, ...props }) => (
  <Wrapper {...props}>
    {label}
    <Arealabel>{areaLabel}</Arealabel>
  </Wrapper>
);

export default ProblemItem;
