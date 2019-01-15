import { connect } from 'preact-redux';
import get from 'lodash/get';
import drawerActions from '../LawyerDrawer/redux/actions';
import { services } from '../../feathers';
import LocalDB from '../../feathers/local-database';

const { Chat } = LocalDB;

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const mapStateToProps = ({
  search, searchLawyers, lawyerProfile, userProfile, authentication,
}) => ({
  isUserSignedIn: authentication.isSignedIn,
  search,
  result: searchLawyers.queryResult,
  subscription: get(lawyerProfile.store, 'records[0].subscription'),
  chatsUnread: Chat.find({
    members: {
      $in: [get(userProfile.store, 'records[0]._id')],
    },
  }).filter(
    chat => chat.messages.filter(
      msg => !msg.read && msg.sender !== get(userProfile.store, 'records[0]._id'),
    ).length > 0,
  ),
});

const mapDispatchToProps = {
  toggleDrawer: drawerActions.toggleDrawer,
  searchLawyers: services.searchLawyers.find,
};

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
