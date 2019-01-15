import { h, Component } from 'preact';
import styled from 'styled-components'
import { route } from 'preact-router';
import { SectionHeader, SectionTitle, SectionSubtitle } from './SectionComponents';
import { Dialog } from '../../toolbox/components';
import ProblemItem, { ColoredProblemItem } from './components/ProblemItem';

import { SectionStandardButton as ToggleDialogButton } from './SectionComponents';



class CommonProblemSection extends Component {

    state = {
        dialogActive: false,
    };

    toggleDialog = () => {
        this.setState((prevState) => ({ dialogActive: !prevState.dialogActive }))
    }

    render({ allProblems, setArea }) {
        const { dialogActive } = this.state;

        return (
            <div>
                <SectionHeader
                    sectionIcon="assignment"
                    sectionDesc="Abaixo estão os problemas jurídicos mais comuns. Consulte a lista para ver se seu problema não está nela. Clique nos itens da lista para ver os advogados que podem lhe ajudar."
                >
                    <SectionTitle>OPÇÃO 3</SectionTitle>
                    <SectionSubtitle>Problemas mais comuns</SectionSubtitle>
                </SectionHeader>

                {allProblems.slice(0, 6).map(item => (
                    <ColoredProblemItem
                        onClick={() => setArea(item)}
                        areaLabel={item.area}
                        label={item.term}
                    />
                ))}

                <ToggleDialogButton onClick={this.toggleDialog}>
                    Ver Lista Completa
                </ToggleDialogButton>

                <Dialog
                    title="Todos os Direitos"
                    active={dialogActive}
                    onEscKeyDown={this.toggleDialog}
                    onOverlayClick={this.toggleDialog}
                    style={{ height: 345 }}
                >
                    <span
                        style={{
                            cursor: 'pointer',
                            position: 'absolute',
                            top: 10,
                            right: 30
                        }}
                        onClick={this.toggleDialog}
                    >
                        x
                    </span>
                    <div style={{ overflowY: 'scroll', height: 345 }}>
                        {allProblems.map(item => (
                            <ProblemItem
                                onClick={() => setArea(item)}
                                areaLabel={item.area}
                                label={item.term}
                                style={{ color: 'black' }}
                            />
                        ))}
                    </div>
                </Dialog>
            </div>
        );
    }

}



export default CommonProblemSection;
