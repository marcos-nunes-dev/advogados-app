import { h, Component } from 'preact';
import styled from 'styled-components';
import { SectionHeader, SectionTitle, SectionSubtitle } from './SectionComponents';
import { Dialog } from '../../toolbox/components';
import ProblemItem from './components/ProblemItem';

import { SectionStandardButton as ToggleDialogButton } from './SectionComponents';



class LawAreasSection extends Component {

    state = {
        dialogActive: false,
    };

    toggleDialog = () => {
        this.setState((prevState) => ({ dialogActive: !prevState.dialogActive }))
    }

    render({ areas, setArea }) {
        const { dialogActive } = this.state;
        return (
            <div>
                <SectionHeader
                    sectionIcon="assignment_ind"
                    sectionDesc="Escolha uma área do direito que possa ter relação com seu problema e verifique se ele aparece na listagem."
                >
                    <SectionTitle>OPÇÃO 2</SectionTitle>
                    <SectionSubtitle>Áreas do Direito</SectionSubtitle>
                </SectionHeader>

                <ToggleDialogButton onClick={this.toggleDialog}>
                    Visualizar Áreas
                </ToggleDialogButton>

                <Dialog
                    title="Áreas do Direito"
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
                    <div style={{ height: 345, overflowY: 'scroll' }}>

                        {areas.map((item) => (
                            <ProblemItem
                                onClick={() => setArea(item)}
                                label={item.name}
                                style={{ color: 'black' }}
                            />
                        ))}
                    </div>
                </Dialog>

            </div>
        );
    }
}


export default LawAreasSection;
