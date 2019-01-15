import { h, Component } from 'preact';
import styled from 'styled-components';
import { SectionHeader, SectionTitle, SectionSubtitle } from './SectionComponents';
import { ColoredProblemItem as ProblemItem} from './components/ProblemItem';


const SearchButton = styled.button`
  border: 0 none;
  background-color: #411f51;
  color: white;
  transition: background-color .3s ease-in-out;
  font-size: 18px;
  height: 40px;
  &:hover {
    background-color: #623875;
  }
`;


class SearchSection extends Component {

    state = {
        hasSearched: false,        
    }

    makeSearch = () => {
        const query = this.inputRef.value
        this.props.onSearch(query);

        this.setState({ hasSearched: true });
    }

    onSearchButtonClick = () => this.makeSearch();

    onKeyUp = ({ key }) => {
        if (key === 'Enter')
            this.makeSearch();
    }

    render({ areas, setArea }) {
        return (
            <div>
                <SectionHeader
                    sectionIcon="search"
                    sectionDesc="Busque no campo abaixo um termo que tenha relação com o seu problema e clique em BUSCAR (Exemplos: Salário, Contrato, Divórcio)"
                >
                    <SectionTitle>OPÇÃO 1</SectionTitle>
                    <SectionSubtitle>Buscar pelo seu problema</SectionSubtitle>
                </SectionHeader>

                <div style={{ display: 'flex' }}>
                    <input
                        type="text"
                        placeholder="DIGITE AQUI"
                        onKeyUp={this.onKeyUp}
                        ref={(elem) => this.inputRef = elem}
                        style={{ padding: 5, border: 'none', flex: 3, marginRight: 10 }} />
                    <SearchButton style={{ flex: 1 }} onClick={this.onSearchButtonClick}>Buscar</SearchButton>
                </div>

                <div style={{ marginTop: 20 }}>
                    {areas.length > 0 && areas.map(item => (
                        <ProblemItem
                            onClick={() => setArea(item)}
                            areaLabel={item.area}
                            label={item.term}
                        />
                    ))}

                    {areas.length === 0 && this.state.hasSearched && (
                        <div>
                            <h3 style={{ margin: 0, color: '#9999cc' }}><strong style={{ color: '#411f51' }}>nenhum</strong> resultado encontrado...</h3>
                            <p style={{ color: '#333' }}>Tente uma nova busca com um outro termo ou veja mais opções abaixo</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}



export default SearchSection;