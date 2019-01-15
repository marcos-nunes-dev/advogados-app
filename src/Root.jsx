import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import Router from './Route';
import { Preloader } from './components';

/**
|--------------------------------------------------
| Root
|--------------------------------------------------
*/

class Root extends Component {
	render({ preloader }) {
		return (
			<div id="app" style={{ backgroundColor: '#eee' }}>
				
				<Router />

				<If condition={preloader.opened}>
					<Preloader />
				</If>

			</div>
		);
	}
};


const mapStateToProps = ({ preloader }) => ({ preloader });

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
