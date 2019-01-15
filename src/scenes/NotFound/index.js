import { h } from 'preact';
import container from './container';

const NotFound = () => (
	<div>
		<p>Página não encontrada!</p>
	</div>
);

export default container(NotFound);
