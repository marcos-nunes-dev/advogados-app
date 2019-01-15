import { h, Component } from 'preact';
import ReactGA from 'react-ga';
import styled from 'styled-components'
import { SectionHeader, SectionTitle, SectionSubtitle } from './SectionComponents';

import { SectionStandardButton as ShareProblem } from './SectionComponents';



const ProblemNotFoundSection = ({ onClick }) => (
    <div style={{ paddingBottom: 10 }}>
        <SectionHeader
            sectionIcon="warning"
            sectionDesc="Se não encontrou exatamente o seu problema, descreva-o na plataforma para que os advogados possam entrar em contato."
        >
            <SectionSubtitle>Não encontrei meu problema</SectionSubtitle>
        </SectionHeader>

        <ShareProblem
            onClick={onClick}
            style={{ backgroundColor: 'white', border: '2px solid #411f51', color: '#411f51', fontWeight: 'bold' }}
        >
            Deixe sua Dúvida
        </ShareProblem>
    </div>
);



export default ProblemNotFoundSection;
