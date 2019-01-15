import { h } from 'preact';
import { Drawer as MDDrawer } from '../../toolbox/components';
// drawers
import LawyerDrawer from './partials/LawyerDrawer';
import UserDrawer from './partials/UserDrawer';
import GuestDrawer from './partials/GuestDrawer';
//setup
import container from './container';
import reducer from './redux/reducer';

const Drawer = (props) => (
	<MDDrawer active={props.state.drawerOpened} onOverlayClick={props.toggleDrawer}>
		<Choose>
			<When condition={props.userData._id && props.userData.lawyer}>
				<LawyerDrawer {...props} />
			</When>
			<When condition={props.userData._id && !props.userData.lawyer}>
				<UserDrawer {...props} />
			</When>
			<When condition={true}>
				<GuestDrawer {...props} />
			</When>
		</Choose>
	</MDDrawer>
);

export default container(Drawer);
export { reducer };
