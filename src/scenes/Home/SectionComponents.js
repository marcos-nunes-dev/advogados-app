import { h } from 'preact';
import styled from 'styled-components';
import FontIcon from 'react-toolbox/lib/font_icon';


export const SectionTitle = styled.label`
  display: block;
  font-weight: bold;
  line-height: 1.2;
  color: #333;
  font-size: 18px;
  margin: 0;
`;


export const SectionSubtitle = styled.label`
  display: block;
  line-height: 1.1;
  font-size: 18px;
  font-weight: bold;
  color: #9999cc;
  text-transform: uppercase;
`;

export const SectionStandardButton = styled.button`
  border: 0 none;
  background-color: #411f51;
  color: white;
  padding: 12px 15px;
  font-size: 16px;
  margin: auto;
  display: block;
  margin-bottom: 30px;
  outline: none;
  width: 100%;
  text-transform: uppercase;
  &:active {
    background-color: white;
    color: #3f5179;
  }
`;

const SectionDesc = styled.p`
  color: #333;
`;


const SectionHeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;



export const SectionHeader = ({ sectionIcon, sectionDesc, children, ...rest }) => (
  <div>
    <SectionHeaderContainer {...rest}>
      <FontIcon value={sectionIcon} style={{ fontSize: 60, display: 'inline-block', color: '#9999cc', paddingRight: 10 }} />
      <div>
        {children}
      </div>
    </SectionHeaderContainer>
    {sectionDesc && (
      <SectionDesc>
        {sectionDesc}
      </SectionDesc>
    )}
  </div>
);
