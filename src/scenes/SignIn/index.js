import { h } from 'preact';
//components
import Header from './components/Header';
import Footer from './components/Footer';
// setup
import container from './container';

/**
|--------------------------------------------------
| COmponent
|--------------------------------------------------
*/

const SignIn = (props) => (
	<div>
		<Header {...props}/>
		<Footer/>
	</div>
);

export default container(SignIn);
