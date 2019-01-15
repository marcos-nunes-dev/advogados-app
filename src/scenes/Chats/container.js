import { connect } from 'preact-redux';
import get from 'lodash/get';
import { services } from '../../feathers';
import drawerActions from '../LawyerDrawer/redux/actions';
import LocalDB from '../../feathers/local-database';

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const { Chat } = LocalDB;

const mapStateToProps = ({ userProfile }) => ({
  chats: Chat.find({
    members: {
      $in: [get(userProfile.store, 'records[0]._id')],
    },
  }),
  userProfile: get(userProfile.store, 'records[0]'),
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
  getUser: services.userProfile.get,
  toggleDrawer: drawerActions.toggleDrawer,
};

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
