import { connect } from 'preact-redux';
import get from 'lodash/get';
import LocalDB from '../../feathers/local-database';

const { Chat } = LocalDB;

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const mapStateToProps = ({ userProfile }) => ({
  chatsUnread: Chat
    .find({
      members: {
        $in: [get(userProfile.store, 'records[0]._id')],
      },
    })
    .filter(
      chat => chat.messages.filter(
        msg => !msg.read && msg.sender !== get(userProfile.store, 'records[0]._id'),
      ).length > 0,
    ),
});

const mapDispatchToProps = {};

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
