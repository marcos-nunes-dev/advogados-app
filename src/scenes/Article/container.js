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

const { Chat, Articles } = LocalDB;

const mapStateToProps = ({ chat, userProfile }) => ({
  chats: Chat.find({
    members: {
      $in: [get(userProfile.store, 'records[0]._id')],
    },
  }),
  userProfile: get(userProfile.store, 'records[0]'),
  articles: Articles.find(),
});

const mapDispatchToProps = {
  getUser: services.userProfile.get,
  getArticles: services.articles.find,
  toggleDrawer: drawerActions.toggleDrawer,
};

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
