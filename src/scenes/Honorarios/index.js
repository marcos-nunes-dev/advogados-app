import { h } from 'preact';
import container from './container';
import { List, ListSubHeader, ListItem, ListDivider } from '../../toolbox/components';
import { Scene, Block } from '../../components'
import styled from 'styled-components';

const data = [
	{
		city: 'Acre',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Acre.pdf'
	},
	{
		city: 'Alagoas',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Alagoas.pdf'
	},
	{
		city: 'Amapá',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Amapa.pdf'
	},
	{
		city: 'Amazonas',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Amazonas.pdf'
	},
	{
		city: 'Bahia',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Bahia.pdf'
	},
	{
		city: 'Ceará',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Ceara.pdf'
	},
	{
		city: 'Distrito Federal',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Distrito Federal.pdf'
	},
	{
		city: 'Espírito Santo',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Espirito Santo.pdf'
	},
	{
		city: 'Goiás',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Goias.pdf'
	},
	{
		city: 'Maranhão',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Maranhao.pdf'
	},
	{
		city: 'Mato Grosso do Sul',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Mato Grosso do Sul.pdf'
	},
	{
		city: 'Mato Grosso',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Mato Grosso.pdf'
	},
	{
		city: 'Minas Gerais',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Minas Gerais.pdf'
	},
	{
		city: 'Pará',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Para.pdf'
	},
	{
		city: 'Paraíba',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Paraiba.pdf'
	},
	{
		city: 'Paraná',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Parana.pdf'
	},
	{
		city: 'Pernanbuco',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Pernanbuco.pdf'
	},
	{
		city: 'Piauí',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Piaui.pdf'
	},
	{
		city: 'Rio de Janeiro',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Rio de Janeiro.pdf'
	},
	{
		city: 'Rio Grande do Norte',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Rio Grande do Norte.pdf'
	},
	{
		city: 'Rio Grande do Sul',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Rio Grande do Sul.pdf'
	},
	{
		city: 'Rondônia',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Rondonia.pdf'
	},
	{
		city: 'Roraima',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Roraima.pdf'
	},
	{
		city: 'Santa Catarina',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Santa Catarina.pdf'
	},
	{
		city: 'Sao Paulo',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Sao Paulo.pdf'
	},
	{
		city: 'Sergipe',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Sergipe.pdf'
	},
	{
		city: 'Tocantins',
		link: 'https://mysterious-oasis-88871.herokuapp.com/files/Tocantins.pdf'
	},
];

const CloseIcon = styled.i`
	position: absolute;
	font-size: 30px !important;
	padding: 15px;
	z-index: 100000;
`;

const Honorarios = () => (
	<Scene container sync >
		<CloseIcon className="material-icons" onClick={() => window.history.back()}>arrow_back</CloseIcon>
		<br />
		<br />
		<div style={{maxWidth: 500, margin: 'auto'}} >
			<ListSubHeader caption='HONORÁRIOS ADVOCATICIOS' />
			<p style={{padding: '0 15px', marginTop: 0}} >A Ordem dos Advogados do Brasil em cada Estado sugere uma tabela de preços para os serviços jurídicos.</p>
			<List selectable ripple>
				{data.map(item =>
					<ListItem
						caption={item.city}
						legend="Clique para abrir"
						onClick={() => {
							return window.open(item.link, '_blank');
						}}
					/>
				)}
			</List>
		</div>
	</Scene>
);

export default container(Honorarios);
